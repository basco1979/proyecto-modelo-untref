const express = require("express");
require("dotenv").config();

const {
    findAll,
    findOneById,
    create,
    update,
    destroy
} = require("./database/frutas.manager.js");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/frutas", (req, res) => {
    findAll()
        .then((frutas) => res.status(200).send(frutas))
        .catch((error) => res.status(400).send(error.message));
});

server.get("/frutas/:id", (req, res) => {
    const { id } = req.params;
    findOneById(Number(id))
        .then((elemento) => res.status(200).send(elemento))
        .catch((error) => res.status(400).send(error.message));
});

server.post("/frutas", (req, res) => {
    const { tipo, precio, stock } = req.body;
    create({ tipo, precio, stock })
        .then((fruta) => res.status(201).send(fruta))
        .catch((error) => res.status(400).send(error.message));
});

server.put("/frutas/:id", (req, res) => {
    const { id } = req.params;
    const { tipo, precio, stock } = req.body;
    update({ id: Number(id), tipo, precio, stock })
        .then((fruta) => res.status(200).send(fruta))
        .catch((error) => res.status(400).send(error.message));
});

server.delete("/frutas/:id", (req, res) => {
    const { id } = req.params;
    destroy(Number(id))
        .then((fruta) => res.status(200).send(fruta))
        .catch((error) => res.status(400).send(error.message));
});

server.get('*', (req, res) => {
    res.status(404).send("Lo siento, la pagina que buscas no existe");
});

server.listen(process.env.PORT, process.env.HOST, () => console.log(
    `Ejecutandose en http://${process.env.HOST}:${process.env.PORT}`
));
