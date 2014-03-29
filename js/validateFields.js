/* Código responsável por validar os campos */


$(document).ready(function(){
		validateFields();
});

function validateFields(){
	/* Utiliza o plugin jQuery Validate para validação dos campos */

        $('#playersForm').validate({
        	/* Regras de validação */
            rules:{
                jogadorA:{
                    required: true,
                    minlength: 2
                },
                jogadorB: {
                    required: true,
                    minlength: 2,
                    notEqual: "#jogadorA"
                }
            },

            /* Mensagens de erro para validação */
            messages:{
                jogadorA:{
                    required: "O nome do Jogador A é obrigatorio.",
                    minlength: "O nome deve conter no mínimo 2 caracteres."
                },
                jogadorB: {
                    required: "O nome do Jogador B é obrigatorio.",
                    minlength: "O nome deve conter no mínimo 2 caracteres.",
                    notEqual: "Os nomes dos jogadores não podem ser iguais."
                }
            } 
        });
}