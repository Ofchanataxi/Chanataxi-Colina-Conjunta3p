import pool from '../config/db.js';

class Asignacion {
  constructor({ investigador_id, linea_id, disponibilidad_id }) {
    this.investigador_id = investigador_id;
    this.linea_id = linea_id;
    this.disponibilidad_id = disponibilidad_id;
  }

  static async create(data) {
    const { investigador_id, linea_id, disponibilidad_id } = data;
    
    const result = await pool.query(
      'SELECT * FROM crear_asignacion($1, $2, $3)',
      [investigador_id, linea_id, disponibilidad_id]
    );

    return new Asignacion(result.rows[0]);
  }
}

export default Asignacion;