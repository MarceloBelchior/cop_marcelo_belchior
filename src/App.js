import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', id: null });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    if (form.id) {
      await axios.put(`${API_URL}/${form.id}`, { name: form.name, email: form.email });
    } else {
      await axios.post(API_URL, { name: form.name, email: form.email });
    }

    setForm({ name: '', email: '', id: null });
    loadUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    loadUsers();
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>User Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{form.id ? 'Update' : 'Add'} User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            <b>{user.name}</b> ({user.email})
            <button onClick={() => handleEdit({ ...user, id: user._id })}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
