// classe que vai conter a lógica dos dados

// classe: como os dados serão estruturados
export class Favoritos{
    constructor(root){
        this.root = document.querySelector(root) // vai pegar o seletor passado no main( onde foi importado )

        this.tbody = this.root.querySelector('table tbody')

        this.carregar()
    }


    carregar(){

        this.entradas = JSON.parse(localStorage.getItem('@gitfav-favoritos')) || []

        
    }

    deletar(usuario){
        //Pegar a lista e comparar 


        // filter -- Higher-oder functions funções de alta ordem ( map, filter, reduce, find)
        // pega todos menos o que passou no filtro
        const usuarioFiltrado = this.entradas.filter( entrada => {
            //console.log(entrada)

            // Imutabilidade 

            return entrada.login !== usuario.login // Precisa retornar falso 
            
        })

        // console.log(usuarioFiltrado)

        this.entradas = usuarioFiltrado

        this.atualizar()
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

        
        this.entradas.forEach( user => {
            const linha = this.criarLinha()
            
            linha.querySelector('.usuario img').src = `https://github.com/${user.login}.png` // mudar src da imagem
            linha.querySelector('.usuario img').alt = `Imagem do(a) ${user.name}`
            linha.querySelector('.usuario p').textContent = user.name
            linha.querySelector('.usuario span').textContent = user.login
            linha.querySelector('.repositorios').textContent = user.public_repos
            linha.querySelector('.seguidores').textContent = user.followers



            // OBS: addEventListener para eventos que se repetem
            // onclick para eventos que serão disparados uma vez somente
            linha.querySelector('.btn-remover').onclick = () => {
                // confirm -- retorna um booleam
                const confirmou = confirm('Tem certeza que deseja deletar?')

                if(confirmou){
                    // Lógica para deltar a entrada ( vai ficar na classe que lida com os dados ( class Favoritos ))
                    // vai enviar o usuário
                    this.deletar(user)
                    //console.log(user)
                }
            }
            
            // append funcionalidade da DOM, vai receber um elemento HTML criado com a dom
            this.tbody.append(linha)
        })


    }

    criarLinha(){
        // 2.0 Segundo passo - recriar as colunas

        
        // 2.2
        const tr = document.createElement('tr') // Criado com a DOM via javascript
        
        
        // 2.3 Obs - o <tr></tr> (container ) precisa ser criado com a DOM
        tr.innerHTML = `
       
            <td class="usuario">
                <img width="50px" src="https://github.com/nikolasmarlon.png" />
                <a target="_blank" href="https://github.com/nikolasmarlon">
                    <p>Nikolas Marlon</p>
                    <span>/nikolasmarlon</span>
                </a>
            </td>
            <td class="repositorios">123</td>
            <td class="seguidores">1234</td>
            <td><button  class="btn-remover">Remover</button></td>
        
        `

        return tr
    }

    removerTodosTrs(){
        

        this.tbody.querySelectorAll('tr').forEach( (tr) => {
            tr.remove()
        }) // Pegar todas as linhas
    }
}