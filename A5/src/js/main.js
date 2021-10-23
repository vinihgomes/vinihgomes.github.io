////////////////////////       Validação do CEP     ////////////////////////////
const Masks = {
  cep(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  },
};

document.querySelectorAll('input').forEach(($input) => {
  const field = $input.dataset.js;
  $input.addEventListener(
    'input',
    (e) => {
      e.target.value = Masks[field](e.target.value);
    },
    false
  );
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////     JSON            //////////////////////////////////
let link = 'viacep.com.br/ws/';
const archive = '/json/';
ceplink = link + document.querySelector('input').value + archive;
