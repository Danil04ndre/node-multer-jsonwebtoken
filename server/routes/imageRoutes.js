import { Router } from "express";
import { getData, uploadFile } from "../controllers/imageController.js";
import { uploadImage } from "../middlewares/multerMiddlerware.js";

const routerImage = Router();

routerImage.post("/images", uploadImage.single("image"), uploadFile);

routerImage.get("/data", getData);
export default routerImage;
