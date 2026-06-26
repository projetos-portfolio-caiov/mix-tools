var caminho_env = '.env';

require("dotenv").config({ path: caminho_env });

const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")))
app.use(cors());

const armazenamento = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: armazenamento });

const usuarioRouter = require("./src/routes/usuario");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/usuario", usuarioRouter);

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('Nenhum arquivo enviado.');
    res.send('Imagem recebida com sucesso!');
});

app.listen(port, function () {
    console.log(`Inicializado em: http://${host}:${port}`);
});