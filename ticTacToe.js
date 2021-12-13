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
        y2: firstRow.offsetHeight/2 + secondRow.offsetHeight/2,
    },
    {
        cells: [cells[2][0], cells[2][1], cells[2][2]],
        x1: 0,
        y1: firstRow.offsetHeight + secondRow.offsetHeight + thirdRow.offsetHeight/2,
        x2: thirdRow.offsetWidth,
        y2: firstRow.offsetHeight + secondRow.offsetHeight + thirdRow.offsetHeight/2,
    },

    [cells[1][0], cells[1][1], cells[1][2]],
    [cells[2][0], cells[2][1], cells[2][2]],
    [cells[0][0], cells[1][0], cells[2][0]],
    [cells[0][1], cells[1][1], cells[2][1]],
    [cells[0][2], cells[1][2], cells[2][2]],
    [cells[0][0], cells[1][1], cells[2][2]],
    [cells[0][2], cells[1][1], cells[2][0]]
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
        if(combination[0].textContent !== ""){
            if(combination[0].textContent == combination[1].textContent && combination[0].textContent == combination[2].textContent){
                return true;
            }
        }
    }
    return false;
}