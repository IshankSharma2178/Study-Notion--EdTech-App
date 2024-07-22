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

exports.categoryPageDetails = async (req,res)=>{
    try{
        const {categoryId} = req.body;

        //get course for specified category
        const selectedCategory = await Category.findById(categoryId)
                                           .populate("course")
                                           .exec();
        console.log("grw",selectedCategory);

        //handle the case when category is not found
        if(!selectedCategory){
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        //handle the case when there are no course
        if(selectedCategory.course.length === 0){
            console.log("No course found for this category");
            return res.status(404).json({
                success: false,
                message: "No course found for this category"
            }) 
        }
        const selectedCourse = selectedCategory.course;

        //get course for other categories
        const categoriesExceptSelected = await Category.find({_id:{$ne:categoryId}}).populate("course").exec();
        console.log("selectedCategory",categoriesExceptSelected)

        let differentCourse=[];
        for(const category of categoriesExceptSelected){
            differentCourse.push(...category.course);
        }

        //get top-selling course across all categories
        const allCategories =await Category.find().populate("course");
        const allCourse = allCategories.flatMap((category)=> category.course);
        const mostSellingCourse = allCourse.sort((a,b)=>b.sold - a.sold).slice(0,10);

        return res.status(200).json({
            selectedCategory:selectedCategory,
            selectedCourse:selectedCourse,
            differentCourse:differentCourse,
            mostSellingCourse:mostSellingCourse,
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}