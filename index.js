/*
------------------------------------------------
| 2024-02-10                                   | tHead
------------------------------------------------
| Exercise | Load | Sets | Reps | Rest | Notes | tHead
------------------------------------------------
| Squat    | 135  | 5    | 5    | 3    | brace | tBody
| Bench    | 135  | 5    | 5    | 3    | note2 |
------------------------------------------------
|                    +                         | tFoot
------------------------------------------------

2024-02-10
Exercise,Load,Sets,Reps,Rest,Notes
Squat,135,5,5,3,brace
Bench,135,5,5,3,note2


End col:
| Action |
| x |  = |
| x |  = |
*/

// logs are tables
let log = document.getElementById("2024-01-08");
let logBody = log.children[1];

let delRowBtns = document.getElementsByClassName("delRowBtn");
let swpRowBtns = document.getElementsByClassName("swpRowBtn");
let mUpRowBtns = document.getElementsByClassName("mUpRowBtn");
let mDoRowBtns = document.getElementsByClassName("mDoRowBtn");
let addRowBtn = document.getElementsByClassName("addRowBtn")[0];

let toSwp = [];

// set callbacks for buttons
for (let i = 0; i < delRowBtns.length; i++) {
    let delRowBtn = delRowBtns[i];
    let swpRowBtn = swpRowBtns[i];
    let mUpRowBtn = mUpRowBtns[i];
    let mDoRowBtn = mDoRowBtns[i];
    delRowBtn.onclick = () => delRowCallback(delRowBtn);
    swpRowBtn.onclick = () => swpRowCallback(swpRowBtn);
    mUpRowBtn.onclick = () => mUpRowCallback(mUpRowBtn);
    mDoRowBtn.onclick = () => mDoRowCallback(mDoRowBtn);
}

addRowBtn.onclick = () => addRowCallback(logBody);

function addRowCallback(body) {
    let newRow = body.insertRow();

    newRow.innerHTML = `
    <td contentEditable=true>&nbsp;</td>
					<td contentEditable=true>&nbsp;</td>
					<td contentEditable=true>&nbsp;</td>
					<td contentEditable=true>&nbsp;</td>
					<td contentEditable=true>&nbsp;</td>
					<td contentEditable=true>&nbsp;</td>
					<td class="hasBtn"><button class="mUpRowBtn">🠕</button></td>
					<td class="hasBtn"><button class="mDoRowBtn">🠗</button></td>
					<td class="hasBtn"><button class="delRowBtn">-</button></td>
					<td class="hasBtn"><button class="swpRowBtn">⇅</button></td>

`;



    let i = newRow.rowIndex - 2;
    let delRowBtn = delRowBtns[i];
    let swpRowBtn = swpRowBtns[i];
    let mUpRowBtn = mUpRowBtns[i];
    let mDoRowBtn = mDoRowBtns[i];
    delRowBtn.onclick = () => delRowCallback(delRowBtn);
    swpRowBtn.onclick = () => swpRowCallback(swpRowBtn);
    mUpRowBtn.onclick = () => mUpRowCallback(mUpRowBtn);
    mDoRowBtn.onclick = () => mDoRowCallback(mDoRowBtn);
}


function delRowCallback(btn) {
    // rowIndex is for table, -2 (from rows in thead) to get index in tbody
    // rowIndex is updated automatically and delRowBtns is live HTMLCollection
    let swpBtn = btn.parentElement.parentElement.cells[btn.parentElement.cellIndex+1].children[0];
    if (elementInArray(toSwp, swpBtn)) {
        toSwp.pop();
    }
    delRow(logBody, btn.parentElement.parentElement.rowIndex - 2);
}

// void delRow
// body: a logBody
// index: index of row in body
function delRow(body, index) {
    body.deleteRow(index);
}

function elementInArray(arr, el) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == el) {
            return true;
        }
    }
    return false;
}

function swpRowCallback(btn) {
    //console.log(btn);
    if (elementInArray(toSwp, btn)) {
        btn.style.backgroundColor = "";
        toSwp.pop();
        return;
    }

    toSwp.push(btn);
    btn.style.backgroundColor = "rgb(255, 0, 0, 0.5)";
    if (toSwp.length == 2) {
        // button->td->tr
        toSwp[0].style.backgroundColor = "";
        toSwp[1].style.backgroundColor = "";
        let r1Index = toSwp[0].parentElement.parentElement.rowIndex-2;
        let r2Index = toSwp[1].parentElement.parentElement.rowIndex-2;
        swpRow(logBody, r1Index, r2Index);
        // swp is done using innerHTML; this loses any onclick we attach
        // using JS
        toSwp = [];
    }
}

