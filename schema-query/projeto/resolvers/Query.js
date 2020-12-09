const { usuarios, perfis } = require('../data/db')

module.exports = {
    // resolvers
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