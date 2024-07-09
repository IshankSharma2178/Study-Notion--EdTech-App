import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModal({modalData}) {
  return (
    <div className='fixed inset-0  z-50 flex items-center m-auto justify-center bg-black bg-opacity-50' >
        <div className='bg-richblack-800 rounded-lg shadow-lg  max-w-fit w-full py-6 px-4 mx-1  md:px-6'>
            <p className='text-2xl font-bold text-richblack-5'>
                {modalData.text1}
            </p>
            <p className='text-richblack-300 mt-2'>
                {modalData.text2}
            </p>
            <div className='mt-5 flex flex-row items-center  flex-wrap gap-4'>
                <IconBtn onClick={modalData?.btn1Handler} text={modalData?.btn1Text} ></IconBtn>
                <button onClick={modalData?.btn2Handler}>
                    <div className='bg-richblack-300 px-3 py-2 rounded-lg font-bold border transition-all hover:scale-95 hover:shadow-none duration-200 text-black border-richblack-600 shadow-custom  '>
                        {modalData?.btn2Text}
                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal