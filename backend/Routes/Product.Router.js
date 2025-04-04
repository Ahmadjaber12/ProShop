import express from "express";
import * as ProductController from '../Controllers/Products.controller.js'
import * as AuthFunctions from '../Middleware/authFunctions.js'

const router=express.Router();

router.get('/',ProductController.getAllProducts)
router.get('/top',ProductController.getTopProducts); 
router.get('/:id',ProductController.getById)
router.post('/',AuthFunctions.VerifyToken,AuthFunctions.Admin,ProductController.CreateAdminProducts);
router.put('/:id',AuthFunctions.VerifyToken,AuthFunctions.Admin,ProductController.UpdateAdminProduct)
router.delete('/:id',AuthFunctions.VerifyToken,AuthFunctions.Admin,ProductController.DeleteAdminProduct)
router.route('/:id/reviews').post(AuthFunctions.VerifyToken,ProductController.CreateProductReview);
export default router;