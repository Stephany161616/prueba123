import express from "express";
import registerPacienteController from "../controllers/registerPacienteController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .post(upload.single("profilePhoto"), registerPacienteController.register);

router
  .route("/verifyCodeEmail")
  .post(registerPacienteController.verifyCode);

export default router;
