import express from "express";
import especialidadController from "../controllers/especialidadController.js";

const router = express.Router();

router
  .route("/")
  .get(especialidadController.getEspecialidades)
  .post(especialidadController.insertEspecialidad);

router
  .route("/:id")
  .put(especialidadController.updateEspecialidad)
  .delete(especialidadController.deleteEspecialidad);

export default router;
