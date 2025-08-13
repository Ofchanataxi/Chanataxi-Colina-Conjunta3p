import type { Investigador } from "../types/Investigador";

const API_URL = "http://localhost:3000/api/investigador";

export const getInvestigadores = async (): Promise<Investigador[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener investigadores");
  return res.json();
};

export const createInvestigador = async (data: Omit<Investigador, "id">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al crear investigador");
  return res.json();
};

export const updateInvestigador = async (id: number, data: Omit<Investigador, "id">) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar investigador");
  return res.json();
};

export const deleteInvestigador = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar investigador");
  return res.json();
};
