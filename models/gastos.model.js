import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import path from "node:path";

const obtenerGastos = () => {
  try {
    const gastos = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/gastos.json"),
        "utf-8"
      )
    );
    return gastos;
  } catch ({ code, message }) {
    console.log(`Error en obtenerGastos: ${code}, ${message}`);
  }
};

const crearGasto = async (payload) => {
  try {
    const id = uuidv4().slice(0, 8);
    const nuevoGasto = {
      id,
      ...payload,
    };
    return nuevoGasto;
  } catch ({ code, message }) {
    console.log(`Error en crearGasto: ${code}, ${message}`);
  }
};
const agregarGasto = async (nuevoGasto) => {
  try {
    const gastos = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/gastos.json"),
        "utf-8"
      )
    );
    await gastos.gastos.push(nuevoGasto);
    fs.writeFileSync(
      path.join(import.meta.dirname, "../data/gastos.json"),
      JSON.stringify(gastos)
    );
    return gastos;
  } catch ({ code, message }) {
    console.log(`Error en agregarGasto: ${code}, ${message}`);
  }
};

const obtenerGastoComun = async () => {
  try {
    let gastoTotal = 0;
    const roommates = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/roommates.json"),
        "utf-8"
      )
    );
    const gastos = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/gastos.json"),
        "utf-8"
      )
    );
    for (const gasto of gastos.gastos) {
      gastoTotal += gasto.monto;
    }
    let cantidadDeRoommates = roommates.roommates.length;
    const gastoComun = gastoTotal / cantidadDeRoommates;
    return gastoComun;
  } catch ({ code, message }) {
    console.log(`Error en obtenerGastoComun: ${code}, ${message}`);
  }
};

const obtenerRecibe = async () => {
  try {
    const gastos = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/gastos.json"),
        "utf-8"
      )
    );
    const roommates = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/roommates.json"),
        "utf-8"
      )
    );
    let cantidadDeRoommates = roommates.roommates.length;
    let registro = {};
    for (const gasto of gastos.gastos) {
      if (registro[gasto.roommate]) {
        registro[gasto.roommate] += gasto.monto / cantidadDeRoommates;
      } else {
        registro[gasto.roommate] = gasto.monto / cantidadDeRoommates;
      }
    }
    return registro;
  } catch ({ code, message }) {
    console.log(`Error en obtenerRecibe: ${code}, ${message}`);
  }
};

const editarGasto = async (payload) => {
  try {
    const gastos = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/gastos.json"),
        "utf-8"
      )
    );
    const gastosEditado = gastos.gastos.map((gasto) => {
      if (gasto.id === payload.id) {
        gasto = payload;
        return gasto;
      } else {
        return gasto;
      }
    });
    console.log(gastosEditado);

    fs.writeFileSync(
      path.join(import.meta.dirname, "../data/gastos.json"),
      JSON.stringify({ gastos: gastosEditado })
    );
    return gastosEditado;
  } catch ({ code, message }) {
    console.log(`Error en editarGasto: ${code}, ${message}`);
  }
};

const eliminarGastos = async (id) => {
  try {
    const gastos = JSON.parse(
      fs.readFileSync(
        path.join(import.meta.dirname, "../data/gastos.json"),
        "utf-8"
      )
    );
    const gastosEditado = gastos.gastos.filter((gasto) => {
      if (gasto.id !== id) {
        return gasto;
      }
    });
    fs.writeFileSync(
      path.join(import.meta.dirname, "../data/gastos.json"),
      JSON.stringify({ gastos: gastosEditado })
    );
  } catch ({ code, message }) {
    console.log(`Error en eliminarGastos: ${code}, ${message}`);
  }
};

export {
  obtenerGastos,
  crearGasto,
  agregarGasto,
  obtenerGastoComun,
  obtenerRecibe,
  editarGasto,
  eliminarGastos,
};
