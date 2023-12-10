# API de Depósito e Transferência de Dinheiro - Meios de Pagamento

Este projeto foi feito na implementação de uma API RESTful em PHP usando o framework Laravel para o Teste Prático da vaga de estágio da Empresa Ultralinks para back end, o projeto tem o objetivo de possibilitar depósito e transferência de dinheiro entre contas de usuários.

## Requisitos de Negócios

### 1. Cadastro de Usuário

- Nome Completo
- Data de Nascimento
- CPF
- Email
- Senha (Criptografada no Banco)
- Endereço de Cobrança
  - CEP
  - Complemento
  - Número de Endereço

### 2. Autenticação de Usuário

- Email
- Senha

### 3. Depósito de Dinheiro em Conta de Usuário

- Geração de código de autorização no formato DEP0000 (últimos 4 dígitos automáticos).

### 4. Transferência de Dinheiro entre Contas de Usuário

- Geração de código de autorização no formato TRANSF0000 (últimos 4 dígitos automáticos).

## Retornando da rota Get do Usuários
GET /users
```
    [
        {
            "identify": 1,
            "name": "Alerrando",
            "email": "alerrando2@gmail.com",
            "total_value": 175,
            "created": "2023-12-10 15:58:00"
        },
        {
            "identify": 2,
            "name": "José",
            "email": "jose@gmail.com",
            "total_value": 55,
            "created": "2023-12-10 15:58:00"
        }
    ]
```

## Campos no Cadastro de Usuário
POST /users
- 'name'
- 'email'
- 'date_of_birth'
- 'password'
- 'cpf'
- 'cep'
- 'address_number'
- 'total_value'

#### Retorno: 
```
{
    "status": true,
    "message": [
        {
            "identify": 1,
            "name": "Alerrando",
            "email": "alerrando2@gmail.com",
            "total_value": "100",
            "created": "2023-12-10"
        },
        {
            "token": "",
        }
    ]
}
```

### Campos do Endereço (Obtidos via ViaCep)

- 'cep'
- 'logradouro'
- 'complemento'
- 'bairro'
- 'localidade'
- 'uf'
- 'ibge'
- 'gia'
- 'ddd'
- 'user_id'

## Campos para o login
POST /users/login
- "email"
- "password"

### Retorno: 
```
{
  "status": true,
  "message": {
    "user": {
      "id": 1,
      "name": "",
      "email": "",
      "date_of_birth": "",
      "cpf": "",
      "cep": "",
      "address_number": "",
      "total_value": 0,
      "created_at": "",
      "updated_at": ""
    },
    "token": {
      "headers": {},
      "original": {
        "access_token": "",
        "token_type": "bearer",
        "expires_in": 3600
      },
      "exception": null
    }
  }
}
```

## Campos para filtrar todos os dados do usuário pelo cpf
POST /users/by-cpf
- "cpf"

### Retorno: 
```
{
  "status": true,
  "message": {
    "user": {
      "id": 1,
      "name": "Alerrando",
      "email": "alerrando2@gmail.com",
      "date_of_birth": "2002-10-16 00:00:00",
      "cpf": "37851858730",
      "cep": "19600-000",
      "address_number": "61",
      "total_value": 0,
      "created_at": "2023-12-10 00:00:00",
      "updated_at": "2023-12-10 00:00:00"
    },
    "address": {
      "cep": "19600-000",
      "logradouro": "",
      "complemento": "",
      "bairro": "",
      "localidade": "Rancharia",
      "uf": "SP"
    },
    "deposits": [
        {
            "cpf": "37851858730",
            "authorization_code": "DEP0001",
            "value": 25
        }
    ],
    "transfer": [
        {
            "cpf": "37851858730",
            "cpf_transfer": "37851858731",
            "authorization_code": "TRANSF0001",
            "value": 25
        }
    ]
  }
}
```


## Campos da rota Get de Depósitos por Usuário
POST /users/deposits
- "cpf"

### Retorno:
```
{
    "status": true,
    "message": {
        "user": {
            "id": 1,
            "name": "Alerrando",
            "email": "alerrando2@gmail.com",
            "date_of_birth": "2002-10-16 00:00:00",
            "cpf": "37851858730",
            "cep": "19600-000",
            "address_number": "61",
            "total_value": 0,
            "created_at": "2023-12-10 00:00:00",
            "updated_at": "2023-12-10 00:00:00"
        },
        "deposits": [
            {
            "cpf": "37851858730",
            "authorization_code": "DEP0001",
            "value": 25
            }
        ]
    }
}
```

## Campos da rota Get de Transferências por Usuário
POST /users/transfers
- "cpf"

### Retorno:
```
{
    "status": true,
    "message": {
        "user": {
            "id": 1,
            "name": "Alerrando",
            "email": "alerrando2@gmail.com",
            "date_of_birth": "2002-10-16 00:00:00",
            "cpf": "37851858730",
            "cep": "19600-000",
            "address_number": "61",
            "total_value": 0,
            "created_at": "2023-12-10 00:00:00",
            "updated_at": "2023-12-10 00:00:00"
        },
        "transfers": [
            {
                "cpf": "37851858730",
                "cpf_transfer": "37851858731",
                "authorization_code": "TRANSF0001",
                "value": 25
            }
        ]
    }
}
```

## Atualização de Usuário
PUT /users/{id}
- "id" (parâmetro na URL)
- "name"
- "email"
- "date_of_birth"
- "password"
- "cpf"
- "cep"
- "address_number"
- "total_value"

### Retorno:
```
{
    "status": true,
    "message": {
        "id": 1,
        "name": "Alerrando",
        "email": "alerrando2@gmail.com",
        "date_of_birth": "2002-10-16 00:00:00",
        "cpf": "37851858730",
        "cep": "19600-000",
        "address_number": "61",
        "total_value": 0,
        "created_at": "2023-12-10 00:00:00",
        "updated_at": "2023-12-10 00:00:00"
    }
}
```

## Exclusão de Usuário
DELETE /users/{id}
- "id" (parâmetro na URL)

### Retorno: 
```
{
    "message": "Usuário excluído com sucesso"
}
```

## Campos para fazer um depósito
POST /users/deposit
- "user_cpf"
- "value"

### Retorno: 
```
{
  "status": true,
  "message": [
    {
      "cpf": "37851858730",
      "authorization_code": "DEP0001",
      "value": 33
    }
  ]
}
```

## Campos para fazer uma transferência
POST /users/transfer
- "user_cpf"
- "value"
- "user_cpf_transfer"

### Retorno: 
```
{
  "status": true,
  "message": [
    {
      "cpf": "51858773830",
      "cpf_transfer": "51858773831",
      "authorization_code": "TRANSF0001",
      "value": 25
    }
  ]
}
```