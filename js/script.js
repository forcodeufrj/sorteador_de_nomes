let input_names = document.getElementById('names');
let input_quant = document.getElementById('quant');
let shower_p = document.getElementById('debug');
let messageScene = document.getElementById('message');
let messageWindow = document.getElementById('message-window');
let messageText = document.querySelector('#message-window p');

const delay = ms => new Promise(res => setTimeout(res, ms));

let names_string = input_names.value;
let names = names_string.split(',');

convertNamesToArray();

function btnPress() {
  
  if (verifyQuantInput()) {
    console.log(input_quant.value)
    if (input_names.value.replace(/ /g, "").length > 1) {
      openMessage(`Valor inválido! Informe um número de ${1} a ${names.length}`);
      return;
    }
    else {
      openMessage(`Informe pelo menos 1 nome.`);
      return;
    }
  };

  let quant = parseInt(input_quant.value);
  updateDebug(getNames(quant));
}

function verifyQuantInput() {
  convertNamesToArray();

  if (parseInt(input_quant.value) > names.length || 
      parseInt(input_quant.value) < 1 || 
      !input_quant.value ||
    input_names.value.replace(/ /g, "").length < 1) {
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
  names = names_string.trim().split(',');
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

async function openMessage(mess) {
  messageScene.style.setProperty('display', 'grid');
  messageScene.style.setProperty('visibility', 'visible');
  messageWindow.style.setProperty('transform', 'scale(1, 1)');
  messageScene.style.setProperty('opacity', '1');
  messageText.innerHTML = mess;
}

async function closeMessage() {
  messageWindow.style.setProperty('transform', '');
  messageScene.style.setProperty('opacity', '');
  await delay(180);
  messageScene.style.setProperty('display', '');
  messageScene.style.setProperty('visibility', '');
}