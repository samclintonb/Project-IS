// Fetch and display all clients
async function loadClients() {
  const res = await fetch('http://localhost:3001/api/clients');
  const clients = await res.json();

  const list = document.getElementById('client-list');
  list.innerHTML = ''; // Clear before repopulating

  clients.forEach(client => {
    const item = document.createElement('li');
    item.textContent = `${client.name} (${client.email})`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      await fetch(`http://localhost:3001/api/clients/${client.id}`, {
        method: 'DELETE'
      });
      loadClients(); // Refresh list
    };

    item.appendChild(delBtn);
    list.appendChild(item);
  });
}