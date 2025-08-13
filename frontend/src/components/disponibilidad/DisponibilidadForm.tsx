import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import type { Disponibilidad } from "../../types/Disponibilidad";

interface Props {
  visible: boolean;
  onHide: () => void;
  onSave: (data: Omit<Disponibilidad, "id">, id?: number) => void;
  disponibilidad?: Disponibilidad | null;
}

const modalidades = [
  { label: "Presencial", value: "presencial" },
  { label: "Virtual", value: "virtual" },
];

export default function DisponibilidadForm({ visible, onHide, onSave, disponibilidad }: Props) {
  const [formData, setFormData] = useState<Omit<Disponibilidad, "id">>({
    franja_horaria: "",
    modalidad: "presencial",
  });

  useEffect(() => {
    if (disponibilidad) {
      const { id, ...rest } = disponibilidad;
      setFormData(rest);
    } else {
      setFormData({ franja_horaria: "", modalidad: "presencial" });
    }
  }, [disponibilidad]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, franja_horaria: e.target.value });
  };

  const handleDropdownChange = (e: { value: "presencial" | "virtual" }) => {
    setFormData({ ...formData, modalidad: e.value });
  };

  const handleSubmit = () => {
    onSave(formData, disponibilidad?.id);
  };

  return (
    <Dialog
      header={disponibilidad ? "Editar Disponibilidad" : "Nueva Disponibilidad"}
      visible={visible}
      style={{ width: "30rem" }}
      modal
      onHide={onHide}
    >
      <div className="p-fluid">
        <div className="field">
          <label>Franja Horaria</label>
          <InputText value={formData.franja_horaria} onChange={handleInputChange} />
        </div>
        <div className="field">
          <label>Modalidad</label>
          <Dropdown
            value={formData.modalidad}
            options={modalidades}
            onChange={handleDropdownChange}
            placeholder="Seleccione modalidad"
          />
        </div>
        <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
}
