let error = $(".error-text");
let table = $("table");

export function showError(errorText) {
    error.text(errorText);
    error.css({
        display: "block"
    });
}

export function hideError() {
    error.css({
        display: "none"
    });
}

export function fillTable(data) {
    data.forEach((value, index) => {
        addNewRow(value);
    });
}

export function addNewRow(data) {
    let newRow = `
        <tr>
            <td>${data.xVal}</td>
            <td>${data.yVal}</td>
            <td>${data.rVal}</td>
            <td>${data.currentTime}</td>
            <td>${data.executionTime}</td>
            <td>${data.isHit}</td>
        </tr>
    `;
    table.append(newRow);
}

export function clearTable() {
    let newRow = `
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Время попытки</th>
            <th>Длительность</th>
            <th>Попадание</th>
        </tr>
    `;

    table.empty();
    table.append(newRow);
}
