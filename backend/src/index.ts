import express from "express";
import cors from "cors";
import matchRoutes from "./routes/matchRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // change if different port

app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", matchRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
