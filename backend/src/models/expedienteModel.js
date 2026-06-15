import { Schema, model } from "mongoose";

const medicationSchema = new Schema(
  {
    medicineName: { type: String },
  },
  { _id: false },
);

const expedienteSchema = new Schema(
  {
    patient_id: { type: Schema.Types.ObjectId, ref: "Pacientes" },
    diagnosis: { type: String },
    medications: [medicationSchema],
    medicalNotes: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Expedientes", expedienteSchema);
