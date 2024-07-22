import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Ensure correct import
import Footer from '../component/common/Footer';
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import { apiConnector } from '../services/apiconnector';
import { catalogData, courseEndpoints } from '../services/apis';
import CourseCard from "../component/core/Dashboard/Catalog/CourseCard";
import CourseSlider from "../component/core/Dashboard/Catalog/CourseSlider"

const { CATEGORIES_API } = courseEndpoints;

function Catalog() {
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiConnector("GET", CATEGORIES_API);
                const category = res?.data?.Categorys?.find(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.split(" ").join("-").toLowerCase()
                );
                if (category) {
                    setCategoryId(category._id);
                } else {
                    console.error("Category not found");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            if (!categoryId) return;
            try {
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
                console.log(res);
            } catch (error) {
                console.error("Error fetching catalog page data:", error);
            }
        };
        getCategoryDetails();
    }, [categoryId]);

    return (
        <div className='text-white'>
            <div>
                <p>{`Home / Catalog / `}
                    <span>{catalogPageData?.selectedCategory?.name}</span>
                </p>
                <p>
                <span>{catalogPageData?.selectedCategory?.name}</span>
                </p>
                <p>
                <span>{catalogPageData?.selectedCategory?.description}</span>
                </p>
            </div>
            
            {/* Section-1 */}
            <div>
            <div>Courses to get you started</div>
                <div className='flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div>
                    <CourseSlider Course={catalogPageData?.selectedCategory?.course}/> 
                </div>
            </div>

            {/* Section-2 */}
            <div>
                <p>Top Course {catalogPageData?.selectedCategory?.name} </p>
                <div>
                    <CourseSlider Course={catalogPageData?.differentCourse?.course}/>
                </div>
            </div>

            
            {/* Section-3 */}
            <div>
                <p>Frequently Bought Courses</p>
                <div className='py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        {
                            catalogPageData?.mostSellingCourse?.slice(0,4).map((course,index) =>{
                                <CourseCard course={course} key={index} Height={"h"}/>
                            })
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Catalog;
