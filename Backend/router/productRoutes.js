import express from "express"; 
const router = express.Router();
import {getAllProduct, createAllProduct, getProduct, updateProduct, deleteProduct} from "../controllers/productController.js";

router.get("/",getAllProduct);
router.get("/:id",getProduct);
router.post("/",createAllProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);


export default router;