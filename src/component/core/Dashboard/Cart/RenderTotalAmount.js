import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"

function RenderTotalAmount() {

  const {total} = useSelector((state)=>state.cart)


  const handlePrice=(price)=>{
    if(price.length<=3){
        return price
    }
    return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(price);
}

  const handleBuyCourse = () =>{
    
    const course =cart.map((course)=> course._id)
    console.log("bought these course",course)
  }

  return (
    <div className='lg:sticky mt-10 md:mt-0   rounded-2xl top-[160px]  max-h-[350px] w-full md:w-fit mx-auto flex flex-col '>
       <div  className="min-w-[220px] rounded-md border-[1px]    border-richblack-700  max-h-[200px]   bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">{handlePrice(total)}</p>
        <button
          onClick={handleBuyCourse}
          className='flex flex-row items-center w-full font-bold ransition-all hover:scale-95 hover:shadow-none duration-200 shadow-custom justify-center gap-2 py-2 px-4 bg-yellow-50 rounded-lg text-black'
        >Buy Now</button>
    </div>
    </div>
   
  )
}

export default RenderTotalAmount