/*CRIAÇÃO DE ALGUMAS VARIÁVEIS IMPORTANTES!!!*/

let cursos = new Array()
let materias = new Array()
let Peopl = new Array()

/*ANIMAÇÃO DE CARREGAMENTO DA PÁGINA*/

let divLoading = document.querySelector("body > div")
let ctx = document.querySelector("canvas").getContext("2d")
let setCnv
let A1 = 0
let A2 = 20
ctx.strokeStyle = "white"
ctx.lineWidth = 12
createLoading()
setCnv = setInterval(function() {
    ctx.clearRect(0, 0, 120, 120)
    createLoading()
}, 20)
function createLoading() {
    ctx.beginPath()
    ctx.arc(60, 60, 54, A1*Math.PI/20, A2*Math.PI/20)
    ctx.stroke()
    if(A1 >= 35 || A1 < 25) {
        A1 = (A1 + 1.5) % 40
    } else {
        A1 = (A1 + 0.5) % 40
    } if(A2 >= 35 || A2 < 25) {
        A2 = (A2 + 1.5) % 40
    } else {
        A2 = (A2 + 0.5) % 40
    }
} document.addEventListener("DOMContentLoaded", loading())
function loading() {
    setTimeout(function() {
        divLoading.style.opacity = 0
        setTimeout(function() {
            clearInterval(setCnv)
            document.body.removeChild(divLoading)
        }, 1000)
    }, 1500)
}

/*ALGUMAS VARIÁVEIS IMPORTANTES!*/

let header = document.querySelector("header")
let divs = document.querySelectorAll("article > div")
let pb1 = document.querySelector("#botoes1")
let pb2 = document.querySelector("#botoes2")
let add = document.querySelector("input[value=Adicionar]")
let clear = document.querySelector("input[value='Limpar tudo']")
let edit = document.querySelector("input[value=Editar]")
let cancel = document.querySelector("input[value=Cancelar]")
let imgFechar = header.querySelector("img")
let hDiv = header.querySelector("div")
let allImg = document.querySelectorAll("article:nth-child(1) > div >div > div > img")
let functions = ["Aluno", "Professor"]
let campos = document.getElementsByClassName("txt")
let t
let u
for(t = 0; t < allImg.length; t++) {
    const tCons = t + Math.floor(t/8)
    allImg[t].src = "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/trash-512.png"
    allImg[t].addEventListener("click", function() {
        campos[tCons].value = ""
        campos[tCons].focus()
    })
} let numOpt = [0, 0]
let fechar = function() {
    imgFechar.removeEventListener("click", fechar)
    closeDiv()
}; let functValid = new Array(function() { NomeECodigo(0, false) }, //---> Função de validação para curso
function() { NomeECodigo(1, false) }, //---> Função de validação para matrícula
function() { pessoa(false) }); //---> Função de validação para pessoa
let functLimpar = new Array(function() { //---> Função de limpeza para curso
    campos[0].value = ""
    campos[1].value = ""
    campos[0].focus()
}, function() { //---> Função de limpeza para matrícula
    campos[2].value = ""
    campos[3].value = ""
    campos[2].focus()
}, function() { //---> Função de limpeza para pessoa
    campos[4].value = ""
    campos[5].value = ""
    campos[6].value = ""
    campos[7].value = ""
    campos[9].value = ""
    campos[10].value = ""
    campos[11].value = ""
    campos[12].value = ""
    campos[4].focus()
});

/*ADICIONAR FUNÇÕES NOS BOTÕES*/

add.addEventListener("click", functValid[0])
clear.addEventListener("click", functLimpar[0])
imgFechar.addEventListener("click", fechar)

