//Make an player objects for dog an princess//
var dog = {
  playerType: 'dog',
  playerImage: '<img src="img/dog.png" alt="dog">',
  playerPos: {
      col: 0,
      row: 0
  },
  weapon: {
    weaponName: 'donut',
    //weaponImage: '<img src="img/donut.jpg" alt="donut">',
    weaponImage: './img/donut.jpg',
    damage: 10,

  },
  playerHealth: 100
};
var princess = {
  playerType: 'princess',
  playerImage: '<img src="img/princes.png" alt="princess">',
  playerPos: {
      col: 0,
      row: 0
  },
  weapon: {
    weaponName: 'donut',
    //weaponImage: '<img src="img/donut.jpg" alt="donut">',
    weaponImage: './img/donut.jpg',
    damage: 10,

  },
  playerHealth: 100
};
var activePlayer = dog;
var activeWeapon = activePlayer.weapon;
//Function to generate random number//
function randomRowColumnNumber(max){
  const number= Math.floor(Math.random() * max) + 1;
  return number;
};

//WEAPON Objects//
var weapon = {
  donut: {
      name: 'donut',
      power: 10,
      //image: '<img src="img/donut.jpg" alt="donut">'
      image: './img/donut.jpg'
  },
  sword: {
      name: 'sword',
      power: 20,
      //image: '<img src="img/sword.jpg" alt="sword">'
      image: './img/sword.jpg'
  },
  computer: {
      name: 'computer',
      power: 25,
      //image: '<img src="img/computer.jpg" alt="computer">'
      image: './img/computer.jpg'
  },
  wizard: {
      name: 'wizard',
      power: 25,
      //image: '<img src="img/wizard.jpg" alt="wizard">'
      image: './img/wizard.jpg'
  },
};


function placeTree(){
for(let i = 0; i < 12; i++) {
  let row = randomRowColumnNumber(9);
  let col = randomRowColumnNumber(9);
  $(`[data-col="${col}"][data-row="${row}"]`).addClass('full').css({'width': '60px', 'height': '60px', 'background-image': 'url("img/tree.jpg")'});
  //$(`[data-col="${col}"][data-row="${row}"]`).addClass('full').html('<img src="img/tree.jpg" alt="tree">').css({'width': '60px', 'height': '60px'});
}
}
// Square that we select need to tell the square what weapon it has//
function placeWeapon(weaponImage, weaponName, weaponPower){
let row = randomRowColumnNumber(9);
let col = randomRowColumnNumber(9);
let gridItem = $(`[data-col="${col}"][data-row="${row}"]`);
if( gridItem.hasClass('full') ) {
  
  return placeWeapon(weaponImage)
}

gridItem.addClass('weapon full').attr('data-name', weaponName).attr('data-power', weaponPower).attr('data-image', weaponImage).addClass(weaponName);

};
// PLAYERS //
//1.Randomly select 2 numbers form 1-9//
//2.find the square who has those two numbers//
//3.Update player position in player object//
//4.Add the picture//
function placePlayer(player){

let row = randomRowColumnNumber(9);
let col = randomRowColumnNumber(9);
let gridItem = $(`[data-col="${col}"][data-row="${row}"]`);
if( gridItem.hasClass('full') ) {
 
  return placePlayer(player);
}

gridItem.addClass('full').addClass(player.playerType);
player.playerPos.row = row;
player.playerPos.col = col;


};

//Don't let players move more than 3 squares//;
//1.Get the position of the player(store in var)//;
//2.Get position where they want to move to(store in var)//;
//3.Check if players current position is not more 3 squares where they want to move(what direction they are trying to move)//;
//4.Check each of the directions//;

function isWithinRange(playerCol, playerRow, squareCol, squareRow){
let colDifference = Math.abs(playerCol - squareCol);
let rowDifference = Math.abs(playerRow - squareRow);

if(  (colDifference <= 3 && rowDifference === 0) || (rowDifference <= 3 && colDifference === 0)  ){
  return true;
}
  return false;
}



