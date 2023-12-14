import express from "express"
import { createListing, deleteListing, getListing, getListings, updateListing } from "../controller/listing.controller.js";
import { veriftyToken } from "../utils/verifyUser.js";
const router= express.Router();
router.post('/create',veriftyToken,createListing)
router.delete('/delete/:id',veriftyToken,deleteListing)
router.post('/update/:id',veriftyToken,updateListing)
router.get('/get/:id',getListing)
router.get('/get',getListings)

export default router;