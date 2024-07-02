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
        console.log(CategoryDetails);

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
        res.status(200).json({
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

exports.categoryPageDetails = async (req,res)=>{
    try{
        const {categoryId} = req.body;

        //get courses for specified category
        const selectedCategory = await Category.findById(categoryId)
                                           .populate("courses")
                                           .exec();
        console.log(selectedCategory);

        //handle the case when category is not found
        if(!selectedCategory){
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        //handle the case when there are no courses
        if(selectedCategory.courses.length === 0){
            console.log("No courses found for this category");
            return res.status(404).json({
                success: false,
                message: "No courses found for this category"
            }) 
        }
        const selectedCourses = selectedCategory.courses;

        //get courses for other categories
        const categoriesExceptSelected = await Category.find({_id:{$ne:categoryId}}).populate("courses").exec();
        let differentCourses=[];
        for(const category of categoriesExceptSelected){
            differentCourses.push(...category.courses);
        }

        //get top-selling courses across all categories
        const allCategories =await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category)=> category.courses);
        const mostSellingCourses = allCourses.sort((a,b)=>b.sold - a.sold).slice(0,10);

        res.status(200).json({
            selectedCourses:selectedCourses,
            differentCourses:differentCourses,
            mostSellingCourses:mostSellingCourses,
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}