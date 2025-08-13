import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import type { Grupo } from "../../types/Grupo";

interface Props {
  visible: boolean;
  onHide: () => void;
  onSave: (data: Omit<Grupo, "id" | "fecha_creacion">, id?: number) => void;
  grupo?: Grupo | null;
  lineasOptions: { label: string; value: number }[];
  disponibilidadesOptions: { label: string; value: number }[];
}

export default function GrupoForm({
  visible,
  onHide,
  onSave,
  grupo,
  lineasOptions,
  disponibilidadesOptions,
}: Props) {
  const [formData, setFormData] = useState<Omit<Grupo, "id" | "fecha_creacion">>({
    nombre: "",
    linea_id: 0,
    disponibilidad_id: 0,
  });

  useEffect(() => {
    if (grupo) {
      const { id, fecha_creacion, ...rest } = grupo;
      setFormData(rest);
    } else {
      setFormData({ nombre: "", linea_id: 0, disponibilidad_id: 0 });
    }
  }, [grupo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e: { value: number }, field: "linea_id" | "disponibilidad_id") => {
    setFormData({ ...formData, [field]: e.value });
  };

  const handleSubmit = () => {
    if (formData.linea_id === 0 || formData.disponibilidad_id === 0 || !formData.nombre.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onSave(formData, grupo?.id);
  };

  return (
    <Dialog header={grupo ? "Editar Grupo" : "Nuevo Grupo"} visible={visible} style={{ width: "30rem" }} modal onHide={onHide}>
      <div className="p-fluid">
        <div className="field">
          <label>Nombre</label>
          <InputText name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Línea de Investigación</label>
          <Dropdown
            value={formData.linea_id}
            options={lineasOptions}
            onChange={(e) => handleDropdownChange(e, "linea_id")}
            placeholder="Seleccione línea"
          />
        </div>
        <div className="field">
          <label>Disponibilidad</label>
          <Dropdown
            value={formData.disponibilidad_id}
            options={disponibilidadesOptions}
            onChange={(e) => handleDropdownChange(e, "disponibilidad_id")}
            placeholder="Seleccione disponibilidad"
          />
        </div>
        <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
}
