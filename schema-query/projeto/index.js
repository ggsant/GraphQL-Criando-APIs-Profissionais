const { ApolloServer, gql } = require('apollo-server')

// gql - taget template
const typeDefs = gql`
    scalar Date # definiição de um tipo

    # Pontos de entradas da API
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
    }
`
// função que recebe parametros
const resolvers = {
    // consultas
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