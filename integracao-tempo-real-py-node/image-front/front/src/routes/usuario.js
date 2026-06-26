const express = require("express");
const router = express.Router();

const usuarioModel = require("../model/usuarioModel");

router.get("/:email/:senha/logar", function (req, res) {
    usuarioModel.logar(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioModel.cadastrarUsuario(req, res);
})

module.exports = router