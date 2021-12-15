const cells = [];
let numberOfMoves = 0;
const gameboard = document.getElementById("gameboard")
document.getElementById("reset").addEventListener("click", reset, false);
for (const row of gameboard.getElementsByClassName("row")) {
    const rowArray = [];
    for (const cell of row.getElementsByClassName("cell")) {
        cell.addEventListener("click", onclick, false);
        rowArray.push(cell);
    }
    cells.push(rowArray)
}
const firstRow = gameboard.getElementsByClassName("row")[0];
const secondRow = gameboard.getElementsByClassName("row")[1];
const thirdRow = gameboard.getElementsByClassName("row")[2];

function reset(){
    numberOfMoves = 0;
    for(const cell of gameboard.getElementsByClassName("cell")){
        cell.textContent = "";
        cell.addEventListener("click", onclick, false);
    }
    document.getElementById("result").textContent = "";
    document.getElementById("threeInARow").setAttribute("width", "0");
    document.getElementById("threeInARow").setAttribute("height", "0");
    document.getElementById("line").setAttribute("x1", "0");
    document.getElementById("line").setAttribute("x2","0");
    document.getElementById("line").setAttribute("y1", "0");
    document.getElementById("line").setAttribute("y2", "0");
}

const winningCombinations = [
    {
        cells: [cells[0][0], cells[0][1], cells[0][2]],
        x1: 0,
        y1: firstRow.offsetHeight/2,
        x2: firstRow.offsetWidth,
        y2: firstRow.offsetHeight/2,
    },
    {
        cells: [cells[1][0], cells[1][1], cells[1][2]],
        x1: 0,
        y1: firstRow.offsetHeight + secondRow.offsetHeight/2,
        x2: secondRow.offsetWidth,
        y2: firstRow.offsetHeight + secondRow.offsetHeight/2
    },
    {
        cells: [cells[2][0], cells[2][1], cells[2][2]],
        x1: 0,
        y1: firstRow.offsetHeight + secondRow.offsetHeight + thirdRow.offsetHeight/2,
        x2: thirdRow.offsetWidth,
        y2: firstRow.offsetHeight + secondRow.offsetHeight + thirdRow.offsetHeight/2
    },
    {
        cells: [cells[0][0], cells[1][0], cells[2][0]],
        x1: cells[0][0].offsetWidth/2,
        y1: 0,
        x2: cells[0][0].offsetWidth/2,
        y2: gameboard.offsetHeight
    },
    {
        cells: [cells[0][1], cells[1][1], cells[2][1]],
        x1: cells[0][0].offsetWidth + cells[0][1].offsetWidth/2,
        y1: 0,
        x2: cells[0][0].offsetWidth + cells[0][1].offsetWidth/2,
        y2: gameboard.offsetHeight
    },
    {
        cells: [cells[0][2], cells[1][2], cells[2][2]],
        x1: cells[0][0].offsetWidth + cells[0][1].offsetWidth + cells[0][2].offsetWidth/2,
        y1: 0,
        x2: cells[0][0].offsetWidth + cells[0][1].offsetWidth + cells[0][2].offsetWidth/2,
        y2: gameboard.offsetHeight
    },
    {
        cells: [cells[0][0], cells[1][1], cells[2][2]],
        x1: 0,
        y1: 0,
        x2: gameboard.offsetWidth,
        y2: gameboard.offsetHeight
    },
    {
        cells: [cells[2][0], cells[1][1], cells[0][2]],
        x1: 0,
        y1: gameboard.offsetHeight,
        x2: gameboard.offsetWidth,
        y2: 0
    }
]
function onclick(){
    this.removeEventListener("click", onclick, false);
    numberOfMoves++;
    let player = "X";
    if(numberOfMoves % 2 === 0){
        player = "O";
    }
    this.textContent = player;
    const winner = checkForWin();
    if(winner){
        document.getElementById("result").textContent = "Player " + player + " won."
        document.getElementById("threeInARow").setAttribute("width", gameboard.offsetWidth.toString());
        document.getElementById("threeInARow").setAttribute("height", gameboard.offsetHeight.toString());
        document.getElementById("line").setAttribute("x1", winner.x1);
        document.getElementById("line").setAttribute("x2", winner.x2);
        document.getElementById("line").setAttribute("y1", winner.y1);
        document.getElementById("line").setAttribute("y2", winner.y2);
        for(const cell of gameboard.getElementsByClassName("cell")){
            if(cell.textContent == ""){
                cell.removeEventListener("click", onclick, false);
            }
        }
    } else if(numberOfMoves == 9){
        document.getElementById("result").textContent = "Tie Game"
    }
}
function checkForWin() {
    for(const combination of winningCombinations){
        if(combination.cells[0].textContent !== ""){
            if(combination.cells[0].textContent == combination.cells[1].textContent && combination.cells[0].textContent == combination.cells[2].textContent){
                return combination;
            }
        }
    }
    return false;
}