const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1, 
    nome: 'Leandro',
    email: 'leandro@gmail.com',
    idade: 23
}, {
    id: 2, 
    nome: 'Lara',
    email: 'lara@gmail.com',
    idade: 26
}, {
    id: 3, 
    nome: 'Roberta',
    email: 'roberta@gmail.com',
    idade: 28
}]
// gql - taget template
const typeDefs = gql`
    scalar Date # definiição de um tipo

    # Pontos de entradas da API
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float!
    }
    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int 
        salario: Float
        vip: Boolean
    }
    
    type Query {
        ola: String! # consulta que retorna string
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]! # retornar um array
        usuarios: [Usuario]

    }
`
// função que recebe parametros
const resolvers = {
    // consultas
    Produto: {
        precoComDesconto(produto){
            if(produto.desconto) {
                return produto.preco*(1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Query: {
        ola() {
            return 'Ola mundo'
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado(){
            return {
                id: 1, 
                nome: 'Gabriela Santos', 
                email: 'gabriela@teste.com', 
                idade: 24,
                salario_real: 100000.50,
                vip: true,
            }
        },
        produtoEmDestaque(){
            return {
                nome: 'Geladeira',
                preco: 1000.00,
                desconto: 0.10,
            }
        }, 
        numerosMegaSena(){
            // return [4, 6, 58, 21, 66, 50]
            const crescente = (a,b) => a - b 
            return Array(6).fill(0).map(n => parseInt(Math.random()* 60 + 1)).sort(crescente)
        },
        usuarios(){
            return usuarios 
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})