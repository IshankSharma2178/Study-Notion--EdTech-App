import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"

function RenderTotalAmount() {

  const {total} = useSelector((state)=>state.cart)

  const handleBuyCourse = () =>{
    // const course =cart.map((course)=> course._id)
    // console.log("bought these course",course)
  }

  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>
        <IconBtn 
          text="Buy Now"
          onClick={handleBuyCourse}
          customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmount