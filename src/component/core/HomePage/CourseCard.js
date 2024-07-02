import React from 'react';
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiFamilyTree } from "react-icons/gi";

function CourseCard({ setCurrentCard, currentCard, cardData ,isAct}) {

  function setCard() {
    setCurrentCard(cardData.heading);
  }

  const isActive = currentCard === cardData.heading;

  return (
    <div
      className={`${isActive || isAct ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800 lg:hover:scale-95 "} w-[280px] md:w-[500px] transition-all duration-200 lg:w-[30%]  min-h-[300px] cursor-pointer`}
      onClick={setCard}
    >
      <div className="flex flex-wrap lg:flex-col   GAP-4 ">
        
        <div className='flex flex-col gap-3  lg:py-6 py-5 lg:px-5 px-2 border-b-[2px] border-richblack-400 border-dashed min-h-[240px] '>
            <div className={`${isActive || isAct ? "text-richblack-800" : "text-richblack-50"} font-semibold text-[21px]  `}>
                {cardData.heading}
            </div>
            <div className={`${isActive || isAct ? "text-richblack-500" : "text-richblack-300"} tracking-wide  mb-6`}>
                {cardData.description}
            </div>
        </div>
        <div className="flex flex-row justify-between px-6 pt-4 lg-gap-0 gap-10 font-medium mt-auto">
          <div className={`${isActive || isAct ? "text-[rgb(15,122,157)]" : "text-richblack-300"} flex flex-row items-center`}>
            <HiMiniUserGroup className="mr-2" />
            {cardData.level}
          </div>
          <div className={`${isActive || isAct ? "text-[rgb(15,122,157)]" : "text-richblack-300"} flex flex-row items-center`}>
            <GiFamilyTree className="mr-2" />
            {cardData.lessionNumber} Lessons
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
