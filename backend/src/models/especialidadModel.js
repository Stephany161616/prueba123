import { Schema, model } from "mongoose";

const especialidadSchema = new Schema(
  {
    specialtyName: { type: String },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Especialidades", especialidadSchema);
