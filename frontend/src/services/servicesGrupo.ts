import type { Grupo } from "../types/Grupo";

const API_URL = "http://localhost:3000/api/grupo";

export const getGrupos = async (): Promise<Grupo[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener grupos");
  return res.json();
};

export const createGrupo = async (data: Omit<Grupo, "id" | "fecha_creacion">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear grupo");
  return res.json();
};

export const updateGrupo = async (id: number, data: Omit<Grupo, "id" | "fecha_creacion">) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar grupo");
  return res.json();
};

export const deleteGrupo = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar grupo");
  return res.json();
};
