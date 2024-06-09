import { Router } from "express";
import {
  agregarGasto,
  crearGasto,
  editarGasto,
  eliminarGastos,
  obtenerGastos,
} from "../models/gastos.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const gastos = await obtenerGastos();
    res.json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const nuevoGasto = await crearGasto(payload);
    const gastos = await agregarGasto(nuevoGasto);
    res.status(201).json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { id } = req.query;
    const body = req.body;
    const payload = { id, ...body };
    const gastos = await editarGasto(payload);
    res.status(201).json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;
    const gastos = await eliminarGastos(id);
    res.status(201).json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export { router };
