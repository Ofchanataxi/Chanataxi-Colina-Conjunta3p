import { useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import InvestigadorDataTable from "./InvestigadorDataTable";
import InvestigadorForm from "./InvestigadorForm";
import type { Investigador } from "../../types/Investigador";
import { getInvestigadores, createInvestigador, updateInvestigador, deleteInvestigador } from "../../services/servicesInvestigador";
import { useRef } from "react";

export default function InvestigadorComponent() {
  const [investigadores, setInvestigadores] = useState<Investigador[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedInvestigador, setSelectedInvestigador] = useState<Investigador | null>(null);
  const toast = useRef<Toast>(null);

  const loadData = async () => {
    try {
      const data = await getInvestigadores();
      setInvestigadores(data);
    } catch {
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudieron cargar los investigadores" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (data: Omit<Investigador, "id">, id?: number) => {
    try {
      if (id) {
        await updateInvestigador(id, data);
        toast.current?.show({ severity: "success", summary: "Actualizado", detail: "Investigador actualizado" });
      } else {
        await createInvestigador(data);
        toast.current?.show({ severity: "success", summary: "Creado", detail: "Investigador creado" });
      }
      setFormVisible(false);
      loadData();
    } catch {
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo guardar el investigador" });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este investigador?")) {
      try {
        await deleteInvestigador(id);
        toast.current?.show({ severity: "success", summary: "Eliminado", detail: "Investigador eliminado" });
        loadData();
      } catch {
        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar el investigador" });
      }
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2>Gestión de Investigadores</h2>
      <Button label="Nuevo Investigador" icon="pi pi-plus" onClick={() => { setSelectedInvestigador(null); setFormVisible(true); }} className="mb-3" />
      <InvestigadorDataTable investigadores={investigadores} onEdit={(i) => { setSelectedInvestigador(i); setFormVisible(true); }} onDelete={handleDelete} />
      <InvestigadorForm visible={formVisible} onHide={() => setFormVisible(false)} onSave={handleSave} investigador={selectedInvestigador} />
    </div>
  );
}
