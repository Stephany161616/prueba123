import especialidadModel from "../models/especialidadModel.js";

const especialidadController = {};

especialidadController.getEspecialidades = async (req, res) => {
  try {
    const especialidades = await especialidadModel.find();
    return res.status(200).json(especialidades);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

especialidadController.insertEspecialidad = async (req, res) => {
  try {
    const { specialtyName, description, isAvailable } = req.body;

    const newEspecialidad = new especialidadModel({
      specialtyName,
      description,
      isAvailable,
    });

    await newEspecialidad.save();

    return res.status(201).json({ message: "Especialidad saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

especialidadController.updateEspecialidad = async (req, res) => {
  try {
    const { specialtyName, description, isAvailable } = req.body;

    const updated = await especialidadModel.findByIdAndUpdate(
      req.params.id,
      { specialtyName, description, isAvailable },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Especialidad not found" });
    }

    return res.status(200).json({ message: "Especialidad updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

especialidadController.deleteEspecialidad = async (req, res) => {
  try {
    const deleted = await especialidadModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Especialidad not found" });
    }
    return res.status(200).json({ message: "Especialidad deleted" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default especialidadController;
