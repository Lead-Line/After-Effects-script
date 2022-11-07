//Read and change comp name

var file = new File();
var check = 0;

//UI
var mainWindow = new Window('palette', 'File Reader', undefined);
mainWindow.orientation = 'column';

var groupOne = mainWindow.add('group', undefined, 'groupOne');
groupOne.orientation = 'row';
var fileLocBox = groupOne.add('edittext', undefined, 'Esperando endereço...');
fileLocBox.size = [200, 20];
var getFileButton = groupOne.add('button', undefined, 'Procurar...');
getFileButton.helpTip = 'Selecione um documento txt: ';

var groupTwo = mainWindow.add('group', undefined, 'groupTwo');
groupTwo.orientation = 'row';
var applyButton = groupTwo.add('button', undefined, 'aplicar!');

mainWindow.center();
mainWindow.show();

getFileButton.onClick = function () {
  file = file.openDlg('Selecione um arquivo por favor!', '*txt');
  fileLocBox.text = file.fsName;
  check = 1;
};

applyButton.onClick = function () {
  if (check === 0) {
    alert('Selecione um arquivo de texto!');
    return false;
  } else {
    var priceData = priceReader();
    var productData = productReader();

    changeComp(priceData, productData);
  }
};

function priceReader() {
  var currentLine;
  var txtArray = [];

  file.open('r');
  while (!file.eof) {
    currentLine = file.readln();
    var txtArray = currentLine.split('	');
  }
  file.close();

  var priceArray = [
    txtArray[0],
    txtArray[1],
    txtArray[2],
    txtArray[3],
    txtArray[4],
    txtArray[5],
    txtArray[6],
    txtArray[7],
    txtArray[8],
  ];

  return priceArray;
}

function productReader() {
  var currentLine;
  var txtArray = [];

  file.open('r');
  while (!file.eof) {
    currentLine = file.readln();
    var txtArray = currentLine.split('	');
  }
  file.close();

  var productArray = [
    txtArray[9],
    txtArray[10],
    txtArray[11],
    txtArray[12],
    txtArray[13],
    txtArray[14],
    txtArray[15],
    txtArray[16],
    txtArray[17],
  ];

  return productArray;
}

function changeComp(pricedata, productData) {
  var projectNumItens = app.project.numItems;
  var compLayer = app.project;
  var compstring = 'V_ITEM_';

  for (i = 1; i <= projectNumItens; i++) {
    for (j = 1; j < 10; j++) {
      if (app.project.item(i).name == compstring + j) {
        alert(compstring + j);
        compLayer.item(i).layer(1).name = pricedata[j - 1];
        compLayer.item(i).layer(2).name = productData[j - 1];
      }
    }
  }

  alert('done');
}
