import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { Linea } from "../../types/Linea";

interface Props {
  visible: boolean;
  onHide: () => void;
  onSave: (data: Omit<Linea, "id">, id?: number) => void;
  linea?: Linea | null;
}

export default function LineaForm({ visible, onHide, onSave, linea }: Props) {
  const [formData, setFormData] = useState<Omit<Linea, "id">>({
    nombre: "",
    area: "",
  });

  useEffect(() => {
    if (linea) {
      const { id, ...rest } = linea;
      setFormData(rest);
    } else {
      setFormData({ nombre: "", area: "" });
    }
  }, [linea]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData, linea?.id);
  };

  return (
    <Dialog
      header={linea ? "Editar Línea de Investigación" : "Nueva Línea de Investigación"}
      visible={visible}
      style={{ width: "30rem" }}
      modal
      onHide={onHide}
    >
      <div className="p-fluid">
        <div className="field">
          <label>Nombre</label>
          <InputText name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Área</label>
          <InputText name="area" value={formData.area} onChange={handleChange} />
        </div>
        <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
}
