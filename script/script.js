
//Make an player objects for dog an princess//
var dog = {
    playerType: "dog",
    playerImage: '<img src="./img/dog.png" alt="dog">',
    playerPos: {
		col: 0,
		row: 0
    },
    weapon: '',
    playerHealth: 100
};

var princess = {
    playerType: "princess",
    playerImage: '<img src="./img/princes.png" alt="princess">',
    playerPos: {
		col: 0,
		row: 0
    },
    weapon: '',
    playerHealth: 100
};

var activePlayer = dog;


//Function to generate random number//

function randomRowColumnNumber(colrow){
    const number= Math.floor(Math.random() * colrow);
    return number;
};



//OBSTICLE//
var tree = '<img src="./img/tree.jpg" alt="tree">';

//WEAPON Objects//
var weapon = {
    donut: {
        name: 'donut',
        power: 10,
        image: '<img src="./img/donut.jpg" alt="donut">'
    },
    sword: {
        name: 'sword',
        power: 20,
        image: '<img src="./img/sword.jpg" alt="sword">'
    },
    computer: {
        name: 'computer',
        power: 25,
        image: '<img src="./img/computer.jpg" alt="computer">'
    },
    wizard: {
        name: 'wizard',
        power: 25,
        image: '<img src="./img/wizard.jpg" alt="wizard">'
    },

   
};



function selectRandomGridItem(){
   return $('.grid-item').eq(randomRowColumnNumber(81));
}

function placeTree(){
    for(let i=0;i<10;i++){
        $(selectRandomGridItem()).addClass('full').html(tree);
    }
}

//Square that we select need to tell the square what weapon it has//
function placeWeapon(){
    $(selectRandomGridItem()).addClass('full donut').html(weapon.donut.image);
    $(selectRandomGridItem()).addClass('full sword').html(weapon.sword.image);
    $(selectRandomGridItem()).addClass('full computer').html(weapon.computer.image);
    $(selectRandomGridItem()).addClass('full wizard').html(weapon.wizard.image);
};



// PLAYERS //
//1.Randomly select 2 numbers form 1-9//
//2.find the square who has those two numbers//
//3.Update player position in player object//
//4.Add the picture//


function placePlayers(player){
    

    var column = randomRowColumnNumber(9);
    var row = randomRowColumnNumber(9);
    var $selectedSquare = $(`[data-col="${column}"][data-row="${row}"]`);
    console.log($selectedSquare);

   
    if($selectedSquare.hasClass('full')){
            console.log('inside first if statement');
            // column = randomRowColumnNumber(9);
            // row = randomRowColumnNumber(9);
            // $selectedSquare = $(`[data-col="${column}"][data-row="${row}"]`);
            return placePlayers(player);
        } 
        console.log('after');
        player.playerPos.col = column;
        player.playerPos.row = row;
        $selectedSquare.html(player.playerImage);  
     

    // player.playerPos.col = column;
    // player.playerPos.row = row;
    // selectedSquare.html(player.playerImage);

}


placePlayers(dog);
placePlayers(princess);
placeTree();
placeWeapon();