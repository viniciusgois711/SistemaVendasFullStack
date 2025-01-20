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

app.get("/clientes/:id", async(req, res) =>{

    const {id} = req.params;

    try{
        const resultado = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
        res.json(resultado.rows[0]);
    }catch(err){
        res.status(500).json({ error:err.message });
    }

})

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

});

app.delete("/clientes/:id", async (req, res) => {
    
    const {id} = req.params;
    
    try{
        await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
        res.status(200).send();
    }catch(err){
        res.status(500).json({error: err.message});
    }

});

app.get("/produtos", async (req, res) => {

    try{
        const resultado = await pool.query("SELECT * FROM produtos");
        res.status(200).json(resultado.rows); 
    }catch(err){
        res.status(500).json({erro: err.message})
    }
});

app.get("/produtos/:id", async (req, res) => {

    const {id} = req.params;

    try{
        const resultado = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);   
        res.status(200).json(resultado.rows[0]);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

app.post("/produtos", async (req, res) => {
    
    const {nome, preco, classificacao} = req.body;

    try{
        const resultado = await pool.query("INSERT INTO produtos (nome, preco, classificacao) VALUES ($1, $2, $3) RETURNING *", [nome, preco, classificacao]);
        res.status(201).json(resultado.rows[0]);

    }catch(err){
        res.status(500).json({error: err.message});
    }

})

app.put("/produtos/:id", async (req, res) => {

    const {id} = req.params;
    const {nome, preco, classificacao} = req.body;

    try{
        const resultado = await pool.query("UPDATE produtos SET nome = $1, preco = $2, classificacao = $3 WHERE id = $4 RETURNING *", [nome, preco, classificacao, id]);
        res.status(200).json(resultado.rows[0]);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

app.delete("/produtos/:id", async (req, res) => {
    
    const {id} = req.params;
    
    try{
        await pool.query("DELETE FROM produtos WHERE id = $1", [id]);
        res.status(200).send();
    }catch(err){
        json.status(500).json({error: err.message});
    }

});

app.get("/pedidos", async (req, res) => {
    
    try{
        const resultado = await pool.query("SELECT * FROM pedidos");
        res.json(resultado.rows);
    }catch(err){
        res.json({error: err.message});
    }

});


app.post("/pedidos", async(req, res) => {

    const {id_cliente, condicao_pagamento, observacao, itens} = req.body;

    // valor total sera a soma de todos os valores dos itens
    const valorTotal = 100;

    

    const resultado2 = []
    try{
        const resultado1 = await pool.query("INSERT INTO pedidos (id_cliente, condicao_pagamento, observacao, valor_total) VALUES ($1, $2, $3, $4) RETURNING *", [id_cliente, condicao_pagamento, observacao, valorTotal]);
        
        id_pedido = resultado1.rows[0].id
        for(let item of itens){
            query = await pool.query("INSERT INTO itens_pedido (id_produto, id_pedido, descricao) VALUES ($1, $2, $3)", [item.id_produto, id_pedido, item.descricao]);
            resultado2.push(query);
        }
        res.json(resultado1.rows[0]);
        res.json(resultado2.rows);
        
    }catch(err){
        res.status(500).json({error: err.message});
    }

});

// {
//     "id_cliente": 2,
//     "condicaoPagamento": "avista",
//     "observacao": "observacaoTeste",
//     "itens": [{
//       "id_produto": 1,
//       "id_pedido": 1,
//       "descricao": "itenTal"
//     }]
//   }

app.listen(3000)