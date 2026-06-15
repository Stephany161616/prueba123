import express from "express";
import equipoController from "../controllers/equipoController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .get(equipoController.getEquipos)
  .post(upload.single("image"), equipoController.insertEquipo);

router
  .route("/:id")
  .put(upload.single("image"), equipoController.updateEquipo)
  .delete(equipoController.deleteEquipo);

export default router;
