import express from "express";
import fs from "fs";

const app =  express();
app.use(express.json());

const arqProduto = "./src/produtos.json";
const produtos = JSON.parse(fs.readFileSync(arqProduto));

app.get("/", (req, res) => {
    res.status(200).send("API Biblioteca em Node.js");
});

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

app.post("/produtos", (req, res) => {
    produtos.push(req.body);
    fs.writeFileSync(arqProduto, JSON.stringify(produtos));
    res.status(201).send("Produto cadastrado com sucesso");
})

function buscaProduto(id) {
    return produtos.findIndex(produto => {
        return produto.id == id;
    })
}

app.get("/produtos/:id", (req, res) => {
    const index = buscaProduto(req.params.id);
    if (index == -1) {
        res.status(404).send("Produto nao encontrado");
    } else {
        res.status(200).json(produtos[index]);
    }    
})

app.put("/produtos/:id", (req, res) => {
    const index = buscaProduto(req.params.id);
    if (index == -1) {
        res.status(404).send("Produto nao encontrado");
    } else {
        produtos[index].nome = req.body.titulo;
        fs.writeFileSync(arqProduto, JSON.stringify(produtos));
        res.status(200).json(produtos);
    }    
})

app.delete('/produtos/:id', (req, res) => {
    const index = buscaProduto(req.params.id);
    if (index == -1) {
        res.status(404).send("Produto nao encontrado");
    } else {
        produtos.splice(index, 1);
        fs.writeFileSync(arqProduto, JSON.stringify(produtos));
        res.status(204).send('Produto removido com sucesso.');
    }
});

export default app;
