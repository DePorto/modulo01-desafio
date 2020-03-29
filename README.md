RocketSeat - GoStack - Bootcamp - Módulo 01 - Desafio

# >>CRUD
- POST /projects : id e title, no body, cadastrar num array no formato {"id":"1", 
"title": "Novo projeto", "tasks":[]}

- GET /projects : lista todos os projetos e suas tarefas

- PUT /projects/:id : deve alterar apenas o título do projeto com o id no param da
rota

- DELETE /projects/:id : deve remover o projeto com o id no param da rota

- POST /projects/:id/tasks : rota deve receber o campo title e armazenar uma nova 
tarefa no array de tarefas de um projeto específico conforme o id no param da 
rota

# >> Exemplo
Se eu chamar a rota POST /projects repassando { id: 1, title: 'Novo projeto' } 
e a rota POST /projects/1/tasks com { title: 'Nova tarefa' }, meu array de 
projetos deve ficar assim:

[
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];

# >> MIDDLEWARES
- Criar um middleware que será utilizado em todas as rotas que recebem o ID do 
projeto nos param da URL que verifica se aquele ID existe. Se não existir, 
retorne um erro, senão continuar a req normalmente;

- Criar um middleware global chamado em todas as requisições que imprima via 
console.log uma contagem de quantas requisições foram feitas até então pela app
