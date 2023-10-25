// classe que vai conter a lógica dos dados

// classe: como os dados serão estruturados
export class Favoritos{
    constructor(root){
        this.root = document.querySelector(root) // vai pegar o seletor passado no main( onde foi importado )
    }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritosVisualizacao extends Favoritos{
    constructor(root){
        super(root) // vai chamar o construtor da classe pai, passando o root para o pai 

        this.atualizar()

        //console.log(this.root)
    }


    // usada para atualizar um dado ou remover um elemento 
    atualizar() {

        // Primeiro passo - remover todos o trs da tabela
        this.removerTodosTrs() 

        // Segundo passo - recriar as colunas



    }

    removerTodosTrs(){
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr').forEach( (tr) => {
            tr.remove()
        }) // Pegar todas as linhas
    }
}