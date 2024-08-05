import React from 'react'
import HighlightText from '../component/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote  from '../component/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import HighlightText4 from '../component/core/HomePage/HighlightText4'
import HighlightText2 from '../component/core/HomePage/HighlightText2'
import Stats from '../component/core/AboutPage/Stats'
import LearningGrid from '../component/core/AboutPage/LearningGrid'
import ContactForm from '../component/core/AboutPage/ContactForm'
import Footer from '../component/common/Footer'

function About() {
  return (
    <div className='text-white'>
        {/* section 1 */}
        <section className='min-h-[510px] relative bg-richblack-700'>
            <div className='flex  flex-col  max-w-maxContent w-11/12  m-auto'>
                <header className='md:max-w-[100%] lg:max-w-[70%] pt-[70px]  m-auto text-center' >
                    <div className='text-4xl text-center font-semibold mb-5 lg:mb-5 text-richblack-5'>
                        Driving Innovation in Online Education for a {" "}<HighlightText text={" Brighter Future"} />
                    </div>
                    <p className='text-richblack-200  w-[80%] lg:w-[93%] m-auto'>
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter 
                        future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                <div  className='grid absolute m-auto bottom-1 md:mt-0 mt-4 translate-y-[30%] max-w-maxContent w-11/12 grid-w-[90%] grid-cols-2 lg:grid-cols-3  grid-rows-1 gap-3 lg:gap-4'>
                    <img src={BannerImage1} loading="lazy" />
                    <img src={BannerImage2} loading="lazy"/>
                    <img src={BannerImage3} loading="lazy" className='lg:flex hidden'/>
                </div>
            </div>
        </section>
        {/* Section 2 */}
        <section className='max-w-maxContent md:pb-0 pb-12 min-h-[380px] flex justify-center items-center w-11/12 m-auto '>
            <Quote />
        </section>

        <hr className='border  border-richblack-700 '></hr>

        {/* Section 3 */}
        <section className='max-w-maxContent mb-16 pt-[90px] w-11/12 m-auto '>
                {/* Founding Sory */}
            <div className='flex flex-col gap-y-16'>
                <div className='flex flex-col md:flex-row items-center justify-between w-[100%]'>
                    <div className='w-[100%] md:w-[45%] md:mb-0 mb-10 flex-col flex gap-y-8'>
                        <h1 className='text-3xl '><HighlightText4 text={"Our Founding Story"}/></h1>
                        <p1 className="text-richblack-300">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p1>
                        <p2 className="text-richblack-300">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p2>
                    </div>
                    <div className=' w-[95%] md:w-[50%] lg:w-[40%] justify-center items-center m-auto flex'>
                        <img src={FoundingStory} loading='lazy' className=' object-cover shadow-[0_0_20px_0] shadow-[#FC6767] aspect-auto w-[100%]  md:h-auto '/>
                    </div>
                </div>
                {/* vision and mission  */}
                <div className='flex flex-col md:flex-row w-[100%] gap-12 md:gap-5'>
                    <div className='gap-y-8 flex flex-col '>
                        <h1 className='text-3xl '><HighlightText2 text={"Our vision"} /></h1>
                        <p className="text-richblack-300">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='gap-y-8 flex flex-col'>
                        <h1 className='text-3xl '><HighlightText text={"Our Mission"}/></h1>
                        <p className="text-richblack-300">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4 */}
        <section >
            <Stats/>
        </section>

        {/* Section 5 */}
        <section className='max-w-maxContent w-11/12   m-auto '>
             <LearningGrid/> 
        </section>

        {/* Section 6 */}
        <section className='m-auto w-11/12 mb-16 max-w-maxContent  '>
            <ContactForm/>
        </section>

        <section>
            <Footer/>
        </section>
    </div>
  )
}

export default About