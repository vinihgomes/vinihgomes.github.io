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
function buscauf() {
  cep = cep.value.replace(/\D/g, '');
  url = 'http://viacep.com.br/ws/' + cep + '/json';

  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      uf = data.uf;
      return buscaCovid(data.uf);
    });
}
function buscaCovid(uf) {
  url = 'https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/' + uf;
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      return insereDados(
        data.uf,
        data.state,
        data.cases,
        data.deaths,
        data.suspects
      );
    });
}

function insereDados(uf, state, cases, deaths, suspects) {
  container = document.querySelector('#data-table tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = insertData(uf, state, cases, deaths, suspects);
  container.appendChild(tr);

  function insertData(unf, estado, casos, mortes, suspeitos) {
    const html = `
      <td>${uf}</td>
      <td>${state}</td>
      <td>${cases}</td>
      <td>${deaths}</td>
      <td>${suspects}</td>
      `;
    return html;
  }
}
