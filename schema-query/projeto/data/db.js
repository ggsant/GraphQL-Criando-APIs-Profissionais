//* Arrays 

const perfis = [
    { id: 1, nome: 'Comum' }, // objetos
    { id: 2, nome: 'Administrador' }
]


const usuarios = [{
    id: 1, 
    nome: 'Leandro',
    email: 'leandro@gmail.com',
    idade: 23,
    perfil_id: 1,
    status: 'ATIVO'
}, {
    id: 2, 
    nome: 'Lara',
    email: 'lara@gmail.com',
    idade: 26,
    perfil_id: 2, 
    status: 'INATIVO'


}, {
    id: 3, 
    nome: 'Roberta',
    email: 'roberta@gmail.com',
    idade: 28,
    perfil_id: 1,
    status: 'BLOQUEADO'


}]

module.exports = { usuarios, perfis }