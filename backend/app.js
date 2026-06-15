import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import pacienteRoutes from "./src/routes/paciente.js";
import registerPacienteRoutes from "./src/routes/registerPaciente.js";
import loginPacienteRoutes from "./src/routes/loginPaciente.js";
import logoutRoutes from "./src/routes/logout.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import especialidadRoutes from "./src/routes/especialidad.js";
import citaRoutes from "./src/routes/cita.js";
import expedienteRoutes from "./src/routes/expediente.js";
import equipoRoutes from "./src/routes/equipo.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],

    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/registerPaciente", registerPacienteRoutes);
app.use("/api/login", loginPacienteRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/expedientes", expedienteRoutes);
app.use("/api/equipos", equipoRoutes);

export default app;
