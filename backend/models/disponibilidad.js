import pool from '../config/db.js';

class Disponibilidad {
  constructor({ id, franja_horaria, modalidad }) {
    this.id = id;
    this.franja_horaria = franja_horaria;
    this.modalidad = modalidad;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM get_todas_disponibilidades()');
    return result.rows.map(row => new Disponibilidad(row));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM disponibilidad WHERE id = $1', [id]);
    if (result.rowCount === 0) return null;
    return new Disponibilidad(result.rows[0]);
  }

  static async create(data) {
    const { franja_horaria, modalidad } = data;
    
    const result = await pool.query(
      'SELECT * FROM crear_disponibilidad($1, $2)',
      [franja_horaria, modalidad]
    );

    return new Disponibilidad(result.rows[0]);
  }
}

export default Disponibilidad;