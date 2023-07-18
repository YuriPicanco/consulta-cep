async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '' ;
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error('CEP não existe!');
        }

        var $cidade   = document.getElementById('cidade');
        $cidade.value = consultaCEPConvertida.localidade;
        
        var $logadouro = document.getElementById('endereco');
        $logadouro.value = consultaCEPConvertida.logradouro;

        var $estado = document.getElementById('estado');
        $estado.value = consultaCEPConvertida.uf;

        var $bairro = document.getElementById('bairro');
        $bairro.value = consultaCEPConvertida.bairro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`
        console.log(erro);
    }
}

const $cep = document.getElementById('cep');

$cep.addEventListener('focusout', () => buscaEndereco($cep.value));