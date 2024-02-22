import slugify from "slugify";
import Category from "../models/category.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "name is required" });

        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "category already exist"
            })
        }
        const category = await new Category({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            category,
            message: "new category created"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in category"
        })
    }
}
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params

        const category = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(201).send({
            success: true,
            category,
            message: "new category updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in category"
        })
    }
}

export const categoryController = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).send({
            success: true,
            message: "All category list",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in category"
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {

        const category = await Category.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "get singlee category succesfully",
            category
        })
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            error,
            message: "error in single category"
        })
    }
}

export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "category deleted succesfully",
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in single category"
        })
    }
}