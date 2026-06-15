import express from "express";
import expedienteController from "../controllers/expedienteController.js";

const router = express.Router();

router
  .route("/")
  .get(expedienteController.getExpedientes)
  .post(expedienteController.insertExpediente);

router
  .route("/:id")
  .put(expedienteController.updateExpediente)
  .delete(expedienteController.deleteExpediente);

export default router;
