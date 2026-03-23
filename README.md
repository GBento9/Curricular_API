# API Tarefas - Node.Js + Express
API REST simples para gerenciar Tarefas
 
## Pré-requisitos
- Node.js instalado
 
##   Como rodar
 
### Instalar dependências
```bash
npm i
```
 
### Iniciar  servidor
```bash
node index.js
```
 
### Acessar
Abra o nevegador em: `http://localhost:3000`
 
### Endpoints

### Tarefas

| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| GET | `/tarefas` | Lista de tarefas |
| GET | `/tarefas/:id` | Buscar um tarefa especifico |
| POST | `/tarefas` | Cria um novo tarefa |
| PUT | `/tarefas/id` | Atualiza um tarefa |

### Teclogias
-Node.js
-Express

### Notas
- Os dados são armazenados em memória (reiniciar o servidor apaga tudo) 