function closeDiv() {
    header.style.opacity = 0
    setTimeout(function() {
        header.style.display = "none"
        hDiv.innerHTML = ""
    }, 600)
} function exclElement(divPrinc, divNome, num, newClasse) { //---> Função para deletar uma linha da tabela
    if(divNome.style.background == "maroon") {
        mostrarMens("Esta entidade está sendo editada, portanto não pode ser deletada no momento!")
    } else {
        header.style.display = "flex"
        header.style.opacity = 0
        imgFechar.style.display = "none"
        setTimeout(function() {
            header.style.opacity = 1
            hDiv.innerHTML = "<p style='font-size: 35px'>Deseja mesmo excluir este elemento?</p><p style='margin-top: 20px; display: flex; align-items: center; justify-content: center'><input type=radio style='border: none; background: limegreen'> <b style='color: limegreen'>Sim</b>&nbsp;&nbsp;&nbsp;<input type=radio style='border: none; background: rgb(255,100,100)'> <b>Não</b></p>"
            let Opt = hDiv.querySelectorAll("input[type=radio]")
            Opt[0].addEventListener("click", function() {
                closeDiv()
                divs[num].removeChild(divPrinc)
                if(num == 5) { //---> Cursos
                    cursos.splice(cursos.indexOf(newClasse), 1)
                    console.log(cursos)
                } else if(num == 6) { //---> Matérias
                    materias.splice(materias.indexOf(newClasse), 1)
                    console.log(materias)
                } else if(num == 7) { //---> Pessoa
                    Peopl.splice(Peopl.indexOf(newClasse), 1)
                    console.log(Peopl)
                } 
            }); Opt[1].addEventListener("click", function() {
                closeDiv()
            })
        }, 100)
    }
} function verif1(listaErro, nome) {
    if(nome == "") {
        listaErro.push("Não foi atribuído um valor para nome!")
    } else {
        if(newValor(nome) == "") {
            listaErro.push("O nome está preenchido somente com espaços!") //---> Valor de nome preenchido unicamente com espaços
        }
    }
} function verif2(listaErro, valor, num1, addTxt) {
    if(valor.length == 0) {
        listaErro.push("Não foi atribuído um valor para " + addTxt + "!")
    } else {
        if(valor.length < num1) {
            listaErro.push("Caracteres insuficientes para " + addTxt + "!")
        } if(haveCrctNaN(valor)) {
            listaErro.push("O " + addTxt + " deve ser preenchido somente com números!")
        }
    }
}

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/* FUNÇÃO PARA ADICIONAR, ATUALIZAR OU DELETAR PESSOA */

