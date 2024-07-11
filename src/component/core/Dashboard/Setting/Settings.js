import React from 'react'
import EditProfileDetails from './EditProfileDetails'
import EditPic from './EditPic'
import EditPassword from './EditPassword'
import DeleteAccount from './DeleteAccount'

function Settings() {
  return (
    <div className='gap-6 flex flex-col'>
      <EditPic/>
      <EditProfileDetails/>
      <EditPassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings