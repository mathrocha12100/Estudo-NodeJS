const express = require("express");
const server = express();
server.use(express.json());

const projects = [{ id: 1, title: "App Padaria", tasks: ["Task1", "task2"] }];
let cont = 0;

server.use((req, res, next) => {
  next();
  cont++;
  console.log(`Já foram feitos ${cont} requisições`);
});

function checkProjectExists(req, res, next) {
  const { index } = req.params;
  if (!projects[index]) {
    return res.status(400).json({ error: "User not found! " });
  }
  return next();
}
function checkId(req, res, next) {
  const { id } = req.body;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      return res.status(400).json({ error: "the id already exists!" });
    }
  }
  return next();
}
function isNotEmpty(req, res, next) {
  if (projects.length == 0) {
    return res.status(400).json({ error: "Does not exist any project!" });
  }
  return next();
}

server.post("/projects", checkId, (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title });
  return res.json(projects);
});

server.get("/projects", isNotEmpty, (req, res) => {
  return res.json(projects);
});

server.get("/projects/:index", checkProjectExists, (req, res) => {
  const { index } = req.params;
  return res.json(projects[index]);
});

server.put("/projects/:index", checkProjectExists, (req, res) => {
  const { index } = req.params;
  const { newTitle } = req.body;
  projects[index].title = newTitle;
  return res.json(projects);
});

server.delete("/projects/:index", checkProjectExists, (req, res) => {
  const { index } = req.params;
  projects.splice(index, 1);
  return res.send();
});

server.post("/projects/:index/tasks", (req, res) => {
  const { index } = req.params;
  const { title } = req.body;
});

server.listen(3000);
