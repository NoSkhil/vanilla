const http = require('http');
const fs = require('fs');
const path = require("path");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('./controllers/taskController');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000); // 30 days

  if (req.url === '/api/tasks' && req.method === 'GET') {
    getTasks(req, res);
  } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getTask(req, res, id);
  } else if (req.url === '/api/tasks' && req.method === 'POST') {
    createTask(req, res);
  } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateTask(req, res, id);
  } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteTask(req, res, id);
  } 
  
  else if (req.url === "/index") {
    let filepath = path.resolve('./index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(filepath).pipe(res);
  }
  else if (req.url === "/stylesheet") {
    let cssFilepath = path.resolve('./style.css');
    res.writeHead(200, {'Content-Type': 'text/css'});
    fs.createReadStream(cssFilepath).pipe(res);
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found!',
      })
    );
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
