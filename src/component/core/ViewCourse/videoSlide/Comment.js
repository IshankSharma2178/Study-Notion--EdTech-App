import React, { useEffect, useState } from 'react';
import { fetchComments, addComment } from "../../../../services/operations/courseDetailAPI";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

function Comment({ subSectionId }) {
    const { token } = useSelector((state) => state.auth);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [commentsArray, setCommentsArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const { courseId } = useParams();
    
    useEffect(() => {
        const fetchComment = async () => {
            if (!subSectionId) return;  
            setLoading(true);
            try {
                const comments = await fetchComments(token, subSectionId, courseId);
                console.log("Comments : ",comments)
                setCommentsArray(comments);
            } catch (error) {
                console.error("Error fetching comments: ", error);
            }
            setLoading(false);
        };
        
        fetchComment();
        
    }, [subSectionId, token, courseId]);

    const onSubmit = async (data) => {
        try {
            setValue("comment", "");
            const result = await addComment({ comment: data.comment, subSectionId, courseId }, token);
            const toastId = toast.loading("Loading...");
            const updatedComments = await fetchComments(token, subSectionId);
            setCommentsArray(updatedComments);
            toast.dismiss(toastId);
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };
    
    function formatDate(isoString) {
        const date = new Date(isoString);
    
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
    
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
    
        const time = `${hours}:${minutes}${ampm}`;
    
        return `${month} ${day} ${year} | ${time}`;
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-5 gap-2 min-h-[200px]'>
                <label htmlFor='comment'>Add a Comment</label>
                <textarea
                    id="comment"
                    {...register("comment", { required: true })}
                    placeholder='Add a comment'
                    className='bg-richblack-700 h-[100px] p-3 rounded-lg outline-none text-richblack-5'
                />
                {errors.comment && <p className='text-red-500'>Write Something</p>}
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='flex flex-row font-bold items-center w-fit transition-all hover:scale-95 hover:shadow-none duration-200 shadow-custom justify-center gap-2 py-2 px-4 bg-yellow-50 rounded-lg text-black'
                    >
                        Submit
                    </button>
                </div>
            </form>
            {
                loading ? (<div className='spinner w-full m-auto'></div>) : 
                (<div className='flex flex-col gap-10 mb-10'>
                    {commentsArray?.slice().reverse().map((comment, index) => (
                        <div key={index} className='h-fit flex flex-row justify-start items-start gap-6'>
                            <div className='h-full'>
                                <img src={comment?.UserImageOfComment} loading="lazy" className='w-10 h-10 md:w-14 md:h-14 rounded-full' alt='User' />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row gap-4 items-center'>
                                    <h1 className='text-sm truncate md:text-lg'>{comment?.UserNameOfComment}</h1>
                                    <p className='text-xs text-richblack-200'>{formatDate(comment?.createdAt)}</p>
                                </div>
                                <p className='text-base text-richblack-100 mt-1 break-words whitespace-pre-wrap'>{comment?.Comment}</p>
                            </div>
                        </div>
                    ))}
                </div>)
            }
        </div>
    );
}

export default Comment;
