class Curso {
    constructor(nome, code, coordenador, mat) {
        this.nome = nome
        this.code = code //---> Valor identificador
    }
} class Materia {
    constructor(nome, code) {
        this.nome = nome
        this.code = code
    }
} class Pessoa {
    constructor(nome, cpf, rg, datanasc, fone, email, matric, funct) {
        this.nome = nome
        this.cpf = cpf
        this.rg = rg
        this.datanasc = datanasc
        this.fone = fone
        this.email = email
        this.matric = matric
        this.funct = funct
    }
}