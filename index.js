const express = require('express')
const app = express()

app.use(express.json())


const tarefas = [
    {
        id: 1,
        nome: "Estudar",
        Descrição: "Estudar para a prova",
        status: "pendente"
    },
    {
        id: 2,
        nome: "Trabalhar",
        Descrição: "Trabalhar na empresa X",
        status: "em andamento"
    },
    {
        id: 3,
        nome: "Descansar",
        Descrição: "Descansar após um dia de trabalho",
        status: "concluída"
    }
]


// Listar todas as tarefas ou filtrar por nome
app.get("/tarefas", function (req, res) {
    const nome = req.query.nome

    if (!nome) {
        return res.json(tarefas)
    }

    const tarefasFiltradas = tarefas.filter(t => t.nome.toLowerCase().includes(nome.toLowerCase()))

    res.json(tarefasFiltradas)
})

//Encontrar a tarefa pelo id
app.get("/tarefas/:id", function (req, res) {
    const id = parseInt(req.params.id)

    const tarefa = tarefas.find(t => t.id == id)
    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" })
    }
    res.json(tarefa)
})


// Criar tarefas com Id Unico
app.post("/tarefas", function (req, res) {
    const tarefaParaAdicionar = req.body.nome
    const descricaoDaTarefa = req.body.Descrição
    const statusDaTarefa = req.body.status

    if (!tarefaParaAdicionar || !descricaoDaTarefa || !statusDaTarefa) {
        return res.status(400).json({ erro: "Nome, descrição e status são obrigatórios!" })
    }


    const novaTarefa = {
        id: tarefas.length + 1,
        nome: tarefaParaAdicionar,
        Descrição: descricaoDaTarefa,
        status: statusDaTarefa
    }
    tarefas.push(novaTarefa)

    res.status(201).send()
})


//encontrar a tarefa pelo id e atualizar o nome, descrição e status dela
app.get("/tarefas/:id", function (req, res) {
    const id = parseInt(req.params.id)

    const tarefa = tarefas.find(t => t.id == id)
    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" })
    }
    res.json(tarefa)
})



//Editar a tarefa pelo id, atualizando o nome, descrição e status dela
app.put("/tarefas/:id", function (req, res) {
    const id = parseInt(req.params.id)
    const { nome, Descrição, status } = req.body

    
    if (!nome || !Descrição || !status) {
        return res.status(400).json({ erro: "Nome, descrição e status são obrigatórios!" })
    }

    const indexDasTarefas = tarefas.findIndex(a => a.id == id)

    if (tarefas[indexDasTarefas].status === 'concluída') {
        return res.status(400).json({ erro: "Não é possível alterar o status de uma tarefa concluída para outro status!" })
    }

    if (indexDasTarefas === -1) {
        return res.status(404).json({ erro: "Tarefa não encontrada" })
    }

    tarefas[indexDasTarefas].status = status
    tarefas[indexDasTarefas].nome = nome
    tarefas[indexDasTarefas].Descrição = Descrição


    return res.json(tarefas[indexDasTarefas])
})



//Remover a tarefa pelo id
app.delete("/tarefas/:id", function (req, res) {
    const id = parseInt(req.params.id)
    const index = tarefas.findIndex(t => t.id == id)

    if (index === -1) {
        return res.status(404).json("Tarefa não encontrada")
    }

    const tarefaRemovida = tarefas.splice(index, 1)

    return res.status(204).json("Tarefa removida com sucesso!")
}
)






















app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000!")
})
