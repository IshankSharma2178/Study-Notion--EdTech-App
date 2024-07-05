import React from 'react'
import HighlightText from '../component/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote  from '../component/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"

function About() {
  return (
    <div className='mt-[100px] w-full max-w-maxContent m-auto text-white'>
        {/* section 1 */}
        <section>
            <div>
                <header>Driving Innovation in Online Education for a {" "}<HighlightText text={" Brighter Future"} />
                    <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
                <div className='flex gap-x-3 m-auto'>
                    <img src={BannerImage1} />
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section>
            <Quote />
        </section>

        {/* Section 3 */}
        <section>
            <div>
                {/* Founding Sory left Box */}
                <div>
                    <div>
                        <h1>Our Founding Story</h1>
                        <p1>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p1>
                        <p2>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p2>
                    </div>
                    <div>
                        <img src={FoundingStory} />
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About