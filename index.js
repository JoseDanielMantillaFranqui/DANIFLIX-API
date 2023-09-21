const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

// Agrega la lógica para guardar los datos en tu base de datos JSON (db.json)
server.post("/db", (req, res) => {
  const data = req.body;
  
  // Leer los datos actuales de db.json
  const currentData = router.db.getState();
  
  // Suponemos que la propiedad "Categoria" del objeto "data" contiene el nombre del objeto a agregar
  const customObjectName = data.Categoria;
  
  // Suponemos que la propiedad "Categoria" del objeto "data" contiene los datos a agregar
  const customObjectData = data.Categoria; // Utiliza data.Categoria para obtener los datos
  
  // Agregar los nuevos datos al objeto con el nombre especificado en el cuerpo de la solicitud POST
  if (!currentData[customObjectName]) {
    currentData[customObjectName] = [];
  }
  
  currentData[customObjectName].push(customObjectData);
  
  // Escribir los datos actualizados de vuelta en db.json
  router.db.setState(currentData).write();
  
  res.status(201).json(customObjectData);
});

server.use(middlewares);
server.use(router);
server.listen(port);
