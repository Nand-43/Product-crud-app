import db from "../config/db.js";

export const getAllProduct = async(req,res) => {
   try{
    const result = await db.query("Select * from product");

    console.log("fetched products", result.rows);
    res.status(200).json({success:true, data: result.rows});
   }

   catch(error){
     console.log("Error getProducts",error);
   }
}
export const createAllProduct = async(req,res) => {

    const {name, price, image} = req.body;
    
    if(!name || !price ||!image){
        return res.status(400).json({success:false, message: "All fields are required"});
    }

    try{
       const newProduct = await db.query(`Insert into product (name,price,image) 
        values ($1, $2, $3)
        Returning *`,
        [name, price, image]);
         
        res.status(201).json({
            success: true,
            data: newProduct.rows[0]
        });
    }
    catch(error){
       console.log("Error in createProduct function", error);
       res.status(500).json({message: "Internal server error"});
    }

}
export const getProduct = async(req,res) => {
   const {id} = req.params;

   try{
       const product = await db.query(`Select * from product where id= $1`, [id]);
       res.status(200).json({success: true, data: product.rows[0] });
   }
   catch(error){
       console.log("Error in getProduct function", error);
       res.status(500).json({success: false, message:"Internal Server Error"});
   }
}

export const updateProduct = async(req,res) => {
    const {id} = req.params;
    const {name, price, image} = req.body;

    try{
        const updateProduct = await db.query(`Update product set name=$1, price=$2, image=$3 where id=$4 returning *`,
            [name, price, image, id]
        );

        if(updateProduct.rows.length === 0){
            return res.status(404).json({
                success:false,
                message: "Product not found",
            });
        }
         res.status(200).json({
            success: true,
            data: updateProduct.rows[0]
        });
    }
    catch(error){
         console.log("Error in updateProduct function", error);
         res.status(500).json({
            success: false,
            message: "Internal Server error",
         })
    }
}

export const deleteProduct = async(req,res) => {

    const {id} = req.params; 

    try{
       const deletedProduct = await db.query(
        "Delete from product where id= $1 returning *", 
        [id]
       );

       if(deletedProduct.rows.length === 0){
            return res.status(404).json({
                success:false,
                message: "Product not found",
            });

           

    }

     res.status(200).json({
            success: true,
            data: deletedProduct.rows[0]
        });
}
    catch(error){
        console.log("Error in updateProduct function", error);
         res.status(500).json({
            success: false,
            message: "Internal Server error",
         })
    }
}


