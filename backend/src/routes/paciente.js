import express from "express";
import pacienteController from "../controllers/pacienteController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/").get(pacienteController.getPacientes);

router
  .route("/:id")
  .get(pacienteController.getPacienteById)
  .put(upload.single("profilePhoto"), pacienteController.updatePaciente)
  .delete(pacienteController.deletePaciente);

export default router;
