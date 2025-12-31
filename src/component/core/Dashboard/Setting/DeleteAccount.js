import React, { useState } from 'react'
import { FiTrash2 } from "react-icons/fi"
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useDeleteAccount } from "../../../../hooks/useSettings"

function DeleteAccount() {
    const [modalData , setMOdalData] = useState(null);
    const { deleteAccount } = useDeleteAccount();

    return (
    <div className='w-full md:w-[90%] m-auto'>
    <div className="my-10 flex flex-col items-center md:flex-row gap-8 w-[100%] justify-center rounded-md border-[1px] border-pink-700 bg-pink-900 px-4 py-6 md:p-8 md:px-12 ">
      <div className="md:block hidden">
        <FiTrash2 className="text-4xl   text-pink-200" />
      </div>
      <div className="flex flex-col space-y-2 w-full md:w-[80%]">
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>
        <div className=" text-pink-25">
          <p>Would you like to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
        </div>
        <button
          className="w-fit cursor-pointer italic text-pink-300"
          onClick={()=>setMOdalData({
            text1:"Are You Sure ?",
            text2:"to detet your account",
            btn2Text:"Cancel",
            btn2Handler:()=>setMOdalData(null),
            btn1Text:"Delete",
            btn1Handler:()=>deleteAccount(),
          })}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
    { modalData && <ConfirmationModal modalData={modalData}/>}
  </div>

  )
}

export default DeleteAccount