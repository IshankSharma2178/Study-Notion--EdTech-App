const Category=require("../models/category");
const category = require("../models/category");

exports.createCategory=async(req,res,next) => {
    try{
        const {name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }
        
        const CategoryDetails =await Category.create({
            name: name, 
            description: description
        })

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//get all Categorys
exports.showAllCategorys = async (req,res) => {
    try{
        const allCategorys = await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"allCategorys Categorys found successfully",
            Categorys:allCategorys
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        
        // Get courses for the specified category
        const selectedCourses = await Category.findById(categoryId)
        .populate({
            path: 'course',
            select:"courseName ratingAndReviews status createdAt thumbnail price",
            match: { status: 'Published' },
            populate: [
                {
                        path: 'ratingAndReviews',
                    },
                    {
                        path: 'studentEnrolled',
                    }
                ]
            })
            .exec();

            console.log("Loading : ",selectedCourses)

            const latestCourses = selectedCourses.course.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
            
            console.log("latest Courses: ", latestCourses)
        // Handle the case when the category is not found
        if (!selectedCourses) {
            console.log("Category not found.");
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Handle the case when there are no courses
        if (!selectedCourses.course || selectedCourses.course.length === 0) {
            console.log("No courses found for the selected category.");
            return res.status(404).json({ success: false, message: "No courses found for the selected category." });
        }

        const allCourses = selectedCourses.course;

        const mostSellingCourses = allCourses
            .sort((a, b) => b.studentEnrolled.length - a.studentEnrolled.length)
            .slice(0, 10); 


        res.status(200).json({
            selectedCourses: selectedCourses,
            mostSellingCourses: mostSellingCourses,
            latestCourses:latestCourses,
            name: selectedCourses.name,
            description: selectedCourses.description,
            success: true
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
