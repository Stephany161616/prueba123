import { Schema, model } from "mongoose";

const citaSchema = new Schema(
  {
    patient_id: { type: Schema.Types.ObjectId, ref: "Pacientes" },
    specialty_id: { type: Schema.Types.ObjectId, ref: "Especialidades" },
    appointmentDate: { type: Date },
    reason: { type: String },
    status: { type: String },
    observations: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Citas", citaSchema);
