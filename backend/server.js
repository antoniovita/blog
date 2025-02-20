const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/posts' , postRoutes);
app.use('/user' , userRoutes);

const PORT = process.env.PORT;

sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
}).catch((error) => {
    console.error('Erro ao conectar com o banco de dados', error);
});

app.listen( PORT , () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});

