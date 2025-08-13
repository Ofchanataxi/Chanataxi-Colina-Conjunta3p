import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Grupo } from "../../types/Grupo";

interface Props {
  grupos: Grupo[];
  onEdit: (grupo: Grupo) => void;
  onDelete: (id: number) => void;
}

export default function GrupoDataTable({ grupos, onEdit, onDelete }: Props) {
  const actionTemplate = (rowData: Grupo) => (
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
    <DataTable value={grupos} paginator rows={5} responsiveLayout="scroll">
      <Column field="nombre" header="Nombre" sortable />
      <Column field="linea_id" header="ID Línea" sortable />
      <Column field="disponibilidad_id" header="ID Disponibilidad" sortable />
      <Column field="fecha_creacion" header="Fecha Creación" sortable />
      <Column header="Acciones" body={actionTemplate} />
    </DataTable>
  );
}
