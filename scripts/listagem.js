const tbPalavras = document.querySelector("table");
const ckMostrar = document.querySelector("input[type='checkbox']");

const mostrarTabela =() =>{
    //se houver dados saalvos em localStorage

    if (localStorage.getItem("jogoPalavra")){

        const palavras = localStorage.getItem("jogoPalavra").split(";");
        const dicas = localStorage.getItem("jogoDica").split(";");


        //perccorre elementos do vetor ee oss insere na tabela
        for (let i = 0; i <palavras.length; i++){
            const linha = tbPalavras.insertRow(-1);

            const col1 = linha.insertCell(0);
            const col2 = linha.insertCell(1);
            const col3 =linha.insertCell(2);

            col1.innerText = palavras[i];
            col2.innerText = dicas [i];
            col3.innerHTML = "<i class='exclui' title='Excluir'>&#10008;</i>";
        }

    }
};

//Ocorre quando o checkbox é alterado. Exibe a lsita se marcado, senão recarrega//
ckMostrar.addEventListener("change", () =>{
    ckMostrar.checked ? mostrarTabela() : window.location.reload();
});

tbPalavras.addEventListener("click" , (e) =>{
    if (e.target.classList.contains("exclui")){
        const palavra = e.target.parentElement.parentElement.children[0].innerText;

        if (confirm (`Confirma exclusão da palavra: "${palavra}?` )){
            e.target.parentElement.parentElement.remove();

            localStorage.removeItem("jogoPalavra");
            localStorage.removeItem("jogoDica");

            const palavras = [];
            const dicas =[];


        for (let i =1; i <tbPalavras.rows.length; i++){
            palavras.push(tbPalavras.rows[i].cells[0].innerText);
            dicas.push(tbPalavras.rows[i].cells[1].innerText);
        }
         localStorage.setItem("jogoPalavra", palavras.join (";"));
         localStorage.setItem("jogoDica", dicas.join (";"));
        }
    }
});
