let despesas = []


function teste(){
    window.alert('funcionou')
}

let Despesa = function(ano,mes,dia,tipo,descricao,valor){
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        switch (id) {
            case null:
                localStorage.setItem('id',0)
                break;
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) +1
    }
    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id)
    }

    recuperarRegistros(){
        let id = localStorage.getItem('id')

        for(let i = 1; i<= id;i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            
            if(despesa != null){
                despesa.id = i
                despesas.push(despesa)
            }
            
        }
       
    }

    excluir(id){
        localStorage.removeItem(id)
        window.alert('Despesa exluida')
        window.location.reload()
    }

}
let bd = new Bd()
function cadastrarDespesa(){

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    if(ano ==='' || mes ==='' || dia ==='' || tipo=== '' || descricao === '' || valor === ''){
        window.alert('Não é possivel cadastrar uma despesas sem preencher todos os campos')

    } else {
        let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
        
        
        bd.gravar(despesa)
        window.alert('Despesas cadastrada')
        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''
    }   
}

function preencheArray(){
    bd.recuperarRegistros()
}
function carregaListaDespesas(){
    
    document.getElementById('dadosT').innerHTML = ''
    let tabela =  document.getElementById('dadosT')

    despesas.forEach(function(x){

        //criando linha tr
        let linha = tabela.insertRow()


        //criar coluna
        linha.insertCell(0).innerHTML = x.dia + ' /' + x.mes + ' /'+x.ano 
        linha.insertCell(1).innerHTML = x.tipo
        linha.insertCell(2).innerHTML = x.descricao
        linha.insertCell(3).innerHTML = x.valor

        let botao = document.createElement('button')
        botao.className = 'excluir'
        botao.id = 'id-despesa'+x.id
        botao.onclick = function(){

            let id = this.id.replace('id-despesa','')
            bd.excluir(id)
        }

        linha.insertCell(4).append(botao)

    })
    
    
    
}

function filtraDespesas(){

    let filtro = despesas
    
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value


    if(ano != ''){
        
        filtro = filtro.filter(function(f){ return f.ano == ano})
    } 

    
    if (mes !=''){
        filtro = filtro.filter(function(f){ return f.mes == mes})
    }

    if(dia != ''){
        filtro = filtro.filter(function(f){return f.dia == dia})
    }

    if(tipo != ''){
        filtro = filtro.filter(function(f){return f.tipo == tipo})
    }

    if(descricao != ''){
        filtro = filtro.filter(function(f){return f.descricao == descricao})
    }

    if(valor != ''){
        filtro = filtro.filter(function(f){return f.valor == valor})
    }

    document.getElementById('dadosT').innerHTML = ''
    let tabela =  document.getElementById('dadosT')

    filtro.forEach(function(x){

        //criando linha tr
        let linha = tabela.insertRow()


        //criar coluna
        linha.insertCell(0).innerHTML = x.dia + ' /' + x.mes + ' /'+x.ano 
        linha.insertCell(1).innerHTML = x.tipo
        linha.insertCell(2).innerHTML = x.descricao
        linha.insertCell(3).innerHTML = x.valor
    })
}


