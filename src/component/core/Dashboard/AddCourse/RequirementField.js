import React, { useEffect, useState } from 'react';
import { PiArrowBendDownRightFill } from "react-icons/pi";
import { IoIosRemoveCircle } from "react-icons/io";
import { useSelector } from 'react-redux';

function RequirementField({ name, label, register, errors, setValue, getValues }) {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const {course} = useSelector((state)=>state.course)

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            console.log(requirementList);
            setRequirement("");
        }
    };

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value?.length > 0,
        });
        if(course?.instructions?.length>0){
            setRequirementList(course?.instructions)
        }
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };

    return (
        <div  className='text-richblack-25 flex flex-col gap-2 text-[14px] '>
            <label  className='tracking-wider'>{label}<sup>*</sup></label>
            <div>
                <input 
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='w-full rounded-[0.5rem] outline-none shadow-custom2 placeholder-richblack-300 placeholder:text-base  bg-richblack-700 focus:shadow-none p-[12px] text-richblack-25'

                />
                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='font-semibold flex items-center justify-center text-lg pt-2 gap-1 text-yellow-50 hover:scale-90 duration-100 transition-all '
                >      
                    Add
                    <PiArrowBendDownRightFill  className="transform scale-x-[-1]"/>
                </button>
            </div>
            {requirementList.length > 0 && (
                <ul className='flex flex-col gap-2 max-w-[100%]'>
                    {requirementList.map((requirement, index) => (
                        <li key={index} className='flex md:flex-row flex-col md:items-center text-richblack-5 gap-2'>
                            <span className='w-fit px-2 py-1 rounded-md  bg-richblack-700  '>{requirement}</span>
                            <button 
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-s text-yellow-50 flex flex-row gap-1 items-center hover:text-pink-300 transition-all duration-200 '
                            >
                                Remove
                                <IoIosRemoveCircle />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span  className='text-pink-200 text-[12px]'>{label} is required</span>
            )}
        </div>
    );
}

export default RequirementField;
