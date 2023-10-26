import { GithubUser } from './GithubUser.js'

// classe que vai conter a lógica dos dados
// classe: como os dados serão estruturados
export class Favoritos{
    constructor(root){
        this.root = document.querySelector(root) // vai pegar o seletor passado no main( onde foi importado )

        this.tbody = this.root.querySelector('table tbody')

        this.carregar()
        this.adicionar()
        
    }

   

    async buscarNoGithub(username){
        
        try {

            // verificar antes de ir pro github se o user ja existe OBS. find === encontre => devolve so o objeto, se encontrar
            const usuarioExiste = this.entradas.find( entrada => entrada.login === username)


            if(usuarioExiste){
                throw new Error("Usuário já cadastrado")
            }


            const user =  await GithubUser.pesquisar(username)
     
            //console.log(user)

            if(user.login === undefined){
                throw new Error("Usuário não encontrado")
            }

            this.entradas = [user, ...this.entradas]

            // depois de adicionar, preciso do update
            this.salvar()
            this.atualizar()
            
       } catch (error) {
            alert(error.message)
       }
    }

    

    carregar(){

        this.entradas = JSON.parse(localStorage.getItem('@gitfav-favoritos:')) || []   
          
    }
   


    salvar(){
        localStorage.setItem('@gitfav-favoritos:', JSON.stringify(this.entradas)) // transformar objeto javascript em objeto do tipo texto
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

        this.salvar() // no localstorage
    }

}

// classe que vai criar a visualização e eventos do HTML
export class FavoritosVisualizacao extends Favoritos{
    constructor(root){
        super(root) // vai chamar o construtor da classe pai, passando o root para o pai 

        this.atualizar()

        //console.log(this.root)
    }


    adicionar(){

        // root é o #app

        const botaoAdicionar = this.root.querySelector('.search button')

        botaoAdicionar.onclick = () => {
            // pegar o valor do input 
            const { value }= this.root.querySelector('.search input')

            // console.log(value)

            this.buscarNoGithub(value)
        }
    }


    // usada para atualizar um dado ou remover um elemento 
    atualizar() {

         
        this.removerTodosTrs() 
        
        // Primeiro passo - remover todos o trs da tabela
        

        if(this.entradas.length > 0 ){  
            this.entradas.forEach( user => {
            
                const linha = this.criarLinha()
                
                linha.querySelector('.usuario img').src = `https://github.com/${user.login}.png` // mudar src da imagem
                linha.querySelector('.usuario a').href = `https://github.com/${user.login}` // mudar link
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
                        // Lógica para deletar a entrada ( vai ficar na classe que lida com os dados ( class Favoritos ))
                        // vai enviar o usuário
                        this.deletar(user)
                        //console.log(user)
                    }
                }

                console.log(linha)
                
                // append funcionalidade da DOM, vai receber um elemento HTML criado com a dom
                this.tbody.append(linha)
            })
        } else {

            const linha2 = this.criarLinha()
            linha2.querySelector('.aviso-inicial h1').textContent = "Nenhum favorito ainda"


            this.tbody.append(linha2)

        }

            
  


    }

    criarLinha(){
        // 2.0 Segundo passo - recriar as colunas

        
        // 2.2
        let elementoHtml 
        

        if(this.entradas.length > 0 ){    
            
            elementoHtml = document.createElement('tr') // Criado com a DOM via javascript
            // 2.3 Obs - o <tr></tr> (container ) precisa ser criado com a DOM
            elementoHtml.innerHTML = `       
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
        }  else {

            elementoHtml = document.createElement('tr') // Criado com a DOM via javascript
            elementoHtml.innerHTML = `
                
                    <td  class="aviso-inicial" colspan="4" >
                        <div>
                            <img width="50px" src="./assets/Estrela.svg" />
                            <h1>Nenhum favorito ainda</h1>                           
                        </div>
                    </td>                    
                
            
            `
        }
        return elementoHtml
        
    }

    removerTodosTrs(){    
        
        
            

            this.tbody.querySelectorAll('tr').forEach( (tr) => {                
                    tr.remove()               
            }) // Pegar todas as linhas

            
        
    }
}