import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Disponibilidad } from "../../types/Disponibilidad";

interface Props {
  disponibilidades: Disponibilidad[];
  onEdit: (disp: Disponibilidad) => void;
  onDelete: (id: number) => void;
}

export default function DisponibilidadDataTable({ disponibilidades, onEdit, onDelete }: Props) {
  const actionTemplate = (rowData: Disponibilidad) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => onEdit(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData.id)} />
    </div>
  );

  return (
    <DataTable value={disponibilidades} paginator rows={5} responsiveLayout="scroll">
      <Column field="franja_horaria" header="Franja Horaria" sortable />
      <Column field="modalidad" header="Modalidad" sortable />
      <Column header="Acciones" body={actionTemplate} />
    </DataTable>
  );
}
