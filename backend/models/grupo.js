import pool from '../config/db.js';

class Grupo {
  constructor({ id, nombre, linea_nombre, franja_horaria, modalidad, fecha_creacion }) {
    this.id = id;
    this.nombre = nombre;
    this.linea_nombre = linea_nombre;
    this.franja_horaria = franja_horaria;
    this.modalidad = modalidad;
    this.fecha_creacion = fecha_creacion;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM get_todos_grupos()');
    return result.rows.map(row => new Grupo(row));
  }

  static async getMiembros(grupoId) {
    const result = await pool.query('SELECT * FROM get_miembros_grupo($1)', [grupoId]);
    return result.rows;
  }

  static async crearAsignacion(data) {
    const { investigador_id, linea_id, disponibilidad_id } = data;
    
    // Crear la asignación
    const result = await pool.query(
      'SELECT * FROM crear_asignacion($1, $2, $3)',
      [investigador_id, linea_id, disponibilidad_id]
    );

    // Verificar si es necesario crear grupo usando tu función existente
    const verificacion = await pool.query(
      'SELECT es_necesario_crear_grupo($1, $2) as necesario',
      [linea_id, disponibilidad_id]
    );

    // Si es necesario, crear el grupo automáticamente
    if (verificacion.rows[0].necesario) {
      await pool.query(
        'SELECT * FROM crear_grupo($1, $2, $3)',
        [`Grupo Auto - ${linea_id}-${disponibilidad_id}`, linea_id, disponibilidad_id]
      );
    }

    return result.rows[0];
  }
}

export default Grupo;