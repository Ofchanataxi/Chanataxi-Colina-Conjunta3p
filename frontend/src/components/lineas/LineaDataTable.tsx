import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Linea } from "../../types/Linea";

interface Props {
  lineas: Linea[];
  onEdit: (linea: Linea) => void;
  onDelete: (id: number) => void;
}

export default function LineaDataTable({ lineas, onEdit, onDelete }: Props) {
  const actionTemplate = (rowData: Linea) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-warning"
        onClick={() => onEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => onDelete(rowData.id)}
      />
    </div>
  );

  return (
    <DataTable value={lineas} paginator rows={5} responsiveLayout="scroll">
      <Column field="nombre" header="Nombre" sortable />
      <Column field="area" header="Área" sortable />
      <Column header="Acciones" body={actionTemplate} />
    </DataTable>
  );
}
