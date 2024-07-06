import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

function ContactForm() {
  return (
    <div className='flex flex-col justify-center lg:mt-[6rem] mt-[100px] items-center m-auto'>
      <h1 className='text-4xl font-bold mb-6 lg:mb-3'>Get in Touch</h1>
        <p className=' text-richblack-100 mb-10 lg:mb-10'> We'd love to here for you, Please fill out this form.</p>
        <ContactUsForm/>
    </div>
  )
}

export default ContactForm