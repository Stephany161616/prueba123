import expedienteModel from "../models/expedienteModel.js";

const expedienteController = {};

expedienteController.getExpedientes = async (req, res) => {
  try {
    const expedientes = await expedienteModel.find().populate("patient_id");
    return res.status(200).json(expedientes);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

expedienteController.insertExpediente = async (req, res) => {
  try {
    let { patient_id, diagnosis, medications, medicalNotes } = req.body;

    if (typeof medications === "string") {
      try {
        medications = JSON.parse(medications);
      } catch (e) {
        medications = [];
      }
    }

    const newExpediente = new expedienteModel({
      patient_id,
      diagnosis,
      medications,
      medicalNotes,
    });

    await newExpediente.save();

    return res.status(201).json({ message: "Expediente saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

expedienteController.updateExpediente = async (req, res) => {
  try {
    let { patient_id, diagnosis, medications, medicalNotes } = req.body;

    if (typeof medications === "string") {
      try {
        medications = JSON.parse(medications);
      } catch (e) {
        medications = undefined;
      }
    }

    const updatedData = { patient_id, diagnosis, medicalNotes };
    if (medications !== undefined) {
      updatedData.medications = medications;
    }

    const updated = await expedienteModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Expediente not found" });
    }

    return res.status(200).json({ message: "Expediente updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

expedienteController.deleteExpediente = async (req, res) => {
  try {
    const deleted = await expedienteModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Expediente not found" });
    }
    return res.status(200).json({ message: "Expediente deleted" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default expedienteController;
