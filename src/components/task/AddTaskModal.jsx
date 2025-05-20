import React, { useState } from 'react'

const AddTaskModal = ({ onSave, tastToUpdate, onCloseModal }) => {
    const [task, setTask] = useState(tastToUpdate || {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        tags: [],
        priority: "",
        isFavorite: false
    });

    const [isAdd] = useState(tastToUpdate === null);

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'tags') {
            value = value.split(',').map(tag => tag.trim());
        }

        setTask({
            ...task,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        onSave(task, isAdd);
    };

    return (
        <>
            <div className="bg-black/70 h-full w-full z-10 fixed top-0 left-0"></div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-20 fixed top-1/7 left-2/7"
            >
                <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                    {isAdd ? 'Add New Task' : 'Update Task'}
                </h2>

                <div className="space-y-9 text-white lg:space-y-10">
                    {/* Title */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="title"
                            id="title"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                            name="description"
                            id="description"
                            value={task.description}
                            onChange={handleChange}
                            
                        ></textarea>
                    </div>

                    {/* Tags and Priority */}
                    <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        {/* Tags */}
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="tags">Tags (comma separated)</label>
                            <input
                                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                                type="text"
                                name="tags"
                                id="tags"
                                value={task.tags}
                                onChange={handleChange}
                                
                            />
                        </div>

                        {/* Priority */}
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="priority">Priority</label>
                            <select
                                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                                name="priority"
                                id="priority"
                                value={task.priority}
                                onChange={handleChange}
                                
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-16 flex justify-between lg:mt-20">
                    <button
                        type="button"
                        className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
                        onClick={onCloseModal}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddTaskModal;
