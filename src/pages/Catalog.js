import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../component/common/Footer';
import { useCatalogPageData } from '../hooks/useCatalog';
import { useCourseCategories } from '../hooks/useCourses';
import CourseCard from "../component/core/Dashboard/Catalog/CourseCard";
import CourseSlider from "../component/core/Dashboard/Catalog/CourseSlider";

function Catalog() {
    const { catalogName } = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);
    
    const { data: categories, isLoading: categoriesLoading } = useCourseCategories();
    const { data: catalogPageData, isLoading: catalogLoading } = useCatalogPageData(categoryId);

    useEffect(() => {
        if (categories && categories.length > 0) {
            const category = categories.find(
                (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.split(" ").join("-").toLowerCase()
            );
            if (category) {
                setCategoryId(category._id);
            } else {
                console.error("Category not found");
            }
        }
    }, [categories, catalogName]);

    const loading = categoriesLoading || catalogLoading;

    
    return (
        <>
            {loading ? (
                <div className='spinner w-full h-screen m-auto'></div>
            ) : !catalogPageData ? (
                <div className='text-center text-xl text-richblack-300 my-8'> No Courses for the category </div>
            ) : (
                <>
                    <div className="box-content bg-richblack-800 md:px-4 md:py-0 py-6 px-1">
                        <div className="mx-auto flex min-h-[260px] flex-col justify-center gap-4 max-w-maxContent w-11/12 ">
                            <p className="text-sm text-richblack-300">{`Home / Catalog / `}
                                <span className="text-yellow-25">
                                    {catalogPageData?.name}
                                </span>
                            </p>
                            <p className="text-3xl text-richblack-5"> {catalogPageData?.name} </p>
                            <p className="max-w-[870px] text-richblack-200"> {catalogPageData?.description}</p>
                        </div>
                    </div>

                    <div>
                        {/* section1 */}
                        <div className="mx-auto box-content  max-w-maxContent w-11/12 py-12 ">
                            <div className="section_heading">Courses to get you started</div>
                            <div className="my-4 flex border-b border-b-richblack-600  text-sm">
                                <p
                                    className={`px-4 py-2 ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
                                    onClick={() => setActive(1)}
                                >
                                    Most Popular
                                </p>
                                <p
                                    className={`px-4 py-2 ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
                                    onClick={() => setActive(2)}
                                >
                                    New
                                </p>
                            </div>
                            <div className={`px-1 md:px-4 ${active !==1?"hidden":""}`}>
                                <CourseSlider Courses={catalogPageData?.selectedCourses?.course} />
                            </div>
                            <div className={`px-1 md:px-4 ${active !==2?"hidden":""}`}>
                                <CourseSlider Courses={catalogPageData?.latestCourses} />
                            </div>
                        </div>

                        {/* section3 */}
                        <div className="mx-auto box-content  max-w-maxContent w-11/12 px-4 py-12 lg:max-w-maxContent">
                            <div className="section_heading">Most Selling Courses</div>
                            <div className='py-8'>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {
                                        catalogPageData?.mostSellingCourse?.length === 0 ? (
                                            <p className='text-xl text-white'>No Most selling courses</p>
                                        ) : (
                                            catalogPageData?.mostSellingCourses?.slice(0, 4)
                                                .map((course, index) => (
                                                    <CourseCard course={course} key={index} Height={"h-[300px]"} />
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
