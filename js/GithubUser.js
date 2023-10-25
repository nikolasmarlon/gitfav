export class GithubUser {
    static pesquisar(usuario){
        const endpoint = `https:api.github.com/users/${usuario}`


        // fetch busca as coisas na internet ( promise )  
        return fetch(endpoint).then( dado  => dado.json()).then( ({ login, name, public_repos, followers}) => ({                 
            login,
            name,
            public_repos,
            followers
        }))
    }
}