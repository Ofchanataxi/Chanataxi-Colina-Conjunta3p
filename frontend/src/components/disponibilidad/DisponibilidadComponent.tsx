import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import DisponibilidadDataTable from "./DisponibilidadDataTable";
import DisponibilidadForm from "./DisponibilidadForm";
import type { Disponibilidad } from "../../types/Disponibilidad";
import {
  getDisponibilidades,
  createDisponibilidad,
  updateDisponibilidad,
  deleteDisponibilidad,
} from "../../services/servicesDisponibilidad";

export default function DisponibilidadComponent() {
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedDisponibilidad, setSelectedDisponibilidad] = useState<Disponibilidad | null>(null);
  const toast = useRef<Toast>(null);

  const loadData = async () => {
    try {
      const data = await getDisponibilidades();
      setDisponibilidades(data);
    } catch {
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudieron cargar disponibilidades" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: Omit<Disponibilidad, "id">, id?: number) => {
    try {
      if (id) {
        await updateDisponibilidad(id, data);
        toast.current?.show({ severity: "success", summary: "Actualizado", detail: "Disponibilidad actualizada" });
      } else {
        await createDisponibilidad(data);
        toast.current?.show({ severity: "success", summary: "Creado", detail: "Disponibilidad creada" });
      }
      setFormVisible(false);
      loadData();
    } catch {
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo guardar la disponibilidad" });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar esta disponibilidad?")) {
      try {
        await deleteDisponibilidad(id);
        toast.current?.show({ severity: "success", summary: "Eliminado", detail: "Disponibilidad eliminada" });
        loadData();
      } catch {
        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar la disponibilidad" });
      }
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2>Gestión de Disponibilidades</h2>
      <Button
        label="Nueva Disponibilidad"
        icon="pi pi-plus"
        onClick={() => {
          setSelectedDisponibilidad(null);
          setFormVisible(true);
        }}
        className="mb-3"
      />
      <DisponibilidadDataTable
        disponibilidades={disponibilidades}
        onEdit={(d) => {
          setSelectedDisponibilidad(d);
          setFormVisible(true);
        }}
        onDelete={handleDelete}
      />
      <DisponibilidadForm visible={formVisible} onHide={() => setFormVisible(false)} onSave={handleSave} disponibilidad={selectedDisponibilidad} />
    </div>
  );
}
