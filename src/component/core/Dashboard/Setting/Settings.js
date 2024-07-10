import React from 'react'
import EditProfileDetails from './EditProfileDetails'
import EditPic from './EditPic'

function Settings() {
  return (
    <div className='gap-6 flex flex-col'>
      <EditPic/>
      <EditProfileDetails/>
    </div>
  )
}

export default Settings