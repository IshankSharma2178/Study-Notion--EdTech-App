import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

function ContactForm() {
  return (
    <div className='flex flex-col justify-center lg:mt-[6rem] mt-[100px] items-center m-auto'>
      <h1 className='text-4xl font-bold mb-6 lg:mb-3'>Get in Touch</h1>
        <p className=' text-richblack-100 mb-10 lg:mb-10'> We'd love to here for you, Please fill out this form.</p>
        <div className="className='md:w-[400px] w-[340px ] lg:w-[650px] m-auto flex flex-col gap-y-8 border border-richblack-700 rounded-2xl p-4 py-6 md:p-10">
          <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactForm