const { ApolloServer, gql } = require('apollo-server')

// gql - taget template
const typeDefs = gql`
    # Pontos de entradas da API
    type Query {
        ola: String # consulta que retorna string
    }
`
// função que recebe parametros
const resolvers = {
    Query: {
        ola() {
            return 'Ola mundo'
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