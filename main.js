class Nota{
    titulo
    subtitulo
    imagem
    nota
    link
    id
    constructor(
        titulo,
        subtitulo,
        imagem,
        nota,
        link){
          this.titulo = titulo
          this.subtitulo = subtitulo
          this.imagem = imagem
          this.nota = nota
          this.link = link  
          this.id = Math.floor(Math.random() * 100000)

          localStorage.removeItem('listaNotas');
          listaNotas.push(this)
          localStorage.setItem('listaNotas', JSON.stringify(listaNotas));
        }   

        criarNota(){
            const nota = `      
          <div class="card" style="width: 18rem;" id="${this.id}" >
          ${this.imagem === undefined ?  "" : `<img src="${this.imagem}" class="card-img-top" alt="..."></img>` }
            <div class="card-body">
              <h5 class="card-title">${this.titulo}</h5>
              ${this.subtitulo === "" ? "" : `<h6 class="card-subtitle mb-2 text-muted">${this.subtitulo}</h6>`}
              <p class="card-text">${this.nota}</p>
              ${this.link[0] === "" || this.link[1] === "" ? '' : `<a href="${this.link[1]}" class="card-link">${this.link[0]}</a>`  }
              <a href="#"  onclick='removeTarefa(this)' class="btn btn-danger">Excluir</a>
            </div>
          </div>`
        document.querySelector("#container").insertAdjacentHTML("beforeend", nota)
        }

}


// localStorage
let listaNotas = []

window.addEventListener('load',(a) => {
    if(localStorage['listaNotas']){
        const notasSalvas = JSON.parse(localStorage.getItem("listaNotas"))
        localStorage.clear()
        notasSalvas.forEach(e => {
            new Nota(  
                e.titulo,
                e.subtitulo,
                e.imagem,
                e.nota,
                e.link).criarNota()
        })
    }
})

// processar imagem
let imagem1
document.forms[0][2].addEventListener("change", (e) => {
    if (!(e.target && e.target.files && e.target.files.length > 0)) {
        return;
      }
    
      // Inicia o file-reader:
      var r = new FileReader();
      // Define o que ocorre quando concluir:
      r.onload = function() {
        imagem1 = r.result
      }
      // Lê o arquivo e cria um link (o resultado vai ser enviado para o onload.
      r.readAsDataURL(e.target.files[0]);      
})

document.querySelector("#criarNota").addEventListener("click", (e) => {
    // criar constantes para extrair valores dos inputs
    const titulo = document.forms[0][0].value
    const subtitulo = document.forms[0][1].value // opcional
    const imagem = imagem1 //opcional
    const nota  = document.forms[0][3].value
    // estou ignorando o problema de segurança ao passar a url direta
    const link = [document.forms[0][4].value , document.forms[0][5].value] //opcional

    if(titulo.trim() === "" || nota.trim() == ""){
        // verificando se o titulo e a nota estão vazios
        window.alert("Titulo ou nota estão vazios, por favor preencher para criar a nota")
        return
    }
    new Nota(titulo,subtitulo,imagem,nota,link).criarNota()
})

function removeTarefa(e){
    // exclui tarefa do array 
    listaNotas.forEach((item, index, object) => {
        if(item.id == e.parentElement.parentElement.id){
            object.splice(index, 1)
        }
    })

    // exclui elemento html
    e.parentElement.parentElement.remove()

    // atualiza o localstorage
    localStorage.removeItem('listaNotas');
    localStorage.setItem('listaNotas', JSON.stringify(listaNotas));
}

