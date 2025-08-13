import type { Disponibilidad } from "../types/Disponibilidad";

const API_URL = "http://localhost:3000/api/disponibilidades";

export const getDisponibilidades = async (): Promise<Disponibilidad[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener disponibilidades");
  return res.json();
};

export const createDisponibilidad = async (data: Omit<Disponibilidad, "id">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear disponibilidad");
  return res.json();
};

export const updateDisponibilidad = async (id: number, data: Omit<Disponibilidad, "id">) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar disponibilidad");
  return res.json();
};

export const deleteDisponibilidad = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar disponibilidad");
  return res.json();
};
