# 🛡️ Análise de Segurança (OWASP Top 10)

Este documento analisa o código da API com base nas 10 principais vulnerabilidades da OWASP (2021).  


---

## ⚠️ 1. A05:2021 – Security Misconfiguration (Configuração incorreta de segurança)

### 🔎 Onde acontece:
- O servidor está sem autenticação ou controle de acesso.
- CORS liberado para todos (`app.use(cors())`).
- Credenciais do banco de dados estão hardcoded no código:
  ```js
  const pool = new Pool({
      user:"postgres",
      password:"0009",
      database:"treinamentoUf"
  })
  ```

### Como Corrigir
- Usar variáveis de ambiente (.env):
  
    ```js
        const pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
        });
    ```

- Restringir CORS:
    ```js
        app.use(cors({ origin: "https://localhost.com" }));
    ```




## 2. A01:2021 – Broken Access Control (Controle de acesso quebrado)

### Onde acontece:
- Nenhum endpoint exige autenticação.
  - `GET /clientes` → expõe todos os dados de clientes.
  - `DELETE /pedidos/:id` → permite apagar pedidos de qualquer pessoa.
  - `POST /produtos` → cria produtos sem qualquer restrição.
- Não há diferenciação de usuários (ex: admin, comum).
- Todas as rotas estão livres para qualquer requisição HTTP.

---

###  Riscos:
- Qualquer pessoa (mesmo sem login) pode:
  - Ler, criar, atualizar ou deletar dados.
- Dados sensíveis podem ser expostos ou corrompidos.
- Ausência de controle de acesso .

---

### Como Corrigir
#### 1. Implementar autenticação com JWT (JSON Web Token):
```js
const jwt = require('jsonwebtoken');

// Middleware para autenticar o token
const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token ausente" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Token inválido" });
  }
};
```


## 3. A02:2021 – Cryptographic Failures (Falhas Criptográficas)

### 🔎 Onde acontece:
- O sistema não utiliza criptografia para dados sensíveis.
- Senhas e informações sigilosas (como `password: "0009"`) estão em texto puro no código.

---

### ⚠️ Riscos:
- Dados enviados em JSON podem conter informações sensíveis sem criptografia.


### Como Corrigir
- Adicionar criptografia nas requisições.