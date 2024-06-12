
const rows = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'];
let status = 'initial';
let rowIterator, colIterator;
let currentRow, currentCol;
const click1 = document.addEventListener('click', clickHandler);


function clickHandler() {
    if (status === 'initial') {
        status = 'row-wise'
        navigateRow('down');
    } else if (status === 'row-wise') {
        status = 'column-wise'
        clearInterval(rowIterator);
        navigateColumn();
    } else {
        keyPressHandler();
    }
}

function navigateRow(direction = 'down') {
    if (direction === 'down') {
        rowIterator = window.setInterval(() => {
            let index = rows.indexOf(currentRow);
            if (currentRow) {
                clearRow(rows[index]);
                selectRow(rows[(index + 1) % 6]);
                currentRow = rows[(index + 1) % 6];
            } else {
                selectRow(rows[0]);
                currentRow = rows[0];
            }
        }, 1000);
    } else {
        rowIterator = window.setInterval(() => {
            let index = rows.indexOf(currentRow);
            clearRow(rows[index]);
            selectRow(rows[index === 0 ? 5 : index - 1]);
            currentRow = rows[index === 0 ? 5 : index - 1];
        }, 1000);
    }
}

function selectRow(row) {
    document.getElementById(row).style.backgroundColor = '#03a9f4';
}

function clearRow(row) {
    document.getElementById(row).style.backgroundColor = 'inherit';
}

function navigateColumn() {
    const col = document.getElementById(currentRow).children;
    let index = 0;
    colIterator = window.setInterval(() => {
        if (currentCol) {
            clearCol(col[index]);
            index = (index + 1) % 13;
            selectCol(col[index]);
            currentCol = col[index];
        } else {
            selectCol(col[index]);
            currentCol = col[index];
        }
    }, 900);
}

function selectCol(key) {
    key.style.backgroundColor = '#2e7d32';
}

function clearCol(key) {
    key.style.backgroundColor = '#263238';
}


function keyPressHandler() {
    let display = document.getElementById('textarea');
    let cursor = display.focus();
    if (currentCol.classList.contains('character')) {
        display.value += currentCol.textContent;
    } else if (currentCol.classList.contains('space')) {
        display.value += ' ';
    } else if (currentCol.classList.contains('backspace')) {
        let x = display.value;
        display.value = x.substring(0, x.length - 1);
    } else if (currentCol.classList.contains('enter')) {
        display.value += '\n';
    } else if (currentCol.classList.contains('up')) {
        status = 'row-wise';
        clearCol(currentCol);
        clearInterval(colIterator);
        navigateRow('up');
    } else if (currentCol.classList.contains('down')) {
        status = 'row-wise';
        clearCol(currentCol);
        clearInterval(colIterator);
        navigateRow();
    } else if (currentCol.classList.contains('case')) {
        currentCol.classList.remove('capslock');
        let caseCheck = document.getElementById('a2').firstChild.textContent;
        let caseValue = caseCheck.charCodeAt();
        if (caseValue <= 90) {
            for (let i = 0; i < 4; i++) {
                for (j = 1; j < 8; j++) {
                    singleKey = document.getElementById(rows[i]).children[j];
                    if (singleKey.classList.contains('character')) {
                        let lowerCasekeyText = singleKey.textContent.toLowerCase();
                        singleKey.textContent = lowerCasekeyText; 
                    }
                }
            }
        } else {
            currentCol.classList.add('capslock');
            for (let i = 0; i < 4; i++) {
                for (j = 1; j < 8; j++) {
                    singleKey = document.getElementById(rows[i]).children[j];
                    if (singleKey.classList.contains('character')) {
                        let upperCasekeyText = singleKey.textContent.toUpperCase();
                        singleKey.textContent = upperCasekeyText;
                    }
                }
            }
        }
    }
}




