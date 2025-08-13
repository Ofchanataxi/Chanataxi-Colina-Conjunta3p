import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import LineaDataTable from "./LineaDataTable";
import LineaForm from "./LineaForm";
import type { Linea } from "../../types/Linea";
import { getLineas, createLinea, updateLinea, deleteLinea } from "../../services/servicesLinea";

export default function LineaComponent() {
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedLinea, setSelectedLinea] = useState<Linea | null>(null);
  const toast = useRef<Toast>(null);

  const loadData = async () => {
    try {
      const data = await getLineas();
      setLineas(data);
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar las líneas de investigación",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: Omit<Linea, "id">, id?: number) => {
    try {
      if (id) {
        await updateLinea(id, data);
        toast.current?.show({ severity: "success", summary: "Actualizado", detail: "Línea actualizada" });
      } else {
        await createLinea(data);
        toast.current?.show({ severity: "success", summary: "Creado", detail: "Línea creada" });
      }
      setFormVisible(false);
      loadData();
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo guardar la línea de investigación",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar esta línea de investigación?")) {
      try {
        await deleteLinea(id);
        toast.current?.show({ severity: "success", summary: "Eliminado", detail: "Línea eliminada" });
        loadData();
      } catch {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar la línea de investigación",
        });
      }
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2>Gestión de Líneas de Investigación</h2>
      <Button
        label="Nueva Línea"
        icon="pi pi-plus"
        onClick={() => {
          setSelectedLinea(null);
          setFormVisible(true);
        }}
        className="mb-3"
      />
      <LineaDataTable lineas={lineas} onEdit={(l) => { setSelectedLinea(l); setFormVisible(true); }} onDelete={handleDelete} />
      <LineaForm visible={formVisible} onHide={() => setFormVisible(false)} onSave={handleSave} linea={selectedLinea} />
    </div>
  );
}
