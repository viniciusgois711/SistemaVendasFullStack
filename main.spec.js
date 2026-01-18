const request = require('supertest');
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

// Mock the Pool module
jest.mock('pg', () => {
  return {
    Pool: jest.fn(() => ({
      connect: jest.fn(),
      query: jest.fn(),
    })),
  };
});

// Import the app setup dynamically to avoid pool connection issues
let app;
let mockPool;

beforeAll(() => {
  mockPool = new Pool();
  mockPool.connect.mockResolvedValue(undefined);
});

beforeEach(() => {
  jest.clearAllMocks();
  mockPool.query.mockClear();
});

describe('Clientes Endpoints', () => {
  describe('GET /clientes', () => {
    it('should return all clients successfully', async () => {
      const mockClientes = [
        { id: 1, nome: 'Cliente 1', cnpj: '12345678000100' },
        { id: 2, nome: 'Cliente 2', cnpj: '12345678000200' },
      ];
      mockPool.query.mockResolvedValueOnce({ rows: mockClientes });

      const app = require('./main.js');
      const res = await request(app).get('/clientes');

      expect(res.status).toBe(200);
      expect(res.body.hasNext).toBe(false);
      expect(res.body.items).toEqual(mockClientes);
    });

    it('should handle database errors when fetching clients', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Database error'));

      const app = require('./main.js');
      const res = await request(app).get('/clientes');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Database error');
    });
  });

  describe('GET /clientes/:id', () => {
    it('should return a specific client by id', async () => {
      const mockCliente = { id: 1, nome: 'Cliente 1', cnpj: '12345678000100' };
      mockPool.query.mockResolvedValueOnce({ rows: [mockCliente] });

      const app = require('./main.js');
      const res = await request(app).get('/clientes/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockCliente);
    });

    it('should handle database errors when fetching specific client', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Client not found'));

      const app = require('./main.js');
      const res = await request(app).get('/clientes/999');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Client not found');
    });
  });

  describe('POST /clientes', () => {
    it('should create a new client', async () => {
      const newCliente = { id: 3, nome: 'Novo Cliente', cnpj: '12345678000300' };
      mockPool.query.mockResolvedValueOnce({ rows: [newCliente] });

      const app = require('./main.js');
      const res = await request(app)
        .post('/clientes')
        .send({ nome: 'Novo Cliente', cnpj: '12345678000300' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(newCliente);
    });

    it('should handle database errors when creating client', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Insert error'));

      const app = require('./main.js');
      const res = await request(app)
        .post('/clientes')
        .send({ nome: 'Novo Cliente', cnpj: '12345678000300' });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Insert error');
    });
  });

  describe('PUT /clientes/:id', () => {
    it('should update a client', async () => {
      const updatedCliente = { id: 1, nome: 'Cliente Atualizado', cnpj: '12345678000100' };
      mockPool.query.mockResolvedValueOnce({ rows: [updatedCliente] });

      const app = require('./main.js');
      const res = await request(app)
        .put('/clientes/1')
        .send({ nome: 'Cliente Atualizado', cnpj: '12345678000100' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedCliente);
    });

    it('should handle database errors when updating client', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Update error'));

      const app = require('./main.js');
      const res = await request(app)
        .put('/clientes/1')
        .send({ nome: 'Cliente Atualizado', cnpj: '12345678000100' });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Update error');
    });
  });

  describe('DELETE /clientes/:id', () => {
    it('should delete a client', async () => {
      mockPool.query.mockResolvedValueOnce({});

      const app = require('./main.js');
      const res = await request(app).delete('/clientes/1');

      expect(res.status).toBe(200);
    });

    it('should handle database errors when deleting client', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Delete error'));

      const app = require('./main.js');
      const res = await request(app).delete('/clientes/1');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Delete error');
    });
  });
});

