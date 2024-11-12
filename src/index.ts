interface TableRow {
   name: string;
   age: number;
}

const dataTable = document.getElementById("dataTable") as HTMLTableElement;
const addRowButton = document.getElementById("addRow") as HTMLButtonElement;

let data: TableRow[] = [];

// Render table rows based on the `data` array
function renderTable(): void {
   const tbody = dataTable.querySelector("tbody");
   if (!tbody) return;

   tbody.innerHTML = ""; // Clear the existing rows

   data.forEach((row, index) => {
       const tr = document.createElement("tr");

       const nameTd = document.createElement("td");
       nameTd.textContent = row.name;

       const ageTd = document.createElement("td");
       ageTd.textContent = row.age.toString();

       const actionsTd = document.createElement("td");
       actionsTd.innerHTML = `
           <button onclick="editRow(${index})">Edit</button>
           <button onclick="deleteRow(${index})">Delete</button>
       `;

       tr.appendChild(nameTd);
       tr.appendChild(ageTd);
       tr.appendChild(actionsTd);
       tbody.appendChild(tr);
   });
}

// Add a new row
function addRow(): void {
   const name = prompt("Enter name:");
   const age = parseInt(prompt("Enter age:") || "0", 10);

   if (name && age) {
       data.push({ name, age });
       renderTable();
   }
}

// Edit an existing row
function editRow(index: number): void {
   const row = data[index];
   const name = prompt("Edit name:", row.name);
   const age = parseInt(prompt("Edit age:", row.age.toString()) || "0", 10);

   if (name && age) {
       data[index] = { name, age };
       renderTable();
   }
}

// Delete a row
function deleteRow(index: number): void {
   data.splice(index, 1);
   renderTable();
}

// Attach event listeners
addRowButton.addEventListener("click", addRow);

// Initial render
renderTable();