function pessoa(condP, oldClass, conjD) {
    let nome = campos[4].value
    let cpf = campos[5].value
    let rg = campos[6].value
    let DN = campos[7].value.split("-")
    let pfx = campos[8].value
    let fone = campos[9].value
    let email = campos[10].value
    let matricula = campos[11].value
    let funct = campos[12].value
    let listaErro = new Array()
    verif1(listaErro, nome)
    verif2(listaErro, cpf, 11, "CPF")
    verif2(listaErro, rg, 9, "RG")
    verif2(listaErro, fone, 8, "fone")
    verif2(listaErro, matricula, 5, "matrícula")
    /*VERIFICAR DATA DE NASCIMENTO*/
    if(DN.length == 1) {
        listaErro.push("Data de nascimento vazia, inválida ou não completamente preenchida!") //---> Vazio ou não completamente preenchido!
    } else {
        let today = new Date()
        let dia = today.getDate()
        let mes = today.getMonth() + 1
        let ano = today.getFullYear()
        if(DN[0] < 1900) { //---> Data de nascimento muito antiga
            listaErro.push("Não é possível cadastrar datas de nascimentos antes de 1º de janeiro de 1900!")
        } else if(DN[0] > ano || (DN[0] == ano && (DN[1] > mes || (DN[1] == mes && DN[2] > dia)))) { //---> Data de nascimento que ainda não aconteceu
            listaErro.push("Não é possível cadastrar datas de nascimentos que excedam a data atual!")
        }
    } /*VERIFICAR FUNÇÃO*/
    if(funct == "") {
        listaErro.push("Nenhuma opção foi atribuída para a função da pessoa!")
    } if(listaErro.length == 0) {
        let newClasse = new Pessoa(newValor(nome), cpf, rg, DN, "(" + pfx + ")" + fone, email, matricula, funct)
        if(condP == false) {
            Peopl.push(newClasse)
            console.log(Peopl)
            let divPrinc = document.createElement("div")
            let divNome = document.createElement("div")
            let divCPF = document.createElement("div")
            let divRG = document.createElement("div")
            let divDN = document.createElement("div")
            let divFone = document.createElement("div")
            let divEmail = document.createElement("div")
            let divMatr = document.createElement("div")
            let divFunct = document.createElement("div")
            let condDiv = false
            let newB = document.createElement("b")
            newB.textContent = nome
            let editar = document.createElement("img")
            let excluir = document.createElement("img")
            editar.addEventListener("click", function() {
                if(pb2.style.display == "block") {
                    if(divNome.style.background == "maroon") {
                        mostrarMens("A entidade destacada em vermelho escuro indica aquela que está sendo editada neste momento!")
                    } else {
                        mostrarMens("Enquanto você estiver editando uma determinada entidade, você NÃO pode editar outras entidades ao mesmo tempo!")
                    }
                } else {
                    indicEdit(divNome, false)
                    edit.onclick = function() {
                        if(pessoa(true, newClasse, [newB, divCPF, divRG, divDN, divFone, divEmail, divMatr, divFunct])) {
                            indicEdit(divNome, true)
                            mostrarMens("Todos os valores dos atributos da entidade selecionada foram substituídos com sucesso!")
                        }
                    }; cancel.onclick = function() {
                        mostrarMens("A edição foi cancelada, ou seja, os atributos da entidade selecionada ainda vão ser as mesmas!")
                        returnPB1(divNome)
                    }; campos[4].value = nome
                    campos[5].value = cpf
                    campos[6].value = rg
                    campos[7].value = ""
                    campos[9].value = ""
                    campos[10].value = email
                    campos[11].value = matricula
                    campos[12].value = funct
                }
            });
            editar.src = "https://www.flaticon.com/svg/static/icons/svg/61/61456.svg"
            editar.style.right = "60px"
            excluir.src = "https://image.flaticon.com/icons/png/512/75/75519.png"
            excluir.style.right = "15px"
            divNome.appendChild(newB)
            divNome.appendChild(editar)
            divNome.appendChild(excluir)
            excluir.addEventListener("click", function() { exclElement(divPrinc, divNome, 7, newClasse) });
            newB.addEventListener("click", function() {
                if(condDiv == false) {
                    condDiv = true
                    divCPF.style.height = divCPF.scrollHeight + "px"
                    divRG.style.height = divRG.scrollHeight + "px"
                    divDN.style.height = divDN.scrollHeight + "px"
                    divFone.style.height = divFone.scrollHeight + "px"
                    divEmail.style.height = divEmail.scrollHeight + "px"
                    divMatr.style.height = divMatr.scrollHeight + "px"
                    divFunct.style.height = divFunct.scrollHeight + "px"
                } else {
                    condDiv = false
                    divCPF.style.height = "0px"
                    divRG.style.height = "0px"
                    divDN.style.height = "0px"
                    divFone.style.height = "0px"
                    divEmail.style.height = "0px"
                    divMatr.style.height = "0px"
                    divFunct.style.height = "0px"
                }
            }); divCPF.innerHTML = '<p>' + cpf + '</p><p>Certidão de Pessoa Física (CPF)</p>'
            divRG.innerHTML = '<p>' + rg + '</p><p>Registro Geral (RG)</p>'
            divDN.innerHTML = '<p>' + DN[2] + '/' + DN[1] + '/' + DN[0] + '</p><p>Data de nascimento (ano/mês/dia)</p>'
            divFone.innerHTML = '<p>(' + pfx + ') ' + fone + '</p><p>Fone</p>'
            divEmail.innerHTML = '<p>' + email + '</p><p>E-mail</p>'
            divMatr.innerHTML = '<p>' + matricula + '</p><p>Matrícula</p>'
            divFunct.innerHTML = '<p>' + functions[funct] + '</p><p>Função</p>'
            divPrinc.appendChild(divNome)
            divPrinc.appendChild(divCPF)
            divPrinc.appendChild(divRG)
            divPrinc.appendChild(divDN)
            divPrinc.appendChild(divFone)
            divPrinc.appendChild(divEmail)
            divPrinc.appendChild(divMatr)
            divPrinc.appendChild(divFunct)
            divs[7].appendChild(divPrinc)
        } else {
            Peopl[Peopl.indexOf(oldClass)] = newClasse
            console.log(Peopl)
            conjD[0].textContent = newClasse.nome
            conjD[1].querySelector("p").textContent = newClasse.cpf
            conjD[2].querySelector("p").textContent = newClasse.rg
            conjD[3].querySelector("p").textContent = newClasse.datanasc[2] + "/" + newClasse.datanasc[1] + "/" + newClasse.datanasc[2]
            conjD[4].querySelector("p").textContent = newClasse.fone
            conjD[5].querySelector("p").textContent = newClasse.email
            conjD[6].querySelector("p").textContent = newClasse.matric
            conjD[7].querySelector("p").textContent = functions[newClasse.funct]
            return true
        }
    } else {
        mostrarMens(listaErro)
        return false
    }
};

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*FUNÇÃO PARA ADICIONAR, ATUALIZAR OU DELETAR CURSO E MATRÍCULA*/

