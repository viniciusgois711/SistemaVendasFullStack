const { Pool } = require('pg');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "treinamentoUf"
})

pool.connect().then(() => console.log("conectado"))

app.get("/clientes", async (req, res) => {
    
    try{
        const resultado = await pool.query("SELECT * FROM clientes");
        let clientes = {
            hasNext: false,
            items: resultado.rows
        }
        res.json(clientes);
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
        let produtos = {
            hasNext: false,
            items: resultado.rows
        }
        res.status(200).json(produtos); 

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
        const resultado = await pool.query("SELECT p.*,c.nome nome_cliente FROM pedidos p inner join clientes c on p.id_cliente = c.id ");
        let pedidos = {
            hasNext: false,
            items: resultado.rows
        } 
        res.json(pedidos);
    }catch(err){
        res.json({error: err.message});
    }

});


// id é o id do pedido, pega todos os itens daquele pedido
app.get("/pedidos/:id", async (req, res) => {

    const {id} = req.params;

    try{
        const resultado = await pool.query("SELECT * FROM itens_pedido WHERE id_pedido = $1", [id]);
        res.json(resultado.rows);
    }catch(err){
        res.status(500).json({error: err.message});
    }

})


app.post("/pedidos", async(req, res) => {

    const {id_cliente, condicao_pagamento, observacao, itens} = req.body;

    let valor;
    let valorTotal = 0;

    for(let item of itens){
        valor = item.preco_unitario*item.quantidade;
        valorTotal += valor;   
    }

    const resultado2 = []
    try{
        const resultado1 = await pool.query("INSERT INTO pedidos (id_cliente, condicao_pagamento, observacao, valor_total) VALUES ($1, $2, $3, $4) RETURNING *", [id_cliente, condicao_pagamento, observacao, valorTotal]);
        
        id_pedido = resultado1.rows[0].id
        for(let item of itens){

            valor_total_item = item.preco_unitario*item.quantidade;
            query = await pool.query("INSERT INTO itens_pedido (id_produto, id_pedido, descricao, quantidade, preco_unitario, valor_total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [item.id_produto, id_pedido, item.descricao, item.quantidade, item.preco_unitario, valor_total_item]);
            resultado2.push(query.rows[0]);
        }
        res.json({postPedido: resultado1.rows[0], postItens: resultado2});

    }catch(err){
        res.status(500).json({error: err.message});
    }

});

app.put("/pedidos/:id", async (req, res) => {

    const {id} = req.params;
    const {id_cliente, condicao_pagamento, observacao, itens} = req.body;

    let valorTotal = 0;


    for(item of itens){
        valor = item.quantidade*item.preco_unitario;
        valorTotal += valor;
    }

    try{
        const resultado = await pool.query("UPDATE pedidos SET id_cliente = $1, condicao_pagamento = $2, observacao = $3, valor_total = $4 WHERE id = $5 RETURNING *", [id_cliente, condicao_pagamento, observacao, valorTotal, id]);
        
        // deleta itens do pedido que foi alterado, para ser adicionado posteriormente 
        await pool.query("DELETE FROM itens_pedido WHERE id_pedido = $1", [id]);

        let resultado2 = [];
        for(item of itens){
            valor_total_item = item.quantidade*item.preco_unitario;
            let query = await pool.query("INSERT INTO itens_pedido (id_produto, id_pedido, descricao, quantidade, preco_unitario, valor_total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [item.id_produto, id, item.descricao, item.quantidade, item.preco_unitario, valor_total_item]);
            resultado2.push(query.rows[0]);
        
        }
        res.json({putPedido: resultado.rows[0], putItem: resultado2});
    }catch(err){
        res.status(500).json({error: err.message});
    }

});

app.delete("/pedidos/:id", async (req, res) => {

    const {id} = req.params;

    try{
        await pool.query("DELETE FROM pedidos WHERE id = $1", [id]);
        res.status(200).send();

    }catch(err){
        res.status(500).json({error: err.message});
    }

})

app.listen(3000)