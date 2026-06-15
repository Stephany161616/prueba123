import citaModel from "../models/citaModel.js";

const citaController = {};

citaController.getCitas = async (req, res) => {
  try {
    const citas = await citaModel
      .find()
      .populate("patient_id")
      .populate("specialty_id");
    return res.status(200).json(citas);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

citaController.insertCita = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;

    const newCita = new citaModel({
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    });

    await newCita.save();

    return res.status(201).json({ message: "Cita saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

citaController.updateCita = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;

    const updated = await citaModel.findByIdAndUpdate(
      req.params.id,
      {
        patient_id,
        specialty_id,
        appointmentDate,
        reason,
        status,
        observations,
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Cita not found" });
    }

    return res.status(200).json({ message: "Cita updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

citaController.deleteCita = async (req, res) => {
  try {
    const deleted = await citaModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Cita not found" });
    }
    return res.status(200).json({ message: "Cita deleted" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default citaController;
