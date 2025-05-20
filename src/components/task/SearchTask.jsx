

import React, { useState } from 'react'

const SearchTask = ({ onSerchTerm }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        onSerchTerm(value)
    }

    return (
        <div className="p-2 flex justify-end">
            <input
                type="search"
                className="bg-gray-800 text-white px-4 py-2 rounded"
                placeholder="Search Task"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchTask;