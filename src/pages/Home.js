import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../component/core/HomePage/HighlightText';
import CTAButton from '../component/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../component/core/HomePage/CodeBlocks';
import Ellipse1 from "../assets/Images/Ellipse.png"
import Ellipse2 from "../assets/Images/Ellipse2.png"
import TimeLineSection from "../component/core/HomePage/TimeLineSection"
import LearningLanguageSection from "../component/core/HomePage/LearningLanguageSection"
import InstructorSection from "../component/core/HomePage/InstructorSection"
import ExploreMore from '../component/core/HomePage/ExploreMore';
import Footer from '../component/common/Footer'

function Home() {
  return (
    <div> 
        {/* Section - 01 */}
        <div className='relative mx-auto flex text-white flex-col pb-10 max-w-maxContent w-11/12 items-center test-white justify-between'>
            <div className='mt-16'>
            <Link to={"/signup"}>
                <div className='group  p-1 rounded-full mx-auto bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-full '>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 transition-all duration-200 '>
                        <p>
                        Become an Instructor
                        
                         </p> <FaArrowRight />
                    </div>
                </div>
            </Link>
            </div>

            <div className='text-center text-4xl mt-6 font-semibold text-white'>
                Empower Your Future with {" "}
                <HighlightText text={"Coding Skills"} /> 
            </div>

            <div className=' max-w-[80%] text-center text-lg font-bold text-richblack-300 mt-4 ' >
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mb-4 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book A Demo
                </CTAButton>
            </div>

            <div className='shadow-[10px_-5px_50px_-5px] shadow-blue-200  lg:max-w-[900px] mt-8 mb-16 aspect-video'>
                <div className='shadow-[10px_10px_0px_0px_rgb(221,221,221)] '>
                    <video className='  ' muted loop autoPlay >
                        <source src={Banner} type='video/mp4'></source>
                    </video>
                </div>
            </div>

            <div>
                <CodeBlocks position={"lg:flex-row"}
                            Ellipse={Ellipse1}
                            heading={
                                <div className='text-4xl font-semibold'>
                                    Unlock your {" "}
                                    <HighlightText text={"Coding Potential"}/> 
                                    {" "} with our online courses.
                                 </div>}
                            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                            ctabtn1={
                                {
                                    btnText:"try it yourself",
                                    linkto:"/signup",
                                    active:true,
                                }
                            }
                            ctabtn2={
                                {
                                    btnText:"Learn More",
                                    linkto:"/login",
                                    active:false,
                                }
                            }
                            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}                            
                            codeColor={"text-yellow-25"}

                />
            </div>
                            
            <div className='mx-auto '>
                <CodeBlocks position={"lg:flex-row-reverse"}
                            Ellipse={Ellipse2}
                            heading={
                                <div className='text-4xl  font-semibold'>
                                    Start{" "} 
                                    <HighlightText  text={"Coding"}/> 
                                    <HighlightText  text={" in Seconds"}/> 
                                 </div>}
                            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            ctabtn1={
                                {
                                    btnText:"Continue ",
                                    linkto:"/signup",
                                    active:true,
                                }
                            }
                            ctabtn2={
                                {
                                    btnText:"Learn More",
                                    linkto:"/login",
                                    active:false,
                                }
                            }
                            codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport {useSelector} from "react-redux"";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                            codeColor={"text-yellow-25"}

                />
            </div>

            <ExploreMore/>
        </div>

        {/* Section - 02 */}

        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 flex items-center  justify-center gap-5 m-auto  h-[100%] max-w-maxContent'>
                    <div className='flex flex-col  md:flex-row gap-7  md:mt-[150px] text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-2'>
                                Explore Full Catalog 
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='w-11/12 max-w-maxContent mx-auto flex flex-row items-center justify-between mb-10 gap-7'>
                <div className='flex m-auto justify-evenly mb-10 mt-[95px] flex-col lg:flex-row gap-12 lg:gap-5'>
                    
                    <div className='text-4xl font-semibold w-[100%]  lg:w-[45%]'>
                        Get the Skills you nedd for a {" "}
                        <HighlightText text={"Job"}/> {" "}
                        <HighlightText text={"that is in demand"}/>
                    </div>
                
                    <div className='flex flex-col gap-10 items-start w-[100%] lg:w-[40%]'>
                            <p className=' text-base '>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAButton  active={true} linkto={"/signup"}>Learn More</CTAButton>
                    </div>
                </div>
            </div>

            <TimeLineSection />
                
            <LearningLanguageSection />
        </div>
        
        {/* section 3  */}

        <div className='flex flex-col max-w-maxContent m-auto items-center justify-between gap-8 bg-richblack-900 text-white'>
                            
              <InstructorSection/>
              <h2 className='text-center text-4xl font-semibold mt-10'>Review From Other Learners</h2>               
                
        </div>

        {/* Section 4 */}

        <div>
            <Footer/>
        </div>

    </div>
  )
}

export default Home