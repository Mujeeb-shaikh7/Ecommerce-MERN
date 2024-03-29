import Product from "../models/product.js";
import fs from "fs"
import slugify from "slugify";

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = new Product({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in product"
        })
    }
}

export const getProductController=async(req,res)=>{
    try {
        const products=await Product.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"All products",
            products,
            Totalcount:products.length
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in product"
        })
    }
}


export const getSingleProductController=async(req,res)=>{
    try {
       const product=await Product.findOne({slug:req.params.slug}).select("-photo").populate('category') 
        res.status(200).send({
            success:true,
            message:"single products",
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in product"
        })
    }
}
export const productPhotoController=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in product photo"
        })
    }

}

export const deleteProductController=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.pid).select("-photo");
        return res.status(200).send({
            success:true,
            message:"Product deleted succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in delete product"
        })
    }
}

export const updateProductController=async(req,res)=>{
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = await Product.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in product"
        })
    }
}