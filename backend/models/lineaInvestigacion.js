import pool from '../config/db.js';

class LineaInvestigacion {
  constructor({ id, nombre, area }) {
    this.id = id;
    this.nombre = nombre;
    this.area = area;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM get_todas_lineas_investigacion()');
    return result.rows.map(row => new LineaInvestigacion(row));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM linea_investigacion WHERE id = $1', [id]);
    if (result.rowCount === 0) return null;
    return new LineaInvestigacion(result.rows[0]);
  }

  static async create(data) {
    const { nombre, area } = data;
    
    const result = await pool.query(
      'SELECT * FROM crear_linea_investigacion($1, $2)',
      [nombre, area]
    );

    return new LineaInvestigacion(result.rows[0]);
  }
}

export default LineaInvestigacion;