function NomeECodigo(addNum, condNC, oldClass, conjD) {
    let nome = campos[2*addNum].value
    let codigo = campos[2*addNum + 1].value
    let listaErro = new Array()
    verif1(listaErro, nome)
    verif2(listaErro, codigo, 5, "código")
    if(listaErro.length == 0) { //---> Se não tiver erros, criar uma nova classe
        let newClasse
        if(addNum == false) {
            newClasse = new Curso(newValor(nome), codigo)
        } else {
            newClasse = new Materia(newValor(nome), codigo)
        } if(condNC == false) {
            if(addNum == false) {
                cursos.push(newClasse)
                console.log(cursos)
            } else {
                materias.push(newClasse)
                console.log(materias)
            } let divPrinc = document.createElement("div")
            let divNome = document.createElement("div")
            let divCodigo = document.createElement("div")
            let condDiv = false
            let newB = document.createElement("b")
            newB.textContent = nome
            let editar = document.createElement("img")
            let excluir = document.createElement("img")
            editar.src = "https://www.flaticon.com/svg/static/icons/svg/61/61456.svg"
            editar.style.right = "60px"
            editar.addEventListener("click", function() {
                if(pb2.style.display == "block") {
                    if(divNome.style.background == "maroon") {
                        mostrarMens("A entidade destacada em vermelho escuro indica aquela que está sendo editada neste momento!")
                    } else {
                        mostrarMens("Enquanto você estiver editando uma determinada entidade, você NÃO pode editar outras entidades ao mesmo tempo!")
                    }
                } else {
                    indicEdit(divNome, false)
                    edit.onclick = function() {
                        if(NomeECodigo(addNum, true, newClasse, [newB, divCodigo])) {
                            indicEdit(divNome, true)
                            mostrarMens("Todos os valores dos atributos da entidade selecionada foram substituídos com sucesso!")
                        }
                    }; cancel.onclick = function() {
                        mostrarMens("A edição foi cancelada, ou seja, os atributos da entidade selecionada ainda vão ser as mesmas!")
                        returnPB1(divNome)
                    }; campos[2*addNum].value = nome
                    campos[2*addNum + 1].value = codigo
                }
            });
            excluir.src = "https://image.flaticon.com/icons/png/512/75/75519.png"
            excluir.style.right = "15px"
            excluir.addEventListener("click", function() { exclElement(divPrinc, divNome, addNum + 5, newClasse) })
            newB.addEventListener("click", function() {
                if(condDiv == false) {
                    condDiv = true
                    divCodigo.style.height = divCodigo.scrollHeight + "px"
                } else {
                    condDiv = false
                    divCodigo.style.height = "0px"
                }
            }); divNome.appendChild(newB)
            divNome.appendChild(editar)
            divNome.appendChild(excluir)
            divCodigo.innerHTML = '<p>' + codigo + '</p><p>Código de identificação</p>'
            divPrinc.appendChild(divNome)
            divPrinc.appendChild(divCodigo)
            divs[addNum + 5].appendChild(divPrinc)
        } else {
            if(addNum == false) {
                cursos[cursos.indexOf(oldClass)] = newClasse
                console.log(cursos)
            } else {
                materias[materias.indexOf(oldClass)] = newClasse
                console.log(materias)
            } conjD[0].innerHTML = newClasse.nome
            conjD[1].innerHTML = '<p>' + newClasse.code + '</p><p>Código de identificação</p>'
            return true
        }
    } else { //---> Se houver erros, mostrar mensagem!
        mostrarMens(listaErro)
        return false
    }
}

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*OBSERVAÇÃO IMPORTANTE: SE VOCÊ REPARAR, AS FUNÇÕES PARA CURSO/MATRÍCULA E PARA PESSOA (AMBAS MOSTRADAS ACIMA) TEM UMA ESTRUTURA SEMELHANTE, MAS COM ALGUMAS MUDANÇAS CONFORME A DIFERENÇA DOS ATRIBUTOS DESTAS ENTIDADES*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

