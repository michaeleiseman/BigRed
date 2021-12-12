const cells = [];
let numberOfMoves = 0;
for (const row of document.getElementsByClassName("container")[0].getElementsByClassName("row")) {
    const rowArray = [];
    for (const cell of row.getElementsByClassName("cell")) {
        cell.addEventListener("click", onclick, false);
        rowArray.push(cell);
    }
    cells.push(rowArray)
}
const winningCombinations = [
    [cells[0][0], cells[0][1], cells[0][2]], 
    [cells[1][0], cells[1][1], cells[1][2]],
    [cells[2][0], cells[2][1], cells[2][2]],
    [cells[0][0], cells[1][0], cells[2][0]],
    [cells[0][1], cells[1][1], cells[2][1]],
    [cells[0][2], cells[1][2], cells[2][2]],
    [cells[0][0], cells[1][1], cells[2][2]],
    [cells[0][2], cells[1][1], cells[2][0]]
]
function onclick(){
    numberOfMoves++;
    let player = "X";
    if(numberOfMoves % 2 === 0){
        player = "O";
    }
    this.textContent = player;
    const winner = checkForWin();
    if(winner){

    } else if(numberOfMoves == 9){
        
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