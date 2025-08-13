import type { Linea } from "../types/Linea";

const API_URL = "http://localhost:3000/api/lineas-investigacion";

export const getLineas = async (): Promise<Linea[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener líneas de investigación");
  return res.json();
};

export const createLinea = async (data: Omit<Linea, "id">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear línea de investigación");
  return res.json();
};

export const updateLinea = async (id: number, data: Omit<Linea, "id">) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar línea de investigación");
  return res.json();
};

export const deleteLinea = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar línea de investigación");
  return res.json();
};
