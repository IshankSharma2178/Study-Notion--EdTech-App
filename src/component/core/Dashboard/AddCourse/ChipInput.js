import React, { useState, useEffect } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from 'react-redux';

function ChipInput({ name, placeholder, label, errors, register, setValue }) {
    const { course, editCourse } = useSelector((state) => state.course);
    const [allTag, setAllTag] = useState([]);

    useEffect(() => {
        if (editCourse && course?.tag) {
            try {
                setAllTag((course.tag));
              } catch (error) {
                console.error("Failed to parse tags:", error);
            }
        }
        register(name, { required: true, validate: (value) => value.length > 0 });
    }, [editCourse, course, name, register]);

    useEffect(() => {
        setValue(name, allTag);
    }, [allTag, name, setValue]);

    const addHandler = (e) => {
        if (e.target.value.trim() === "") {
            return;
        }
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (!allTag.includes(e.target.value.trim())) {
                setAllTag([...allTag, e.target.value.trim()]);
                e.target.value = "";
            }
        }
    };

    const removeHandler = (index) => {
        setAllTag(allTag.filter((_, i) => i !== index));
    };

    return (
        <div className='text-richblack-25 flex flex-col gap-2'>
            <div className='flex flex-row'>
                {allTag?.length > 0 &&
                    allTag.map((element, index) => (
                        <div key={index} className='bg-yellow-100 px-3 py-2 text-md text-black mr-2 flex flex-row rounded-full'>
                            {element !== "" && element}
                            <button
                                type="button"
                                onClick={() => removeHandler(index)}
                            >
                                <RxCrossCircled className='text-pink-400 font-bold text-lg ml-3' />
                            </button>
                        </div>
                    ))
                }
            </div>
            <label htmlFor={name}>{label}<sup className='text-pink-200'> *</sup></label>
            <input
                id={name}
                name={name}
                placeholder={placeholder}
                onKeyDown={addHandler}
                className='w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25'
            />
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    );
}

export default ChipInput;