describe('Produtos Endpoints', () => {
  describe('GET /produtos', () => {
    it('should return all products successfully', async () => {
      const mockProdutos = [
        { id: 1, nome: 'Produto 1', preco: 100.00, classificacao: 'A' },
        { id: 2, nome: 'Produto 2', preco: 200.00, classificacao: 'B' },
      ];
      mockPool.query.mockResolvedValueOnce({ rows: mockProdutos });

      const app = require('./main.js');
      const res = await request(app).get('/produtos');

      expect(res.status).toBe(200);
      expect(res.body.hasNext).toBe(false);
      expect(res.body.items).toEqual(mockProdutos);
    });

    it('should handle database errors when fetching products', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Database error'));

      const app = require('./main.js');
      const res = await request(app).get('/produtos');

      expect(res.status).toBe(500);
      expect(res.body.erro).toBe('Database error');
    });
  });

  describe('GET /produtos/:id', () => {
    it('should return a specific product by id', async () => {
      const mockProduto = { id: 1, nome: 'Produto 1', preco: 100.00, classificacao: 'A' };
      mockPool.query.mockResolvedValueOnce({ rows: [mockProduto] });

      const app = require('./main.js');
      const res = await request(app).get('/produtos/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockProduto);
    });

    it('should handle database errors when fetching specific product', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Product not found'));

      const app = require('./main.js');
      const res = await request(app).get('/produtos/999');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Product not found');
    });
  });

  describe('POST /produtos', () => {
    it('should create a new product', async () => {
      const newProduto = { id: 3, nome: 'Novo Produto', preco: 300.00, classificacao: 'C' };
      mockPool.query.mockResolvedValueOnce({ rows: [newProduto] });

      const app = require('./main.js');
      const res = await request(app)
        .post('/produtos')
        .send({ nome: 'Novo Produto', preco: 300.00, classificacao: 'C' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(newProduto);
    });

    it('should handle database errors when creating product', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Insert error'));

      const app = require('./main.js');
      const res = await request(app)
        .post('/produtos')
        .send({ nome: 'Novo Produto', preco: 300.00, classificacao: 'C' });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Insert error');
    });
  });

  describe('PUT /produtos/:id', () => {
    it('should update a product', async () => {
      const updatedProduto = { id: 1, nome: 'Produto Atualizado', preco: 150.00, classificacao: 'A' };
      mockPool.query.mockResolvedValueOnce({ rows: [updatedProduto] });

      const app = require('./main.js');
      const res = await request(app)
        .put('/produtos/1')
        .send({ nome: 'Produto Atualizado', preco: 150.00, classificacao: 'A' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedProduto);
    });

    it('should handle database errors when updating product', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Update error'));

      const app = require('./main.js');
      const res = await request(app)
        .put('/produtos/1')
        .send({ nome: 'Produto Atualizado', preco: 150.00, classificacao: 'A' });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Update error');
    });
  });

  describe('DELETE /produtos/:id', () => {
    it('should delete a product', async () => {
      mockPool.query.mockResolvedValueOnce({});

      const app = require('./main.js');
      const res = await request(app).delete('/produtos/1');

      expect(res.status).toBe(200);
    });

    it('should handle database errors when deleting product', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Delete error'));

      const app = require('./main.js');
      const res = await request(app).delete('/produtos/1');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Delete error');
    });
  });
});

