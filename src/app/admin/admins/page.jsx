import React from 'react'

import CreateAdmin from './components/CreateAdmin'
import ShowAdmin from './components/ShowAdmin'


const AdminsPage = () => {
  return (
    <div className='flex flex-wrap justify-evenly'>
        <CreateAdmin/>
        <ShowAdmin/>
    </div>
  )
}

export default AdminsPage