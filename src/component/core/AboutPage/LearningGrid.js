import React from "react";
import { Link } from "react-router-dom";
import Button from "../HomePage/Button";
import HighlightText from "../HomePage/HighlightText";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based ",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

function LearningGrid() {
  return (
    <div>
      <div className="grid mx-auto mt-16 lg:mr-10 grid-cols-1 lg:grid-cols-4 mb-12 auto-rows-min">
        {LearningGridArray.map((element, index) =>
          element.order === -1 ? (
            <div
              key={index}
              className="lg:col-span-2 lg:w-[90%] lg:mb-0 mb-10 lg:ml-8 min-h-fit"
            >
              <div className="text-4xl font-semibold">
                <h1>{element.heading}</h1>
                <HighlightText text={element.highlightText}></HighlightText>
              </div>
              <div className="font-medium mt-3 tracking-wide">
                <p className="text-richblack-25">{element.description}</p>
              </div>
              <div className="w-fit mt-8">
                <Link to={element.BtnLink}>
                  <Button active={true}>{element.BtnText}</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div
              className={`${
                index % 2 === 0 ? "bg-richblack-800" : "bg-richblack-700"
              } ${
                index === 3 ? "lg:col-start-2" : ""
              } min-h-[15rem] lg:block hidden lg:pt-10 lg:p-6`}
              key={index}
            >
              <div>
                <h1 className="text-xl tracking-wide text-richblack-5">
                  {element.heading}
                </h1>
              </div>
              <div className="lg:mt-6 text-richblack-200 ">
                <p>{element.description}</p>
              </div>
            </div>
          )
        )}
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full m-auto lg:hidden "
        >
          <CarouselContent className="gap-3 ">
            {LearningGridArray.map(
              (element, index) =>
                index > 0 && (
                  <CarouselItem key={index} className="md:basis-1/2 ">
                    <div className="">
                      <div
                        className={` min-h-[15rem] border border-richblack-400 lg:hidden pt-5 p-4 block lg:pt-10 lg:p-6`}
                        key={index}
                      >
                        <div>
                          <h1 className="text-2xl lg:text-xl tracking-wide text-richblack-5">
                            {element.heading}
                          </h1>
                        </div>
                        <div className="lg:mt-6 text-lg mt-6 text-richblack-200 ">
                          <p>{element.description}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default LearningGrid;
