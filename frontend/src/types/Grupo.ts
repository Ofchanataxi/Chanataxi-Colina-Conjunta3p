export interface Grupo {
  id: number;
  nombre: string;
  linea_id: number;
  disponibilidad_id: number;
  fecha_creacion?: string; // ISO date string, opcional porque se asigna al crear
}
