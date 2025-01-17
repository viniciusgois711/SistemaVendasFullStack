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
    console.log(req)
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

app.put("/clientes/:id", async (req, res) =>{

    const {id} = req.params;
    const  {nome, cnpj} = req.body;

    try{
        const resultado = await pool.query("UPDATE clientes SET nome = $1, cnpj = $2 WHERE id = $3 RETURNING *", [nome,cnpj, id]);
        res.status(200).json(resultado.rows[0]);
    }catch(err){
        res.status(500).json({error: err.message});
    }

    console.log(req)

});


app.listen(3000)