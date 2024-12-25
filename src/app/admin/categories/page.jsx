import React from 'react'
import ShowCategory from '../components/ShowCategory'
import CreateCategory from '../components/CreateCategory'


const AdminsPage = () => {
  return (
    <div className='flex flex-wrap justify-evenly'>
        <CreateCategory/>
        <ShowCategory/>
    </div>
  )
}

export default AdminsPage