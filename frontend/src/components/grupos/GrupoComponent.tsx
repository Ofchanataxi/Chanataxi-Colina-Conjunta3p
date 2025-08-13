import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import GrupoDataTable from "./GrupoDataTable";
import GrupoForm from "./GrupoForm";
import type { Grupo } from "../../types/Grupo";
import type { Linea } from "../../types/Linea";
import type { Disponibilidad } from "../../types/Disponibilidad";
import {
  getGrupos,
  createGrupo,
  updateGrupo,
  deleteGrupo,
} from "../../services/servicesGrupo";
import { getLineas } from "../../services/servicesLinea";
import { getDisponibilidades } from "../../services/servicesDisponibilidad";

export default function GrupoComponent() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null);
  const toast = useRef<Toast>(null);

  const loadData = async () => {
    try {
      const [g, l, d] = await Promise.all([getGrupos(), getLineas(), getDisponibilidades()]);
      setGrupos(g);
      setLineas(l);
      setDisponibilidades(d);
    } catch {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Error cargando datos" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: Omit<Grupo, "id" | "fecha_creacion">, id?: number) => {
    try {
      if (id) {
        await updateGrupo(id, data);
        toast.current?.show({ severity: "success", summary: "Actualizado", detail: "Grupo actualizado" });
      } else {
        await createGrupo(data);
        toast.current?.show({ severity: "success", summary: "Creado", detail: "Grupo creado" });
      }
      setFormVisible(false);
      loadData();
    } catch {
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo guardar el grupo" });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este grupo?")) {
      try {
        await deleteGrupo(id);
        toast.current?.show({ severity: "success", summary: "Eliminado", detail: "Grupo eliminado" });
        loadData();
      } catch {
        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar el grupo" });
      }
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2>Gestión de Grupos</h2>
      <Button
        label="Nuevo Grupo"
        icon="pi pi-plus"
        onClick={() => {
          setSelectedGrupo(null);
          setFormVisible(true);
        }}
        className="mb-3"
      />
      <GrupoDataTable grupos={grupos} onEdit={(g) => { setSelectedGrupo(g); setFormVisible(true); }} onDelete={handleDelete} />
      <GrupoForm
        visible={formVisible}
        onHide={() => setFormVisible(false)}
        onSave={handleSave}
        grupo={selectedGrupo}
        lineasOptions={lineas.map(l => ({ label: l.nombre, value: l.id }))}
        disponibilidadesOptions={disponibilidades.map(d => ({ label: `${d.franja_horaria} - ${d.modalidad}`, value: d.id }))}
      />
    </div>
  );
}
