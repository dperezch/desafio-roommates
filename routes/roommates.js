import { Router } from "express";
import {
  agregarRoommate,
  asignarDebeRecibe,
  obtenerRoommates,
} from "../models/roommates.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    await asignarDebeRecibe();
    const roommates = await obtenerRoommates();
    res.json(roommates);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const roommate = await agregarRoommate();
    res.status(201).json(roommate);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export { router };
