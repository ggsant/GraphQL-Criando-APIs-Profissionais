const { ApolloServer, gql } = require('apollo-server')

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