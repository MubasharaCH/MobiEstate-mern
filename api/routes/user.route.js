import express from "express";
import { deleteUser, getUser, getUserLisings, test, updateUser } from "../controller/user.controller.js";
import { veriftyToken } from "../utils/verifyUser.js";

 
const router=express.Router();

router.get("/",test)
router.post('/update/:id',veriftyToken,updateUser)
router.delete('/delete/:id',veriftyToken,deleteUser)
router.get('/listings/:id',veriftyToken,getUserLisings)
router.get('/:id',veriftyToken,getUser)


export default router;