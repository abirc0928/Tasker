import React, { useEffect, useState } from 'react'
import SearchTask from './SearchTask'
import TaskActions from './TaskActions'
import TaskList from './TaskList'
import AddTaskModal from './AddTaskModal'
import NoTaskFound from './NoTaskFound'
import SearchNorFound from './SearchNorFound'

const TaskBoard = () => {

    const defaultTask = {
        id: crypto.randomUUID(),
        title: "Learn React",
        description: "I want to Learn React such that I can treat it like my slave and make it do whatever I want to do.",
        tags: ["web", "react", "js"],
        priority: "High",
        isFavorite: true
    };

    const [allTasks, setAllTasks] = useState([defaultTask]);
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filtered = allTasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTasks(filtered);
    }, [allTasks, searchTerm]);  // 

    const handleAddEditTask = (newTask, isAdd) => {
        let updatedTasks;

        if (isAdd) {
            updatedTasks = [...allTasks, newTask];
        } else {
            updatedTasks = allTasks.map(task =>
                task.id === newTask.id ? newTask : task
            );
            setTaskToUpdate(null);
        }

        setAllTasks(updatedTasks);
        setShowAddModal(false);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setTaskToUpdate(null);
    };

    const handleEditTask = (task) => {
        setTaskToUpdate(task);
        setShowAddModal(true);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = allTasks.filter(task => task.id !== taskId);
        setAllTasks(updatedTasks);
    };

    const onDeleteAllTask = () => {
        setAllTasks([]);
    };

    const handleFavIcon = (taskID) => {
        const updatedTasks = allTasks.map(task =>
            task.id === taskID ? { ...task, isFavorite: !task.isFavorite } : task
        );
        setAllTasks(updatedTasks);
    };

    const handleSearchTask = (term) => {
        setSearchTerm(term);
    };

    return (
        <section className="mb-20" id="tasks">
            {showAddModal && (
                <AddTaskModal
                    onSave={handleAddEditTask}
                    onCloseModal={handleCloseModal}
                    tastToUpdate={taskToUpdate}
                />
            )}
            <div className="container">
                <SearchTask onSerchTerm={handleSearchTask} />
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions
                        onAddClick={() => setShowAddModal(true)}
                        onDeleteAllTask={onDeleteAllTask}
                    />
                    {
                        allTasks.length === 0 ? (
                            <NoTaskFound />
                        ) : tasks.length === 0 ? (
                            <SearchNorFound />
                        ) : (
                            <TaskList
                                tasks={tasks}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onFav={handleFavIcon}
                            />
                        )
                    }


                </div>
            </div>
        </section>
    )
}

export default TaskBoard;
