const apiUrl = 'https://orange-lamp-q76jj9v749qpc696w-3001.app.github.dev/api/clients';

const form = document.getElementById('clientForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const companyInput = document.getElementById('company');
const cancelBtn = document.getElementById('cancelBtn');
const clientTableBody = document.querySelector('#clientTable tbody');
const searchInput = document.getElementById('searchInput');

let editingId = null;

// Fetch and display all clients
async function fetchClients() {
  const res = await fetch(apiUrl);
  const clients = await res.json();
  clientTableBody.innerHTML = '';

  const searchText = searchInput.value.toLowerCase(); // Get what's typed in search box

  clients
    .filter(client =>
      client.name.toLowerCase().includes(searchText) ||
      client.email.toLowerCase().includes(searchText) ||
      client.company.toLowerCase().includes(searchText)
    )
    .forEach(client => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${client.id}</td>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.company}</td>
        <td>
          <button onclick="editClient(${client.id}, '${client.name}', '${client.email}', '${client.phone}', '${client.company}')">Edit</button>
          <button onclick="deleteClient(${client.id})">Delete</button>
        </td>
      `;

      clientTableBody.appendChild(row);
    });
}

// Add or Update client
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const clientData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    company: companyInput.value
  };

  try {
    if (editingId) {
      // UPDATE existing client
      await fetch(`${apiUrl}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
    } else {
      // CREATE new client
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
    }

    form.reset();
    editingId = null;
    fetchClients();
  } catch (error) {
    console.error('Error saving client:', error);
  }
});

// Edit client (pre-fill form)
function editClient(id, name, email, phone, company) {
  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;
  companyInput.value = company;
  editingId = id;
}

// Delete client
async function deleteClient(id) {
  if (confirm('Are you sure you want to delete this client?')) {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  }
}

// Cancel button resets form
cancelBtn.addEventListener('click', () => {
  form.reset();
  editingId = null;
});

// Initial load
fetchClients();

searchInput.addEventListener('input', fetchClients);

