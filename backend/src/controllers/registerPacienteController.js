import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import pacienteModel from "../models/pacienteModel.js";
import HTMLVerificationEmail from "../utils/sendMailVerification.js";

import { config } from "../config.js";

const registerPacienteController = {};

registerPacienteController.register = async (req, res) => {
  try {

    let {
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      address,
      bloodType,
      phoneEmergencyContacts,
    } = req.body;

    if (typeof phoneEmergencyContacts === "string") {
      try {
        phoneEmergencyContacts = JSON.parse(phoneEmergencyContacts);
      } catch (e) {
        phoneEmergencyContacts = [];
      }
    }

    const existPaciente = await pacienteModel.findOne({ email });
    if (existPaciente) {
      return res.status(400).json({ message: "email already in use" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newPaciente = new pacienteModel({
      name,
      lastName,
      email,
      password: passwordHash,
      birthDate,
      phone,
      address,
      bloodType,
      phoneEmergencyContacts,
      isVerified: false,
      loginAttempts: 0,
    });

    if (req.file) {
      newPaciente.profilePhoto = req.file.path;
      newPaciente.public_id = req.file.filename;
    }

    await newPaciente.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");

    const tokenCode = jsonwebtoken.sign(

      { email, verificationCode },

      config.JWT.secret,

      { expiresIn: "15m" },
    );

    res.cookie("verificationTokenCookie", tokenCode, {
      maxAge: 15 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta - Hospital Rosales",
      html: HTMLVerificationEmail(verificationCode),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "error" });
      }

      res
        .status(200)
        .json({ message: "Paciente registrado, código enviado al correo" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

registerPacienteController.verifyCode = async (req, res) => {
  try {

    const { verificationCodeRequest } = req.body;

    const token = req.cookies.verificationTokenCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const paciente = await pacienteModel.findOne({ email });
    paciente.isVerified = true;
    await paciente.save();

    res.clearCookie("verificationTokenCookie");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerPacienteController;