function returnPB1(divNome) {
    divNome.style.background = "rgb(70,70,70)"
    divs[0].style.display = "flex"
    divs[4].style.display = "flex"
    edit.onclick = ""
    cancel.onclick = ""
    pb1.style.display = "block"
    pb2.style.display = "none"
} function indicEdit(divNome, condEdit) {
    if(condEdit == true) {
        pb1.style.display = "block"
        pb2.style.display = "none"
        divNome.style.background = "rgb(70,70,70)"
        divs[0].style.display = "flex"
        divs[4].style.display = "flex"
    } else {
        pb1.style.display = "none"
        pb2.style.display = "block"
        divNome.style.background = "maroon"
        divs[0].style.display = "none"
        divs[4].style.display = "none"
    }
} function mostrarMens(parametro) { //---> Mostrar header com mensagem (alternativa ao comando padrão alert!!!)
    header.style.display = "flex"
    header.style.opacity = 0
    imgFechar.style.display = "block"
    if(Array.isArray(parametro)) {
        hDiv.innerHTML = "<p>Há valores inválidos inseridos em, pelo menos, um dos campos, portanto uma nova classe não será criada! Confira os erros:</p><br>"
        for(t = 0; t < parametro.length; t++) {
            hDiv.innerHTML += "<p><b>" + parametro[t] + "</b></p>"
            if(t !== parametro.length - 1) {
                hDiv.innerHTML += "<hr>"
            }
        }
    } else {
        hDiv.innerHTML = parametro
    } setTimeout(function() {
        header.style.opacity = 1
        setTimeout(function() {
            imgFechar.addEventListener("click", fechar)
        }, 600)
    }, 100)
}

/*ABAIXO ALGUNS MÉTODOS DE VALIDAÇÃO UTILIZADOS!!!*/

function newValor(valor) {
    let vetor = valor.split(" ")
    let newvalor = ""
    for(let u = 0; u < vetor.length; u++) {
        if(vetor[u] !== "") {
            if(newvalor !== "") {
                newvalor += " "
            } newvalor += vetor[u]
        }
    } return newvalor
} function haveCrctNaN(valor) {
    let condValor = false
    for(t = 0; t < valor.length; t++) {
        let condDig = false
        const caract = valor.charAt(t)
        for(u = 0; u <= 9; u++) {
            if(caract == String(u)) {
                condDig = true
                break
            }
        } if(condDig == false) {
            condValor = true
        }
    } return condValor
}

/*CRIAÇÃO DOS BOTÕES (INPUT TYPE RANDOM)*/

for(u = 1; u <= 2; u++) {
    const Ucons = u - 1
    const numDiv = 4*Ucons
    divs[numDiv].innerHTML = "<input type=radio name=opt" + u + " style='background: rgb(160,160,160)' checked=true> <b>Curso</b>&nbsp;&nbsp;<input type=radio name=opt" + u + "> <b>Matéria</b>&nbsp;&nbsp;<input type=radio name=opt" + u + "> <b>Pessoa</b>"
    let radio = document.getElementsByName("opt" + u)
    for(t = 0; t < radio.length; t++) {
        const tCons = t
        radio[t].addEventListener("mouseenter", function() {
            if(this.checked == true) {
                this.style.background = "rgb(100,100,100)"
            } else {
                this.style.background = "rgb(160,160,160)"
            }
        }); radio[t].addEventListener("mouseleave", function() {
            if(this.checked == true) {
                this.style.background = "rgb(160,160,160)"
            } else {
                this.style.background = "rgb(205,205,205)"
            }
        }); radio[t].addEventListener("click", function() {
            if(numOpt[Ucons] !== tCons) {
                if(Ucons == 0) {
                    add.removeEventListener("click", functValid[numOpt[0]])
                    clear.removeEventListener("click", functLimpar[numOpt[0]])
                    setTimeout(function() {
                        add.addEventListener("click", functValid[tCons])
                        clear.addEventListener("click", functLimpar[tCons])
                    }, 700)
                } divs[numDiv + numOpt[Ucons] + 1].style.height = divs[numDiv + numOpt[Ucons] + 1].scrollHeight + "px"
                setTimeout(function() {
                    divs[numDiv + numOpt[Ucons] + 1].style.height = "0px"
                    radio[numOpt[Ucons]].style.background = "rgb(205,205,205)"
                    radio[tCons].style.background = "rgb(100,100,100)"
                    setTimeout(function() {
                        divs[numDiv + numOpt[Ucons] + 1].style = "height: 0px"
                        divs[numDiv + tCons + 1].style.height = divs[numDiv + tCons + 1].scrollHeight + "px"
                        divs[numDiv + tCons + 1].style.margin = "20px 0px"
                        numOpt[Ucons] = tCons
                        setTimeout(function() {
                            divs[numDiv + tCons + 1].style.height = "max-content"
                        }, 300)
                    }, 300)
                }, 100)
            }
        })
    }
}