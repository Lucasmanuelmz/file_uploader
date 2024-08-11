const express = require('express');
const app = express();
const PORT = process.env.PORT_APP;
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use('src', express.static(path.join(__dirname, 'src')));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Deu certo');
})

app.listen(PORT, () => {
  console.log('Servidor iniciado')
})