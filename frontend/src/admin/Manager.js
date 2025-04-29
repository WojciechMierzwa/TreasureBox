import React from 'react'

function Manager() {
  return (
    <div className="flex gap-4 p-5">
      <div className="w-1/2 bg-gray-100 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Manage Movies</h2>
        <h3 className="text-l font-semibold">Create new record</h3>
        <h3 className="text-l font-semibold">Update/Delete record</h3>
      </div>
      <div className="w-1/2 bg-gray-100 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Manage TV Series</h2>
        <h3 className="text-l font-semibold">Create new record</h3>
        <h3 className="text-l font-semibold">Update/Delete record</h3>
      </div>
    </div>
  )
}

export default Manager