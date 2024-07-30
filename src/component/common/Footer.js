import React from 'react'
import logo from "../../assets/Logo/LogoFullLight.png"
import FooterLink2 from "../../data/footer-links"
import { Link } from 'react-router-dom'

function elem(value){
  return (
    value.map((element , index)=>{
      return (
          <div >
              <div className='text-richblack-50 font-semibold text-[16px] mt-7'>
                {element.title}
              </div>
              <div>
                {
                  element.links.map((e, index)=>{
                    return (
                      <div className=''>
                        <Link to={e.link}>
                          <div className='text-[14px] cursor-pointer text-richblack-300 hover:text-richblack-50 transition-all duration-200 mt-2'>{e.title}</div>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
          </div>
       )})
    )
  }


function Footer() {
  return (
    <div className='text-white m-auto py-10  bg-richblack-800'>  
      <div className='flex flex-row  mx-auto  flex-wrap justify-evenly'>
        
        <div>
        {elem(FooterLink2.slice(0,1))}
        {elem(FooterLink2.slice(2,3))}
        </div>
        
        <div>
          {elem(FooterLink2.slice(1,2))}
         
        </div>

        <div >
          {elem(FooterLink2.slice(3,4))}
          {elem(FooterLink2.slice(4,5))}
        </div>
        
        <div className='lg:border-l lg:pl-9 lg:border-richblack-25'>
            {elem(FooterLink2.slice(5,6))}
        </div>
        {elem(FooterLink2.slice(6,7))}
        {elem(FooterLink2.slice(7,8))}
       
       
        {/* <div></div>
        <div></div> */}

      </div>
      </div>
  )
}

export default Footer