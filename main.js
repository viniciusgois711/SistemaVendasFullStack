const { Pool } = require('pg');

const express = require('express')

const app = express()

app.use(express.json())

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    port: 5432,
    password: "0009",
    database: "treinamentoUf"
})

pool.connect().then(() => console.log("conectado"))

app.get("/clientes", async (req, res) => {
    
    try{
        const resultado = await pool.query("SELECT * FROM clientes");
        res.json(resultado.rows);
    
    }catch(err){
        res.status(500).json({ error: err.message })
    }
});

app.post("/clientes", async (req, res) => {

    const {nome, cnpj} = req.body;

    try{
        const resultado = await pool.query("INSERT INTO clientes (nome, cnpj) VALUES ($1, $2) RETURNING *", [nome,cnpj]);
        res.status(201).json(resultado.rows[0]);
    }catch{
        res.status(500).json({ error: err.message })
    }

});


app.listen(3000)