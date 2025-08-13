import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { Investigador } from "../../types/Investigador";

interface Props {
  visible: boolean;
  onHide: () => void;
  onSave: (data: Omit<Investigador, "id">, id?: number) => void;
  investigador?: Investigador | null;
}

export default function InvestigadorForm({ visible, onHide, onSave, investigador }: Props) {
  const [formData, setFormData] = useState<Omit<Investigador, "id">>({
    nombres: "",
    apellidos: "",
    departamento: "",
    experiencia: ""
  });

  useEffect(() => {
    if (investigador) {
      const { id, ...rest } = investigador;
      setFormData(rest);
    } else {
      setFormData({ nombres: "", apellidos: "", departamento: "", experiencia: "" });
    }
  }, [investigador]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData, investigador?.id);
  };

  return (
    <Dialog header={investigador ? "Editar Investigador" : "Nuevo Investigador"} visible={visible} style={{ width: "30rem" }} modal onHide={onHide}>
      <div className="p-fluid">
        <div className="field">
          <label>Nombres</label>
          <InputText name="nombres" value={formData.nombres} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Apellidos</label>
          <InputText name="apellidos" value={formData.apellidos} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Departamento</label>
          <InputText name="departamento" value={formData.departamento} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Experiencia</label>
          <InputText name="experiencia" value={formData.experiencia} onChange={handleChange} />
        </div>
        <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
}
