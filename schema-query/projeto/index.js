const { ApolloServer, gql } = require('apollo-server')

//* Arrays que contem objetos
const perfis = [
    { id: 1, nome: 'Comum' },
    { id: 2, nome: 'Administrador' }
]

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


//* Tipos
const typeDefs = gql` # gql - taget template
    scalar Date # definiição de um tipo

    # Pontos de entradas da API

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float!
    }

    type Perfil {
        nome: String
        id: Int
    }

    type Usuario {
        id: Int!
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
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
`

//* Resolvers
// função que pode receber parametros
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
        }, 
        // o primeiro parametro de um resolver, sempre é um objeto. 
        usuario(_, { id }) {
            const selecionados = usuarios.filter(u => u.id === id)
            return selecionados ? selecionados[0] : null
        }, 

        perfis(){
            return perfis
        }, 

        perfil(_, { id}) {
            const selecionados = perfis.filter(p => p.id === id)
            return selecionados ? selecionados[0] : null
        },
        
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})