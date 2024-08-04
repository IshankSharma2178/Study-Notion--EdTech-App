import React from 'react'
import EditProfileDetails from './EditProfileDetails'
import EditPic from './EditPic'
import EditPassword from './EditPassword'
import DeleteAccount from './DeleteAccount'

function Settings() {
  return (
    <div className='gap-6 flex flex-col scrollbar-thin scrollbar-hide'>
      <p className='font-semibold text-3xl text-richblack-5 w-[100%] m-auto'>Settings</p>
      <EditPic/>
      <EditProfileDetails/>
      <EditPassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings