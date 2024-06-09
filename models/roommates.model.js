import axios from "axios";
import fs from "node:fs";
import path from "node:path";
import { obtenerGastoComun, obtenerRecibe } from "./gastos.model.js";

const obtenerRoommates = () => {
  try {
    const roommates = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/roommates.json"),
        "utf-8"
      )
    );
    return roommates;
  } catch ({ code, message }) {
    console.log(`Error en obtenerRoommates: ${code}, ${message}`);
  }
};

const crearRoommate = async () => {
  try {
    const url = "https://randomuser.me/api";
    const { data } = await axios.get(url);
    const nombre = `${data.results[0].name.first} ${data.results[0].name.last}`;
    const newRoommate = {
      nombre,
      debe: 0,
      recibe: 0,
    };
    return newRoommate;
  } catch ({ code, message }) {
    console.log(`Error en crearRoommate: ${code}, ${message}`);
  }
};

const agregarRoommate = async () => {
  try {
    const newRoommate = await crearRoommate();
    const roommates = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/roommates.json"),
        "utf-8"
      )
    );
    roommates.roommates.push(newRoommate);
    fs.writeFileSync(
      path.join(import.meta.dirname, "../data/roommates.json"),
      JSON.stringify(roommates)
    );
    return roommates;
  } catch ({ code, message }) {
    console.log(`Error en agregarRoommate: ${code}, ${message}`);
  }
};

const asignarDebeRecibe = async () => {
  try {
    const gastoComun = await obtenerGastoComun(); //debe
    const registroRecibe = await obtenerRecibe();
    const roommates = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/roommates.json"),
        "utf-8"
      )
    );
    for (const roommate of roommates.roommates) {
      if (roommate.nombre in registroRecibe) {
        roommate.debe = gastoComun - registroRecibe[roommate.nombre];
        roommate.recibe = registroRecibe[roommate.nombre];
      } else {
        roommate.debe = gastoComun;
        roommate.recibe = 0;
      }
    }
    fs.writeFileSync(
      path.join(import.meta.dirname, "../data/roommates.json"),
      JSON.stringify(roommates)
    );
  } catch ({ code, message }) {
    console.log(`Error en asignarDebeRecibe: ${code}, ${message}`);
  }
};

export { obtenerRoommates, agregarRoommate, asignarDebeRecibe };
