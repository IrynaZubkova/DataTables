function DataTable(config, data) {
    const parentElement = document.querySelector(config.parent);
    if (!parentElement) return; // Exit function if element is not found

    // Create main table elements
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create header row
    const headerRow = document.createElement('tr');

    // Add column headers from configuration
    config.columns.forEach((col, index) => {
        const th = document.createElement('th');
        th.textContent = col.title;
        const arrowSpan = document.createElement('span');
        arrowSpan.innerHTML = ' &#x25B2;'; // Up and down arrow
        th.appendChild(arrowSpan);
        th.addEventListener('click', () => {
            sortTable(index);
        });
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Add data to the table
    data.forEach((item) => {
        const row = document.createElement('tr');

        // Add data cells
        config.columns.forEach(col => {
            const cell = document.createElement('td');
            cell.textContent = item[col.value];
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    // Assemble the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Insert the table into the parent element
    parentElement.innerHTML = ''; // Clear previous content
    parentElement.appendChild(table);

    // Table sorting function
    function sortTable(colIndex) {
        data.sort((a, b) => {
            const keyA = a[config.columns[colIndex].value];
            const keyB = b[config.columns[colIndex].value];
            if (typeof keyA === 'string') {
                return keyA.localeCompare(keyB); // Sort alphabetically
            }
            return keyA - keyB; // Sort numerically
        });
        DataTable(config, data);
    }


}


const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ]
};

const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
];



// const config2 = {
//     parent: '#productsTable',
//     columns: [
//         {title: 'Назва продукту', value: 'productName'},
//         {title: 'Ціна', value: 'price'},
//         {title: 'Категорія', value: 'category'},
//         {title: 'Доступність', value: 'available'},
//     ]
// };
//
// const products = [
//     {id: 1001, productName: 'Ноутбук', price: 1200, category: 'Електроніка', available: true},
//     {id: 1002, productName: 'Смартфон', price: 800, category: 'Електроніка', available: false},
//     {id: 1003, productName: 'Книга', price: 20, category: 'Книги', available: true},
//     {id: 1004, productName: 'Футболка', price: 30, category: 'Одяг', available: true},
// ];
//
DataTable(config1, users);
// DataTable(config2, products);

// var tabledata = [
//     {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
//     {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
// ];
//
// var table = new Tabulator("#usersTable", {
//     height: 200, // встановіть висоту таблиці (може бути будь-яке допустиме значення CSS)
//     data: tabledata,
//     layout: "fitColumns", // автоматично відповідайте розміру стовпців ширини таблиці
//     columns: [
//         {title: 'Ім’я', field: 'name'},
//         {title: 'Прізвище', field: 'surname'},
//         {title: 'Вік', field: 'age'},
//     ],
// });
