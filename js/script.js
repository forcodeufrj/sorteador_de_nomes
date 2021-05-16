let input_names = document.getElementById('names');
let input_quant = document.getElementById('quant');
let shower_p = document.getElementById('debug');

function btnPress(quant = 1) {
  quant = parseInt(input_quant.value);
  updateDebug(getNames(quant));
}

function getNames(quant) {
  let selected_names = [];
  let names_string = input_names.value;
  let names = names_string.split(',');

  while (selected_names.length < quant) {
    let min = 0;
    let max = names.length;

    let n = parseInt(Math.random() * (max - min) + min);
    selected_names.push(names[n]);
    names.splice(n, 1);
  }

  return selected_names;
}

function updateDebug(info) {
  debug.innerHTML = `> ${info} <`;
}