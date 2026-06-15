import pacienteModel from "../models/pacienteModel.js";
import bcryptjs from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

const pacienteController = {};

pacienteController.getPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteModel.find();
    return res.status(200).json(pacientes);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

pacienteController.getPacienteById = async (req, res) => {
  try {
    const paciente = await pacienteModel.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente not found" });
    }
    return res.status(200).json(paciente);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

pacienteController.updatePaciente = async (req, res) => {
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
        phoneEmergencyContacts = undefined;
      }
    }

    const paciente = await pacienteModel.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente not found" });
    }

    const updatedData = {
      name,
      lastName,
      email,
      birthDate,
      phone,
      address,
      bloodType,
    };

    if (phoneEmergencyContacts !== undefined) {
      updatedData.phoneEmergencyContacts = phoneEmergencyContacts;
    }

    if (password) {
      updatedData.password = await bcryptjs.hash(password, 10);
    }

    if (req.file) {

      if (paciente.public_id) {
        await cloudinary.uploader.destroy(paciente.public_id);
      }
      updatedData.profilePhoto = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    await pacienteModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.status(200).json({ message: "Paciente updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

pacienteController.deletePaciente = async (req, res) => {
  try {
    const paciente = await pacienteModel.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente not found" });
    }

    if (paciente.public_id) {
      await cloudinary.uploader.destroy(paciente.public_id);
    }

    await pacienteModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Paciente deleted" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default pacienteController;
