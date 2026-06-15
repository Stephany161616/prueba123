import equipoModel from "../models/equipoModel.js";
import { v2 as cloudinary } from "cloudinary";

const equipoController = {};

equipoController.getEquipos = async (req, res) => {
  try {
    const equipos = await equipoModel.find();
    return res.status(200).json(equipos);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

equipoController.insertEquipo = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      status,
      isAvailable,
    } = req.body;

    const newEquipo = new equipoModel({
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      status,
      isAvailable,
    });

    if (req.file) {
      newEquipo.image = req.file.path;
      newEquipo.public_id = req.file.filename;
    }

    await newEquipo.save();

    return res.status(201).json({ message: "Equipo saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

equipoController.updateEquipo = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      status,
      isAvailable,
    } = req.body;

    const equipoFound = await equipoModel.findById(req.params.id);
    if (!equipoFound) {
      return res.status(404).json({ message: "Equipo not found" });
    }

    const updatedData = {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      status,
      isAvailable,
    };

    if (req.file) {

      if (equipoFound.public_id) {
        await cloudinary.uploader.destroy(equipoFound.public_id);
      }
      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    await equipoModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.status(200).json({ message: "Equipo updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

equipoController.deleteEquipo = async (req, res) => {
  try {
    const equipoFound = await equipoModel.findById(req.params.id);
    if (!equipoFound) {
      return res.status(404).json({ message: "Equipo not found" });
    }

    if (equipoFound.public_id) {
      await cloudinary.uploader.destroy(equipoFound.public_id);
    }

    await equipoModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Equipo deleted" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default equipoController;
