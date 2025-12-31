import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useBuyCourse } from "../hooks/useStudent";
import ReactStars from "react-rating-stars-component";
import { useCourseDetails } from "../hooks/useCourses";
import Error from "./Error";
import { ACCOUNT_TYPE } from "../utils/constants";
import ConfirmationModal from "../component/common/ConfirmationModal";
// import RatingStars from "../components/common/RatingStars"
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsGlobe } from "react-icons/bs";
import { BiVideo } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import CourseDetailsCard from "../component/core/Course/CourseDetailsCard";
import { toast } from "react-hot-toast";
import Footer from "../component/common/Footer.js";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CourseDetails = () => {
  const { userProfile } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const { data: courseData, isLoading: courseLoading } =
    useCourseDetails(courseId);
  const { buyCourse } = useBuyCourse();

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    const courseDetails =
      courseData?.courseDetails || courseData?.data?.courseDetails;
    courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  //Will store sectionIds for enabling the dropdown
  const [isActive, setIsActive] = useState([]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };
  function formatDate(isoString) {
    const date = new Date(isoString);

    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const time = `${hours}:${minutes}${ampm}`;

    return `${month} ${day} ${year} | ${time}`;
  }

  const handleBuyCourse = () => {
    console.log("first");
    if (user === null) {
      toast("Login First To buy Course", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setConfirmationModal({
        text1: "you are not Logged in",
        text2: "Please login to purchase the course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
    if (user?.accountType === "Instructor") {
      toast.error("Instructor Cannot Buy Course");
      return;
    }
    if (user && userProfile) {
      console.log(userProfile);
      console.log(courseId);
      buyCourse({
        courses: [{ _id: courseId }],
        userDetails: userProfile,
      });
      return;
    }
  };
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructor cannot buy the course");
      return;
    }
    if (user) {
      const courseDetails =
        courseData?.courseDetails || courseData?.data?.courseDetails;
      dispatch(addToCart(courseDetails));
      return;
    }
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to add to cart",
      btn1text: "login",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  function isCourseAddded() {
    if (localStorage.getItem("cart")) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const courseDetails =
        courseData?.courseDetails || courseData?.data?.courseDetails;
      for (const cartCourse of cartItems) {
        if (cartCourse._id === courseDetails?._id) {
          return true;
        }
      }
      return false;
    }
  }

  const handleRemoveToCart = () => {
    const courseDetails =
      courseData?.courseDetails || courseData?.data?.courseDetails;
    dispatch(removeFromCart(courseDetails?._id));
  };

  const isAlreadyBuy = () => {
    if (user === null || user.accountType === "Instructor") {
      return false;
    }
    const coursesEnrolled = user?.courses;
    for (const userCourse of coursesEnrolled) {
      if (userCourse === courseId) return true;
    }
    return false;
  };

  if (loading || courseLoading || !courseData) {
    return <div>Loading...</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const getRatings = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const totalRatings = ratings.map((rating) => rating.rating);
    return totalRatings.reduce((a, b) => a + b, 0) / totalRatings.length;
  };

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseData.courseDetails || courseData.data?.courseDetails || {};
  return (
    <>
      {/* Details and Course Buy Card */}
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto box-content px-4 lg:w-[1100px]  2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] flex items-center justify-center m-auto lg:hidden w-full">
              <img
                src={thumbnail}
                alt={courseName || "Course thumbnail"}
                loading="lazy"
                className="aspect-auto h-fit w-fit"
              />
            </div>

            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg w-full text-richblack-5">
              <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                {courseName}
              </p>
              <p className="text-richblack-200 xl:w-[80%]">
                {courseDescription}
              </p>

              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">
                  {getRatings(ratingAndReviews) || 0}
                </span>
                <ReactStars
                  edit={false}
                  value={getRatings(ratingAndReviews)}
                  size={30}
                />
                <span>{`(${ratingAndReviews?.length} reviews) `}</span>
                <span>{`(${studentEnrolled?.length} students )`}</span>
              </div>

              <div>
                <p>Created By {`${instructor.firstName}`}</p>
              </div>

              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <i className=" text-white">
                    <IoIosInformationCircleOutline />
                  </i>
                  Created At {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <BsGlobe /> English
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              {isAlreadyBuy() ? (
                <button
                  onClick={() => navigate("/dashboard/enrolled-courses")}
                  className="yellowButton"
                >
                  Go To Course
                </button>
              ) : (
                <button
                  className="yellowButton"
                  onClick={() => handleBuyCourse()}
                >
                  Buy Now
                </button>
              )}

              {!studentEnrolled?.includes(user?._id) &&
                (isCourseAddded() ? (
                  <button
                    onClick={handleRemoveToCart}
                    className="lg:blackButton bg-richblack-400 font-bold rounded-md  px-[20px] py-[8px]"
                  >
                    Remove From Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="lg:blackButton bg-richblack-400 font-bold rounded-md  px-[20px] py-[8px]"
                  >
                    Add to Cart
                  </button>
                ))}
            </div>
          </div>

          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] -translate-x-10  translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={
                courseData?.courseDetails || courseData?.data?.courseDetails
              }
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* What will you learn, Course Content, Sections dropdown, Author */}
      <div className="mx-auto box-content  text-start text-richblack-5 lg:w-[1150px] w-full md:w-full">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]   px-4">
          <div className="my-8 border x-2 border-richblack-600 xl:w-[80%] p-8">
            <p className="text-3xl font-semibold"> What You WIll learn</p>
            <div className="mt-5">{whatYouWillLearn}</div>
          </div>

          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content:</p>

              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>{courseContent?.length} section(s)</span>

                  <span>{totalNoOfLectures} lectures</span>
                  <span>{courseData.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all Sections
                  </button>
                </div>
              </div>
            </div>

            <div className="py-4">
              {courseContent.map((section) => (
                <div
                  key={section._id}
                  className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0"
                >
                  {/* Section */}
                  <div onClick={() => handleActive(section._id)}>
                    <div className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]">
                      <div className="flex items-center gap-2">
                        {isActive.includes(section._id) ? (
                          <i className=" -rotate-90">
                            <MdOutlineArrowForwardIos />
                          </i>
                        ) : (
                          <i className=" rotate-90">
                            <MdOutlineArrowForwardIos />
                          </i>
                        )}
                        <p>{section.sectionName}</p>
                      </div>

                      <div className=" space-x-4">
                        <span className=" text-yellow-25">
                          {" "}
                          {`${section?.subSection?.length} lecture(s)`}{" "}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SubSections */}
                  <div
                    className={` ${
                      isActive.includes(section._id) ? "h-fit" : ""
                    } relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                  >
                    {section.subSection.map((subSection) => (
                      <div
                        key={subSection._id}
                        className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold"
                      >
                        <div className="py-2 flex justify-start items-center gap-2">
                          <span>
                            <BiVideo />
                          </span>
                          <p>{subSection.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className=" flex items-center gap-4 py-4">
                <img
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                  alt={`${instructor.firstName} ${instructor.lastName}`}
                  src={instructor.image}
                />
                <p className="text-lg">
                  {instructor.firstName} {instructor.lastName}{" "}
                </p>
              </div>
              <p className="text-lg">{instructor.additionalDetails.about}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseDetails;
