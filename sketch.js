const doors = [];
let state = "PICK";
let pickedDoor;
let revealedDoor;
let switchButton, stayButton, playAgain;
let outcomeP;

function startOver(){
  for (let door of doors){
    door.prize = '🐐';
    door.html('');
    door.style('background-color','#AAA');
  }
  const winner = random(doors);
  winner.prize = '🚂';
  playAgain.hide();
  
  outcomeP.html('');
  
}

function setup() {
  noCanvas();
  
  for(let i = 0; i < 3; i++){
    doors[i] = createDiv("");
    doors[i].parent('#doors');
    doors[i].class('door');
    doors[i].index = i;
    doors[i].mousePressed(pickDoor);   
  }
  
  switchButton = createButton("switch");
  switchButton.mousePressed(playerSwitch);
  switchButton.hide();
  
  stayButton = createButton("stay");
  stayButton.mousePressed(checkWin); 
  stayButton.hide();
  
  playAgain = createButton("play again");
  playAgain.mousePressed(startOver);
  playAgain.hide();
  
  outcomeP = createP('');
  
  startOver();
  
}

function pickDoor() {
  if(state == "PICK"){
    state = 'REVEAL';
    this.style('background-color', '#AAF');
    pickedDoor = this;
    reveal(); 
  }
}

function reveal(){
  const options = [];
  for(let i = 0; i < doors.length; i++){
    const door = doors[i];
    if(i !== pickedDoor.index && door.prize !== '🚂') {
      options.push(door);
    }
  }
    
  revealedDoor = random(options);
  revealedDoor.html(revealedDoor.prize);
  
  switchButton.show();
  stayButton.show();
  
  
}

function playerSwitch() {
  let newPick;
  for (let i = 0; i < doors.length; i++) {
    let door = doors[i];
    if (door !== pickedDoor && door !== revealedDoor){
      newPick = door;
      break;
    }
  }
  pickedDoor = newPick;
  checkWin();
}

function checkWin(){
  switchButton.hide();
  stayButton.hide();
  
   for(let door of doors){
    door.html(door.prize);
    door.style('background-color', "#AAA");
  }
  
  
  if(pickedDoor.prize == '🚂'){
    outcomeP.html("You win!");
    pickedDoor.style('background-color', "#AFA");
  }else{
   outcomeP.html("You lose!");
   pickedDoor.style('background-color', "#FAA");
  }
  
  playAgain.show();
  
}








