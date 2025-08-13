import LineaInvestigacion from '../models/lineaInvestigacion.js'; // Corregido mayúscula

export async function getAllLineasInvestigacion(req, res) {
  try {
    const lineas = await LineaInvestigacion.getAll();
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getLineaInvestigacionById(req, res) {
  try {
    const linea = await LineaInvestigacion.getById(req.params.id);
    if (!linea) return res.status(404).json({ message: 'Línea de investigación no encontrada' });
    res.json(linea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createLineaInvestigacion(req, res) {
  try {
    const nuevaLinea = await LineaInvestigacion.create(req.body);
    res.status(201).json(nuevaLinea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}