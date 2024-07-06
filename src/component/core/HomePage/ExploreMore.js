'use client'
import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from "./HighlightText"
import CourseCard from "./CourseCard"
import Autoplay from 'embla-carousel-autoplay'
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "../../ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'

const tabsName=[
  "Free",
  "New to Coding",
  "Most Popular",
  "Skills Paths",
  "Career Paths"
]

function ExploreMore() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag)
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCourse = (value) =>{
    setCurrentTab(value)
    const result= HomePageExplore.filter((course)=>course.tag === value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
}

  return (
    <div className='w-full'> 
            <div className='text-4xl font-semibold text-center '>
        Unlock the {" "}
        <HighlightText text={"Power of Code"} />
      </div>

      {/* Sub-Heading text */}
      <p className='text-center text-richblack-300 tracking-wide  text-lg font-semibold mt-3 mb-3 lg:mb-0 '>
        Learn to build anything you can imagine
      </p>  

      {/*Tabs div */}
      <div className='   lg:flex-row shadow-custom bg-richblack-800 mt-5 mb-5 gap-[2px] max-w-fit  m-auto border-richblack-100 rounded-full py-1 px-1  '>
      
      <div className='lg:flex hidden'>
        {
          tabsName.map( (element, index) => {
              return (
                  <div
                  className={`text-[16px] flex flex-row items-center gap-9 font-medium 
                  ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium": "text-richblack-200" } 
                  rounded-full transition-all duration-200 cursor-pointer
                  hover:bg-richblack-900 hover:text-richblack-5 text-nowrap   px-8 py-2`}
                  key={index}
                  onClick={() => setMyCourse(element)}
                  >
                      {element}
                  </div>
              )
          })
        }

      </div>
        {/* tabs for sm screen */}
      <div className='lg:hidden' >
        <Carousel className="w-full  max-w-xs">
        <CarouselContent>
          {tabsName.map((element, index) => (
            <CarouselItem key={index}  className="md:basis-1/4 basis-1/3">
              <div
                  className={`text-[16px] flex flex-row items-center gap-9 font-medium 
                  ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium": "text-richblack-200" } 
                  rounded-full transition-all duration-200 cursor-pointer
                  hover:bg-richblack-900 hover:text-richblack-5 px-8 py-2`}
                  key={index}
                  onClick={() => setMyCourse(element)}
                  >
                      {element}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
        
      </div>
      </div>

      {/* cards */}

      <div>
        <div className='lg:h-[150px] w-full relative'>
          {/* course cards */}
          <div className='hidden lg:flex absolute lg:px-8 top-10 flex-row gap-10 flex-wrap w-full justify-evenly m-auto'>
              {
                courses.map((element,index)=>{
                  return (
                    <CourseCard
                      key={index}
                      cardData = {element}
                      currentCard={currentCard}
                      setCurrentCard = {setCurrentCard}
                    />
                  )
                })
              }
          </div>
        </div>
      </div>

      <Carousel plugins={[Autoplay({delay: 2000,stopOnInteraction: false,stopOnMouseEnter: true}),]}className="w-full m-auto lg:hidden max-w-[280px]">
      <CarouselContent className="gap-3 " >
        {courses.map((element, index) => (
          <CarouselItem key={index} c>
            <div>
            <CourseCard
                      isAct={true}
                      key={index}
                      cardData = {element}
                      currentCard={currentCard}
                      setCurrentCard = {setCurrentCard}
                    />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="mx-3"/>
      <CarouselNext className="mx-3"/>
    </Carousel>

    </div>
  )
}

export default ExploreMore