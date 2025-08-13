import Grupo from '../models/Grupo.js'; // Corregido mayúscula
import Asignacion from '../models/asignaciones.js';
import pool from '../config/db.js';

export async function getAllGrupos(req, res) {
  try {
    const grupos = await Grupo.getAll(); // Agregado 'const' que faltaba

    // Agregar miembros a cada grupo
    for (let grupo of grupos) {
      grupo.miembros = await Grupo.getMiembros(grupo.id);
    }

    res.json(grupos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function crear_asignacion(req, res) {
  try {
    const asignacion = await Asignacion.create(req.body); // Usar modelo Asignacion correcto
    res.status(201).json(asignacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMiembrosGrupo(req, res) {
  try {
    const miembros = await Grupo.getMiembros(req.params.id);
    res.json(miembros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function formarGruposAutomaticamente(req, res) {
  try {
    const { linea_id, disponibilidad_id } = req.body;
    
    // Verificar si es necesario crear grupo usando tu función
    const verificacion = await pool.query(
      'SELECT es_necesario_crear_grupo($1, $2) as necesario',
      [linea_id, disponibilidad_id]
    );

    if (verificacion.rows[0].necesario) {
      // Crear grupo usando tu función existente
      const resultado = await pool.query(
        'SELECT * FROM crear_grupo($1, $2, $3)', 
        [`Grupo Auto ${linea_id}-${disponibilidad_id}`, linea_id, disponibilidad_id]
      );
      
      res.json({
        message: 'Grupo formado automáticamente',
        grupo: resultado.rows[0]
      });
    } else {
      res.json({
        message: 'No se puede formar grupo: insuficientes investigadores o ya existe'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}