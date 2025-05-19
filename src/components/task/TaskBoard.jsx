import React, { useState } from 'react'
import SearchTask from './SearchTask'
import TaskActions from './TaskActions'
import TaskList from './TaskList'
import AddTaskModal from './AddTaskModal'

const TaskBoard = () => {
    const defualtTast = {
        'id': crypto.randomUUID(),
        'title': "Learn React",
        'description': "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
        'tags': ["web", "react", "js"],
        'priority': "High",
        'isFavorite': true
    }
    const [tasks, setTasks] = useState([defualtTast])
    const [showAddModal, setShowAddModal] = useState(false)
    const [tastToUpdate, setTaskToUpdata] = useState(null)

    const handleAddEditTask = (newTask, isAdd) => {
        if (isAdd) {
            setTasks([...tasks, newTask])
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        setTaskToUpdata(null)
                        return newTask
                    }
                    return task
                })
            )
        }

        setShowAddModal(false)
    }

    const handleCloseModal = () => {
        setShowAddModal(false)
        setTaskToUpdata(null)
    }


    const handleEditTask = (task) => {
        // console.log(task)
        setTaskToUpdata(task)
        setShowAddModal(true)
    }

    const handleDeleteTask = (taskId) => {
        setTasks(
            tasks.filter(task => task.id !== taskId)
        )
    }

    const onDeleteAllTask = () => {
        setTasks([])
    }

    const handleFavIcon = (taskID) => {
        const taskIndex = tasks.findIndex(task => task.id === taskID)

        const newTasks = [...tasks]

        newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite

        setTasks(newTasks)
    }
    return (
        <section className="mb-20" id="tasks">
            {showAddModal && <AddTaskModal
                onSave={handleAddEditTask}
                onCloseModal={handleCloseModal}
                tastToUpdate={tastToUpdate}
            ></AddTaskModal>}
            <div className="container">
                {/* <!-- Search Box --> */}
                <SearchTask></SearchTask>
                {/* <!-- Search Box Ends --> */}
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions onAddClick={() => setShowAddModal(!showAddModal)} onDeleteAllTask={onDeleteAllTask}></TaskActions>
                    <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onFav={handleFavIcon}></TaskList>
                </div>
            </div>
        </section>
    )
}

export default TaskBoard