//Weapon Check//
//1.Get players square clicked//
//2.Check if clicked square have a class of weapon//
//3.If it does switch the weapon in activePlayer object, change name and attack//;
//4.Update html//
//5.add and remove images(swap weapon images)//;

function pickUpWeapon($this){

let squareWeaponName = $this.data('name');
let squareWeaponImage = $this.data('image');
let squareWeaponPower = $this.data('power');
let weaponImage = activePlayer.weapon.weaponImage;
let weaponDamage = activePlayer.weapon.damage;
let weapon = activePlayer.weapon.weaponName;

activePlayer.weapon.weaponName = $this.data('name');
activePlayer.weapon.weaponImage = $this.data('image');
activePlayer.weapon.damage = $this.data('power');

$this.removeClass(squareWeaponName).addClass(weapon);


$this.data('name', weapon);
$this.data('image', weaponImage);
$this.data('power', weaponDamage);

$(`.${activePlayer.playerType}_weapon`).addClass(weapon);
//$(`.${activePlayer.playerType}_weaponImage`).src(weaponImage)
$(`.${activePlayer.playerType}_attack`).html(squareWeaponPower);



};

//1. If payers current square has weapon in data-image//
//2.Then replace image in the div when player moves out of the square//
// function dropOldWeapon(playerCol, playerRow){
//   let currentSquare = $(`[data-col="${playerCol}"][data-row="${playerRow}"]`).data('data-image');

//   console.log(currentSquare);
//   if(currentSquare){
//     return currentSquare;
//   } else {
//     return false;
//   }
      
// }


//Player Movements working with activePlayer//
//1.click on square to move//
//2.Update player object col and row//
//3.remove playerImage from old square//
//4.image appears on new square//

function movePlayer($this){
let playerCol = activePlayer.playerPos.col;
let playerRow = activePlayer.playerPos.row;
let squareCol = $this.attr('data-col');
let squareRow = $this.attr('data-row');
let inRightRange = isWithinRange(playerCol, playerRow, squareCol, squareRow);



if(inRightRange){
  
  // let oldWeapon = dropOldWeapon(playerCol, playerRow);
  // if(oldWeapon){
  //   $(`[data-col="${playerCol}"][data-row="${playerRow}"]`).html(activePlayer.weaponImage).removeClass('full');
  // };
  if($this.hasClass('weapon')){
    pickUpWeapon($this);
    
  }
  
  $(`[data-col="${playerCol}"][data-row="${playerRow}"]`).removeClass(activePlayer.playerType).removeClass('full');
  activePlayer.playerPos.row = squareRow;
  activePlayer.playerPos.col = squareCol;
  $(`[data-col="${squareCol}"][data-row="${squareRow}"]`).addClass(activePlayer.playerType).addClass('full');

} else{
  console.log('You can not move more than 3 squares');
}

};




$('.grid-item').on('click', function(){
let $this = $(this);
//console.log('square clicked', $(this), this );
movePlayer($this);

});
















placeTree();
placeWeapon(weapon.donut.image, weapon.donut.name, weapon.donut.power);
placeWeapon(weapon.wizard.image, weapon.wizard.name, weapon.wizard.power);
placeWeapon(weapon.computer.image, weapon.computer.name, weapon.computer.power);
placeWeapon(weapon.sword.image, weapon.sword.name, weapon.sword.power);
placePlayer(dog);
placePlayer(princess);


//   //current position//
//  $(`[data-col="${playerCol}"][data-row="${playerRow}"]`);

//   //North//
//   let north_1 = Number(playerRow) - 1;
//   let north_2 = Number(playerRow) - 2;
//   let north_3 = Number(playerRow) - 3;
//   //South//
//   let south_1 = Number(playerRow) + 1; 
// 	let south_2 = Number(playerRow) + 2;
//   let south_3 = Number(playerRow) + 3;
//   //East//
//   let east_1 = Number(playerCol) + 1; 
// 	let east_2 = Number(playerCol) + 2;
//   let east_3 = Number(playerCol) + 3;
//   //West//
//   let west_1 = Number(playerCol) - 1; 
// 	let west_2 = Number(playerCol) - 2;
//   let west_3 = Number(playerCol) - 3;

