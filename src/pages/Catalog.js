import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Ensure correct import
import Footer from '../component/common/Footer';
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import CourseCard from "../component/core/Dashboard/Catalog/CourseCard";
import CourseSlider from "../component/core/Dashboard/Catalog/CourseSlider";

const { CATEGORIES_API } = courseEndpoints;

function Catalog() {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(false);
    let variable = false;
    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true); 
                const res = await apiConnector("GET", CATEGORIES_API);
                const category = res?.data?.Categorys?.find(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.split(" ").join("-").toLowerCase()
                );
                if (category) {
                    setCategoryId(category._id);
                    console.log("id  :", category._id);
                } else {
                    console.error("Category not found");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
            }
            if(variable){
                setLoading(false);
            }
        };
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => { 
            if (!categoryId) return;
            try {
                setLoading(true); 
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            } catch (error) {
                console.error("Error fetching catalog page data:", error);
            } finally {
                setLoading(false); 
            }
            setLoading(false); 
            variable = true;
        };
        getCategoryDetails();
    }, [categoryId]);

    
    return (
        <>
            {loading ? (
                <div className='spinner w-full h-screen m-auto'></div>
            ) : !catalogPageData ? (
                <div className='text-center text-xl text-richblack-300 my-8'> No Courses for the category </div>
            ) : (
                <>
                    <div className="box-content bg-richblack-800 px-4">
                        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                            <p className="text-sm text-richblack-300">{`Home / Catalog / `}
                                <span className="text-yellow-25">
                                    {catalogPageData?.selectedCategory?.name}
                                </span>
                            </p>
                            <p className="text-3xl text-richblack-5"> {catalogPageData?.selectedCategory?.name} </p>
                            <p className="max-w-[870px] text-richblack-200"> {catalogPageData?.selectedCategory?.description}</p>
                        </div>
                    </div>

                    <div>
                        {/* section1 */}
                        <div className="mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent">
                            <div className="section_heading">Courses to get you started</div>
                            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                                <p
                                    className={`px-4 py-2 ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
                                    onClick={() => setActive(1)}
                                >
                                    Most Popular
                                </p>
                                {/* <p
                                    className={`px-4 py-2 ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
                                    onClick={() => setActive(2)}
                                >
                                    New
                                </p> */}
                            </div>
                            <div className='px-4'>
                                <CourseSlider Courses={catalogPageData?.selectedCategory?.course} />
                            </div>
                        </div>

                        {/* section2 */}
                        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                            <div className="section_heading">Checkout {catalogPageData?.differentCourses?.name} Courses Also</div>
                            <div className="py-8">
                                <CourseSlider Courses={catalogPageData?.differentCourses?.course} />
                            </div>
                        </div>

                        {/* section3 */}
                        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                            <div className="section_heading">Most Selling Courses</div>
                            <div className='py-8'>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {
                                        catalogPageData?.mostSellingCourse?.length === 0 ? (
                                            <p className='text-xl text-white'>No Most selling courses</p>
                                        ) : (
                                            catalogPageData?.mostSellingCourse?.slice(0, 4)
                                                .map((course, index) => (
                                                    <CourseCard course={course} key={index} Height={"h-[200px]"} />
                                                ))
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
}

export default Catalog;
