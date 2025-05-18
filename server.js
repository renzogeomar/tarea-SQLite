//Modulos necesarios
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const app = express();
const PORT = 3000;
// Conexión a la base de datos 'imdb.db'
const db = new sqlite3.Database('./imdb.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a imdb.db');
  }
});
// muestra a index.html
app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error al cargar el HTML');
    res.send(data);
  });
});

// Buscar películas por nombre del actor
app.get('/peliculas', (req, res) => {
  const nombreActor = req.query.nombre;   

  if (!nombreActor) {
    return res.status(400).json({ error: 'Falta el parámetro "nombre"' });
  }
//Esta consulta SQL busca películas en las que haya participado un actor con un nombre similar al ingresado
  const query = `
    SELECT m.Title AS Titulo, m.Year AS Año, m.Score AS Puntuacion, m.Votes AS Votos
    FROM Actor a
    JOIN Casting c ON a.ActorId = c.ActorId
    JOIN Movie m ON c.MovieID = m.MovieID
    WHERE a.Name LIKE ?
    ORDER BY m.Year DESC
    LIMIT 50
  `;

});
