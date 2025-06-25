// Fetch and display all clients
async function loadClients() {
  const res = await fetch('http://localhost:3001/api/clients');
  const clients = await res.json();

  const tableBody = document.querySelector('#clientTable tbody');
  tableBody.innerHTML = ''; // Clear table before repopulating

  clients.forEach(client => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${client.id}</td>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>${client.company}</td>
      <td>
        <button onclick="editClient(${client.id})">Edit</button>
        <button onclick="deleteClient(${client.id})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Delete client
async function deleteClient(id) {
  await fetch(`http://localhost:3001/api/clients/${id}`, {
    method: 'DELETE'
  });
  loadClients(); // Refresh table
}
