import express from "express";
import { addgallery,  deletegallery,  getgallery } from "../controllers/gallery.controller.js";
import { uploadGallery } from "../utlis/multerhandler.js";



const galleryrouter = express.Router();
galleryrouter.post("/add-gallery",uploadGallery.array("image", 10), addgallery)
galleryrouter.get("/get-gallery", getgallery)
galleryrouter.delete("/delete-gallery/:id", deletegallery)


export default galleryrouter;
