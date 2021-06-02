let input_names = document.getElementById('names');
let input_quant = document.getElementById('quant');
let shower_p = document.getElementById('debug');

let names_string = input_names.value;
let names = names_string.split(',');

convertNamesToArray();

function btnPress() {
  
  if (verifyQuantInput()) {
    return;
  };

  let quant = parseInt(input_quant.value);
  updateDebug(getNames(quant));
}

function verifyQuantInput() {
  convertNamesToArray();

  if(parseInt(input_quant.value) > names.length || parseInt(input_quant.value) < 1 || !input_quant.value) {
    $(function () {
      $("#dialog").dialog({
        title: "Erro!"
      });
    });
    $(function () {
      $("#dialog").text(`Valor inválido. Informe um número entre 1 e ${names.length}`);
    });
    return true;
  }

  return false;
}

function updateQuantRangeLimits() {
  convertNamesToArray();

  input_quant.setAttribute("min", 1);
  input_quant.setAttribute("max", names.length);
}

function convertNamesToArray() {
  names_string = input_names.value;
  names = names_string.replace(/ /g, "").split(',');
}

function getNames(quant) {
  let selected_names = [];
  
  convertNamesToArray();

  while (selected_names.length < quant) {
    let min = 0;
    let max = names.length;

    let n = parseInt(Math.random() * (max - min) + min);
    selected_names.push(names[n]);
    names.splice(n, 1);
  }

  return selected_names.join(", ");
}

function updateDebug(info) {
debug.innerHTML = `> ${info} <`;
}