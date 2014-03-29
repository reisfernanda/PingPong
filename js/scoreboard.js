/* Código responsável por manipular o placar de jogadores */

/* Exibir o placar ao carregar a página */
$(document).ready(function(){
		printScoreBoard();
});

/* Limpa placar */
$("#clearScoreboard").click(function(){
    localStorage.clear();
});

/* Função que exibe na tela o placar atual */
function printScoreBoard(){
    var countItems = localStorage.length;
    var key = '';
    var value = '';
    
    if(countItems == 0){
        //Ainda não há placar, mostrar mensagem.
        $("#scoreboard").addClass("hide");
        $("#scoreboardMessage").html("Você ainda não jogou nenhuma vez! :(");
        return;
    }

    /* Criando um array ordenado pela pontuação dos jogadores */
    var sortedItems = sortPlayersByScore(localStorage);

    if(document.getElementById("scoreboard").rows.length > 1) {
        for(var t = document.getElementById("scoreboard").rows.length; t > 1; t--){
            document.getElementById("scoreboard").deleteRow(1);
        }
    }
    
    /* Inserindo os players/scores na tabela em ordem decrescente*/
    for(var c = countItems-1; c >= 0; c--){
        key = sortedItems[c][0];
        value = sortedItems[c][1];

        var newRow = document.getElementById("scoreboard").insertRow(document.getElementById("scoreboard").rows.length);
         
        newCell = newRow.insertCell(0);
        newCell.innerHTML = key;
        newCell = newRow.insertCell(1);
        newCell.innerHTML = value;
    }

}

/* Função auxiliar para retornar um array com o localStore ordenado pelo valor.
    Ou seja, esta função vai retornar um array ordenado de acordo com a pontuação do jogador.
 */
function sortPlayersByScore(O){
    var A = [];

    for(var c = 0; c < localStorage.length; c++){
        key = localStorage.key(c);
        value = localStorage.getItem(key);
        A.push([key, value]);
    }
    A.sort(function(a, b){
        var a1= a[1], b1= b[1];
        return a1-b1;
    });

    return A;
}