// void swpRow
// body: a logBody
// index1: index of row in body
// index2: index of row in body
function swpRow(body, index1, index2) {
    let tmp = body.rows[index1].innerHTML;
    let cellCount = body.rows[index1].cells.length;
    body.rows[index1].innerHTML = body.rows[index2].innerHTML;
    body.rows[index2].innerHTML = tmp;

    let swpBtn1 = body.rows[index1].cells[cellCount-1].children[0];
    let swpBtn2 = body.rows[index2].cells[cellCount-1].children[0];
    swpBtn1.onclick = () => swpRowCallback(swpBtn1);
    swpBtn2.onclick = () => swpRowCallback(swpBtn2);

    let delBtn1 = body.rows[index1].cells[cellCount-2].children[0];
    let delBtn2 = body.rows[index2].cells[cellCount-2].children[0];
    delBtn1.onclick = () => delRowCallback(delBtn1);
    delBtn2.onclick = () => delRowCallback(delBtn2);

    let mDoBtn1 = body.rows[index1].cells[cellCount-3].children[0];
    let mDoBtn2 = body.rows[index2].cells[cellCount-3].children[0];
    mDoBtn1.onclick = () => mDoRowCallback(mDoBtn1);
    mDoBtn2.onclick = () => mDoRowCallback(mDoBtn2);

    let mUpBtn1 = body.rows[index1].cells[cellCount-4].children[0];
    let mUpBtn2 = body.rows[index2].cells[cellCount-4].children[0];
    mUpBtn1.onclick = () => mUpRowCallback(mUpBtn1);
    mUpBtn2.onclick = () => mUpRowCallback(mUpBtn2);
}

function mUpRowCallback(btn) {
    mUpRow(logBody, btn.parentElement.parentElement.rowIndex - 2);
}

function mUpRow(body, index) {
    if (index == 0) {
        return;
    }
    swpRow(body, index, index-1);
}

function mDoRowCallback(btn) {
    mDoRow(logBody, btn.parentElement.parentElement.rowIndex - 2);
}

function mDoRow(body, index) {
    if (index == body.rows.length - 1) {
        return;
    }
    swpRow(body, index, index+1);
}













/*
logToCSV: return string for CSV
log: html table conforming to 1 log
return: string
*/
function logToCSV(log) {
    let out = ``;
    for (let i = 0; i < log.rows.length-1; i++) {
        let r = log.rows[i];
        let j = 0
        for (j = 0; j < r.cells.length && j < 6; j++) {
            let c = r.cells[j];
            if (c.innerText.trim() == "") { // reduce whitespace-only cells to ""
                out += ',';
                continue;
            } 
            // check for , " \n
            let specialChars = [...c.innerText.matchAll(/[",\n]/g)];
            if (specialChars.length > 0) {
                out += `"${c.innerText.replaceAll(/"/g,`""`)}"`;
            } else {
                out += c.innerText.trim();
            }
            if (j < r.cells.length-1) {
                out += ',';
            }
        }
        while (j < 6) { // align tHead to only take up 1 cell
            out += ',';
            j++;
        }
        out += '\n';
    }
    return out;
}

/*
download: initiates download of data
data: data to download
mime: "text/csv" as an example
https://javascript.info/blob#blob-as-url
*/
function download(data, mime="text/csv", fileName="log.csv") {
    let link = document.createElement('a');
    link.download = fileName;

    let blob = new Blob([data], {type: mime});

    link.href = URL.createObjectURL(blob);

    link.click();

    URL.revokeObjectURL(link.href);
}
/*
let dlOneBtn = document.getElementById("dlOneBtn");
dlOneBtn.onclick = () => download(logToCSV(logCollection[0]));
*/

/*
downloadAllLogs: initiate download of all data to CSV file
*/

function downloadAllLogs() {
    let out = ``;
    for (let log of logCollection) {
        out += logToCSV(log);
    }
    download(out, "text/csv", "all_logs.csv");
}
/*
let dlAllBtn = document.getElementById("dlAllBtn");
dlAllBtn.onclick = () => downloadAllLogs();
*/

