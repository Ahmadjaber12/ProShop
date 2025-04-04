import express from "express";
import * as UserController from '../Controllers/User.controller.js'
import * as AuthFunctions from '../Middleware/authFunctions.js'
const Userrouter=express.Router();

Userrouter.route('/').get(AuthFunctions.VerifyToken,AuthFunctions.Admin,UserController.getUsers).post()
Userrouter.post('/login',UserController.authUser);
Userrouter.route('/profile').get(AuthFunctions.VerifyToken,UserController.getUserProfile).put(AuthFunctions.VerifyToken,UserController.UpdateUserProfile);
Userrouter.post('/logout',UserController.logout);
Userrouter.post("/register",UserController.RegisterUser);
Userrouter.get('/:id',AuthFunctions.VerifyToken,AuthFunctions.Admin,UserController.getUserById);
Userrouter.put('/:id',AuthFunctions.VerifyToken,AuthFunctions.Admin,UserController.UpdateUser);
Userrouter.delete('/:id',AuthFunctions.VerifyToken,AuthFunctions.Admin,UserController.deleteUser);





export default Userrouter;