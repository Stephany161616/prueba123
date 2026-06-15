import express from "express";
import citaController from "../controllers/citaController.js";

const router = express.Router();

router
  .route("/")
  .get(citaController.getCitas)
  .post(citaController.insertCita);

router
  .route("/:id")
  .put(citaController.updateCita)
  .delete(citaController.deleteCita);

export default router;
