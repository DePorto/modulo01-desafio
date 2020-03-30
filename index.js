const express = require ("express");

const server = express();

server.use(express.json());

let contRequisicoes = 0;

const projects = [];

//middleware global para contagem de requisições feitas (acumulado)
server.use((req, res, next) => {
  contRequisicoes++;
  console.log(`Acumulado de requisições: ${contRequisicoes}`);

  next();
});

//middleware para verificação de existência de ID
function checkIdProject(req, res, next){  
  const { id } = req.params; //pega o campo ID do objeto

  //retorna o índice do objeto dentro do array
  req.index = projects.findIndex( element => element.id === id) 
  
  if (req.index < 0){ //há um objeto no array com o ID enviado se maior que zero
    return res.status(400).json({"error": "Project id doesnt exist!"});
  }

  req.project = projects[req.index];

  return next();
}

//CRUD

//busca todos os projetos cadastrados
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//busca um projeto conforme ID via parâmetro da URL
server.get('/projects/:id', checkIdProject, (req, res) => {
  return res.json(req.project);
});

//adiciona um novo projeto com id, title e tasks[]
server.post('/projects', (req, res) => {
  
  projects.push(req.body);

  return res.json({"message":"Projeto adicionado:"});  
});

//edita o TITLE de um projeto, no corpo da req, com o ID nos params da rota
server.put('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title){
    return res.json({"error": "Title required!"});
  }

  req.project.title = title;

  return res.json({"message": `Novo título do projeto de ID = ${id} : ${req.project.title}`});
});

//remove um projeto conforme id
server.delete('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { index } = req.params;

  projects.splice(index, 1);

  return res.json({"message": `Projeto ID = ${id} removido!`});
})

//adiciona uma task à lista de tasks de um projeto
server.post('/projects/:id/tasks', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  req.project.tasks.push(title);

  return res.json({"message": `Task ${title} adicionada ao Projeto ID = ${id}`});
});

server.listen(4444);