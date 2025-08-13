import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Investigador } from "../../types/Investigador";

interface Props {
  investigadores: Investigador[];
  onEdit: (investigador: Investigador) => void;
  onDelete: (id: number) => void;
}

export default function InvestigadorDataTable({ investigadores, onEdit, onDelete }: Props) {
  const actionTemplate = (rowData: Investigador) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => onEdit(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData.id)} />
    </div>
  );

  return (
    <DataTable value={investigadores} paginator rows={5} responsiveLayout="scroll">
      <Column field="nombres" header="Nombres" sortable />
      <Column field="apellidos" header="Apellidos" sortable />
      <Column field="departamento" header="Departamento" sortable />
      <Column field="experiencia" header="Experiencia" sortable />
      <Column header="Acciones" body={actionTemplate} />
    </DataTable>
  );
}
