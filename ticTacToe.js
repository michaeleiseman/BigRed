const cells = [];
for (const row of document.getElementsByClassName("container")[0].getElementsByClassName("row")) {
    const rowArray = [];
    for (const cell of row.getElementsByClassName("cell")) {
        cell.addEventListener("click", onclick, false);
        rowArray.push(cell);
    }
    cells.push(rowArray)
}