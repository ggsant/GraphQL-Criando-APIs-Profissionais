const { ApolloServer, ggl } = require('apollo-server')

// gql - taget template
const typeDefs = gql``

const resolvers = {

}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})