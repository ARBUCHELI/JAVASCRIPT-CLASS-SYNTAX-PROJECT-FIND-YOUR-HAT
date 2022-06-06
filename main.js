const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (field) {
    this.field = field;
  }
  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(''));
    } 
  }
  static generateField (width, height, percentage) {
    let numberOfHoles = Math.floor(width*height*(percentage/100));
    //console.log(numberOfHoles);
  
    let randomXhat = Math.floor(Math.random()*height);
    //console.log(randomXhat);
    let randomYhat = Math.floor(Math.random()*width);
    //console.log(randomYhat);
    
    const arr = [];
  
    for (let i = 0; i < height; i++) {
      arr.push([]);
      for (let j = 0; j < width; j++) {
        arr[i].push(fieldCharacter);
      }
    }
  
    let check = false
    while(!check) {
      if (randomXhat === 0 && randomYhat === 0) {
        randomXhat = Math.floor(Math.random()*height);
        randomYhat = Math.floor(Math.random()*width);
        check = true;
      } else {
          arr[randomXhat][randomYhat] = hat;
          check = true;
      }
    }
   
    for (let i = 0; i < numberOfHoles; i++) {
      let randomXhole = Math.floor(Math.random()*(arr.length));
      let randomYhole = Math.floor(Math.random()*(arr[randomXhole].length));
      if (arr[randomXhole][randomYhole] !== hat) {
        arr[randomXhole][randomYhole] = hole;
      }
    }
    arr[0][0] = pathCharacter;
    return arr;
  }
}

const campo = Field.generateField(10,10,20);

const myField = new Field(campo);


let end = false;
let i = 0;
let j = 0;

let currentLocation = myField.field[i][j];

const checkCurrentLocation = (currentLocation) => {
  if (currentLocation === hat) {
    console.log('Congrats! You found your hat!!!');
    end = true;
  } else if (currentLocation === hole) {
    console.log('Sorry, you fell in a hole');
    end = true;
  } else if (currentLocation === undefined) {
    console.log('Out of bounds instruction');
    end = true;
  }
}

const updateCurrentLocation = (direction) => {
  if ((direction === 'u' && i === 0) || (direction === 'l' && j === 0)) {
    currentLocation = undefined;
    checkCurrentLocation(currentLocation);
  } else if (direction === 'r') {
    currentLocation = myField.field[i][j+1];
    myField.field[i][j+1] = pathCharacter;
    checkCurrentLocation(currentLocation);
    j++; 
  } else if (direction === 'd') {
    currentLocation = myField.field[i+1][j];
    myField.field[i+1][j] = pathCharacter;
    checkCurrentLocation(currentLocation);
    i++;
  } else if (direction === 'l') {
    currentLocation = myField.field[i][j-1];
    myField.field[i][j-1] = pathCharacter;
    checkCurrentLocation(currentLocation);
    j--;
  } else if (direction === 'u') {
    currentLocation = myField.field[i-1][j];
    myField.field[i-1][j] = pathCharacter;
    checkCurrentLocation(currentLocation);
    i--;
  }
}

while(!end) {
  myField.print();
  let direction = prompt('Which way? ');
  updateCurrentLocation(direction);
  myField.field.currentLocation = pathCharacter;
}