describe('Pedidos Endpoints', () => {
  describe('GET /pedidos', () => {
    it('should return all orders successfully', async () => {
      const mockPedidos = [
        { id: 1, id_cliente: 1, condicao_pagamento: 'À vista', observacao: '', valor_total: 100.00, nome_cliente: 'Cliente 1' },
        { id: 2, id_cliente: 2, condicao_pagamento: 'Parcelado', observacao: '', valor_total: 200.00, nome_cliente: 'Cliente 2' },
      ];
      mockPool.query.mockResolvedValueOnce({ rows: mockPedidos });

      const app = require('./main.js');
      const res = await request(app).get('/pedidos');

      expect(res.status).toBe(200);
      expect(res.body.hasNext).toBe(false);
      expect(res.body.items).toEqual(mockPedidos);
    });

    it('should handle database errors when fetching orders', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Database error'));

      const app = require('./main.js');
      const res = await request(app).get('/pedidos');

      expect(res.status).toBe(200);
      expect(res.body.error).toBe('Database error');
    });
  });

  describe('GET /pedidos/:id', () => {
    it('should return order items for a specific order', async () => {
      const mockItens = [
        { id: 1, id_produto: 1, id_pedido: 1, descricao: 'Item 1', quantidade: 2, preco_unitario: 50.00, valor_total: 100.00 },
      ];
      mockPool.query.mockResolvedValueOnce({ rows: mockItens });

      const app = require('./main.js');
      const res = await request(app).get('/pedidos/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockItens);
    });

    it('should handle database errors when fetching order items', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Order not found'));

      const app = require('./main.js');
      const res = await request(app).get('/pedidos/999');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Order not found');
    });
  });

  describe('POST /pedidos', () => {
    it('should create a new order with items', async () => {
      const mockPedido = { id: 1, id_cliente: 1, condicao_pagamento: 'À vista', observacao: '', valor_total: 100.00 };
      const mockItens = [
        { id: 1, id_produto: 1, id_pedido: 1, descricao: 'Item 1', quantidade: 2, preco_unitario: 50.00, valor_total: 100.00 },
      ];

      mockPool.query
        .mockResolvedValueOnce({ rows: [mockPedido] })
        .mockResolvedValueOnce({ rows: [mockItens[0]] });

      const app = require('./main.js');
      const res = await request(app)
        .post('/pedidos')
        .send({
          id_cliente: 1,
          condicao_pagamento: 'À vista',
          observacao: '',
          itens: [
            { id_produto: 1, descricao: 'Item 1', quantidade: 2, preco_unitario: 50.00 },
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body.postPedido).toEqual(mockPedido);
      expect(res.body.postItens).toBeDefined();
    });

    it('should handle database errors when creating order', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Insert error'));

      const app = require('./main.js');
      const res = await request(app)
        .post('/pedidos')
        .send({
          id_cliente: 1,
          condicao_pagamento: 'À vista',
          observacao: '',
          itens: [
            { id_produto: 1, descricao: 'Item 1', quantidade: 2, preco_unitario: 50.00 },
          ],
        });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Insert error');
    });
  });

  describe('PUT /pedidos/:id', () => {
    it('should update an order with items', async () => {
      const mockPedido = { id: 1, id_cliente: 1, condicao_pagamento: 'Parcelado', observacao: '', valor_total: 150.00 };
      const mockItens = [
        { id: 1, id_produto: 1, id_pedido: 1, descricao: 'Item 1', quantidade: 3, preco_unitario: 50.00, valor_total: 150.00 },
      ];

      mockPool.query
        .mockResolvedValueOnce({ rows: [mockPedido] })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({ rows: [mockItens[0]] });

      const app = require('./main.js');
      const res = await request(app)
        .put('/pedidos/1')
        .send({
          id_cliente: 1,
          condicao_pagamento: 'Parcelado',
          observacao: '',
          itens: [
            { id_produto: 1, descricao: 'Item 1', quantidade: 3, preco_unitario: 50.00 },
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body.putPedido).toEqual(mockPedido);
      expect(res.body.putItem).toBeDefined();
    });

    it('should handle database errors when updating order', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Update error'));

      const app = require('./main.js');
      const res = await request(app)
        .put('/pedidos/1')
        .send({
          id_cliente: 1,
          condicao_pagamento: 'Parcelado',
          observacao: '',
          itens: [
            { id_produto: 1, descricao: 'Item 1', quantidade: 3, preco_unitario: 50.00 },
          ],
        });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Update error');
    });
  });

  describe('DELETE /pedidos/:id', () => {
    it('should delete an order', async () => {
      mockPool.query.mockResolvedValueOnce({});

      const app = require('./main.js');
      const res = await request(app).delete('/pedidos/1');

      expect(res.status).toBe(200);
    });

    it('should handle database errors when deleting order', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Delete error'));

      const app = require('./main.js');
      const res = await request(app).delete('/pedidos/1');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Delete error');
    });
  });
});
