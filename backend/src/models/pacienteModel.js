import { Schema, model } from "mongoose";

const emergencyContactSchema = new Schema(
  {
    phone: { type: String },
    nameEmergencyContact: { type: String },
  },
  { _id: false },
);

const pacienteSchema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    birthDate: { type: Date },
    phone: { type: String },
    address: { type: String },
    bloodType: { type: String },
    phoneEmergencyContacts: [emergencyContactSchema],
    profilePhoto: { type: String },
    public_id: { type: String },
    isVerified: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    timeOut: { type: Date },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Pacientes", pacienteSchema);
