import express from "express";
import * as orderController from '../Controllers/Order.controller.js'
import * as AuthFunctions from '../Middleware/authFunctions.js'
const router=express.Router();

router.route('/').get(AuthFunctions.VerifyToken,orderController.getAllOrders);
router.get('/admin',orderController.getAdminOrders);
router.get('/:id',AuthFunctions.VerifyToken,orderController.getOrderById);
router.post('/',AuthFunctions.VerifyToken,orderController.addOrderItems);
router.put('/:id/pay',AuthFunctions.VerifyToken,orderController.UpdateOrderToPaid);
router.put("/admin/updatetodelivered/:id",AuthFunctions.VerifyToken,AuthFunctions.Admin,orderController.UpdateOrderToDelivered)

export default router;