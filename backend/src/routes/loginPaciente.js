import express from "express";
import loginPacienteController from "../controllers/loginPacienteController.js";

const router = express.Router();

router.route("/").post(loginPacienteController.login);

export default router;
