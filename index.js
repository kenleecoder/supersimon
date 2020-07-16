//----Getting Panels----
const topLeft = document.querySlector('.top-left-panel');
const topRight = document.querySlector('.top-right-panel');
const bottomLeft = document.querySlector('.bottom-left-panel');
const bottomRight = document.querySlector('.bottom-left-panel');


//----Getting a Random Panel----
const getRandomPanel = () => {
  const panels = [
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
]//this is an array
  return panels[parseInt(Math.random() * panels.length)];
  //this gets the length of th panels (4:0,1,2,3), pick a
  //random index and parse it to get randomness
};


//----Sequencing-----
const sequence = [
  getRandomPanel(),
  // getRandomPanel(),
  // getRandomPanel(),
  // getRandomPanel(),
 ];
 //in this one, it's randomized but still 4 times
 //commented em out bc working on click back functionality

// const sequence = [topLeft, bottomRight, bottomLeft, topRight];
//^this is how I had it at first to check if it'll work in this order
//added a randomizer/extension element above
let sequenceToGuess = [...sequence]; //makes it a clone of sequence,
//keeps track of what we need to get


//----Flashing----
const flash = (panel) => {
  return new Promise (resolve => {
    panel.className += 'active'; //this turns it white
    setTimeout (() => {
      panel.className = panel.className.replace('active', '');
      setTimeout(() => { //this second one was added so there's still a space if a color shows up twice
      resolve();
      }, 250);
    }, 1000); //1000 is fancy script for 1 sec
  });
};
//^this is a promise. It's asynchronous and resolves after some time
//here it's used to wrap the timer, but it can be used for other stuff too
//it makes it flash for a bit, then wait, and then another



//----Clicking----
let canClick = false;
//this prevents from clicking, until sequence is done

const panelClicked = panelClicked => {
  if (!canClick) return; //english: if can click is false then return
  // console.log(panel); //this allowed for panels to be clicked before stuff below was added
  const expectedPanel = sequenceToGuess.shift(); //this gives the seq back to us
  if (expectedPanel === panelClicked) {
    if (sequenceToGuess.length === 0) {
      //start new round
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      startFlashing();
    }
  } else {
    //end game
    alert('game over');
  }
};



//----Flashing----
const startFlashing = async () => {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel); //"await" makes sure they're not all flashin at the same time
  }
  canClick = true;
}
// const main = async () => {
//   startFlashing();
//   // for (const panel of sequence) {
//   //   await flash(panel); //"await" makes sure they're not all flashin at the same time
//   // }
//   // canClick = true;
//   //(moved this section into startFlashing command above)
// };

// main();
//(n took the whole main out)
startFlashing();
