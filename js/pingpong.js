/* Código responsável por manipular a lógica do jogo */

//Mapeamento de teclas pressionadas pelo usuário
var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

//Variável para armazenar informações do jogo
var pingpong = {}

//Array para armazenar as teclas pressionadas
pingpong.pressedKeys = [];

//Pontuação dos jogadores
pingpong.pontuacao = {
	nomeJA: "",
	nomeJB: ""
}

//Informações sobre a bola, como velocidade, direção, posição
pingpong.ball = {
	speed: 5,
	x: 150,
	y: 100,
	directionX: 1,
	directionY: 1
}

pingpong.paddle = {
	speed: 5
}


$(function(){

	pingpong.pontuacao.nomeJA = GetURLParameter("jogadorA");
	pingpong.pontuacao.nomeJB = GetURLParameter("jogadorB");

	$(".jogadorA").html(pingpong.pontuacao.nomeJA);
	$(".jogadorB").html(pingpong.pontuacao.nomeJB);


	//define um intervalo para chamar o gameloop a cada 30 milissegundos
	pingpong.timer = setInterval(gameloop, 30);

	//Armazena no array se a tecla foi pressionada/liberada
	$(document).keydown(function(event) {
		pingpong.pressedKeys[event.which] = true;
	});
	$(document).keyup(function(event) {
		pingpong.pressedKeys[event.which] = false;
	});

});


//game loop
function gameloop(){
	movePaddles();
	moveBall();
}


//funcao responsavel por mover as barras
function movePaddles(){

	//Sobe barra esquerda
	if (pingpong.pressedKeys[KEY.UP]) {
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top - pingpong.paddle.speed);

	}
	//Desce barra esquerda
	if (pingpong.pressedKeys[KEY.DOWN]) {

		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top + pingpong.paddle.speed);

	}
	//Sobe barra direita
	if (pingpong.pressedKeys[KEY.W]) {

		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top - pingpong.paddle.speed);

	}
	//Desce barra direita
	if (pingpong.pressedKeys[KEY.S]) {

		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top + pingpong.paddle.speed);

	}

}

//funcao responsavel por mover a bola e detectar colisÃ£o
function moveBall(){
	//variaveis de referencia de uso geral
	var playgroundWidth = parseInt($("#playground").css("width"));
	var playgroundHeight = parseInt($("#playground").css("height"));
	var ball = pingpong.ball;

	//Verifica os limites do background


	//parte de baixo
	if (ball.y + ball.speed*ball.directionY > playgroundHeight) {

		ball.directionY = -1;
	}

	//parte de cima
	if (ball.y + ball.speed*ball.directionY < 0){
		ball.directionY = 1;
	}

	//borda direita
	if (ball.x +ball.speed*ball.directionX > playgroundWidth)
	{
		// ponto jogador A
		gameOver(pingpong.pontuacao.nomeJA);
		return;
	}

	//borda esquerda
	if (ball.x + ball.speed*ball.directionX < 0)
	{
		// ponto para o jogador B
		gameOver(pingpong.pontuacao.nomeJB);
		return;
	}

	//Movimenta a bola
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	//VERIFICACAO DE COLISAO COM AS BARRAS
	colisionPaddleA();
	colisionPaddleB();	
	
	//mover a bola 
	$("#ball").css({
		"left": ball.x ,
		"top": ball.y
	});
}

function colisionPaddleA(){

	//verificar colisão com barra esquerda

	var ball = pingpong.ball;
	var ballHeight = parseInt($("#ball").css("height"));

	var barraELateral = parseInt($("#paddleA").css("left")) + 
				parseInt($("#paddleA").css("width"));
	var barraEInferior  = parseInt($("#paddleA").css("top"))  +
				parseInt($("#paddleA").css("height"));
	var barraESuperior  = parseInt($("#paddleA").css("top"));


	if ((ball.x + ball.speed*ball.directionX == barraELateral) &&
		((ball.y + ballHeight >= barraESuperior)) && ((ball.y <= barraEInferior))
		){
		//houve colisao  com a lateral da barra esquerda
		ball.directionX = 1;
	}else { 

		if((ball.x + ball.speed*ball.directionX <= barraELateral) &&
			(ball.x + ball.speed*ball.directionX >= barraELateral - 40))
		{

			if((ball.y + ballHeight > barraESuperior) &&
			   (ball.y + ballHeight < barraESuperior + 30))
			{
				 //colisao com a parte de cima da barra esquerda
				 ball.directionX = 1;
				 ball.directionY = -1;

			} else if((ball.y <= barraEInferior) && (ball.y  
					>= (barraEInferior - 10)))
			{
				//colisao com a parte de baixo da barra esquerda
				ball.directionX = 1;
				ball.directionY = 1;
			}
		}
	} 
}

function colisionPaddleB(){
	//verificar colisão com barra direita


	var ball = pingpong.ball;
	var ballHeight = parseInt($("#ball").css("height"));
	var ballWidth = parseInt($("#ball").css("width"));

	var barraDLateral = parseInt($("#paddleB").css("left"));
	var barraDInferior  = parseInt($("#paddleB").css("top"))  +
				parseInt($("#paddleA").css("height"));
	var barraDSuperior  = parseInt($("#paddleB").css("top"));

	if (((ball.x + ballWidth) == barraDLateral) && 
	   ((ball.y + ballHeight >= barraDSuperior) && (ball.y <= barraDInferior)) ) {
		//colisao com a lateral com a barra direita
		ball.directionX = -1;
	} else {
		if((ball.x + ballWidth >= barraDLateral) &&
			(ball.x + ballWidth <= barraDLateral + 30))
		{
			if((ball.y + ballHeight >= barraDSuperior) &&
				(ball.y + ballHeight <= barraDSuperior + 10))
			{
				//colisao com a parte de cima da barra direita
				ball.directionX = -1;
				ball.directionY = -1;

			} else if((ball.y  <= barraDInferior) &&
					  (ball.y  >= barraDSuperior - 10))
			{
				//colisao com a parte de baixo da barra direita
				ball.directionX = -1;
				ball.directionY = 1;
			}
		}
	}	
}

/* Função chamada quando o jogo termina. Aumenta a pontuação do jogador que ganhou. */
function gameOver(winner){

	if(localStorage.getItem(winner) != null){
		/* Jogador já está cadastrado no placar. Sua pontuação é aumentada em 1 ponto */
		var updateScore = parseInt(localStorage.getItem(winner)) + 1;
		localStorage.setItem(winner, updateScore);
	}else{
		/* Jogador ainda não está cadastrado no placar. Ele é cadastrado com pontuação 1 */
		localStorage.setItem(winner, 1);
	}

	/* Parar o jogo */
	clearInterval(pingpong.timer);

	/* Redireciona para a página do placar */
	window.location.href = "scoreboard.html";
}

/* Função auxiliar para pegar os parâmetros da URL */
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}