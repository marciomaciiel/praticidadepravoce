$("#search_button").click(function(event) {
  event.preventDefault();


    $.ajax({
      url: '/validateCep/' + $("#cep").val(),
      method: 'get',
      dataType: 'json',
      success: function (retorno) {

        if(retorno.erro == true){
          
          alert( "CEP Inválido" );
          
        }else{

          $("#rua").val(retorno.logradouro);
          $("#bairro").val(retorno.bairro);
          $("#estado").val(retorno.uf);
          $("#cidade").val(retorno.localidade);

        }
      }

    })

  });