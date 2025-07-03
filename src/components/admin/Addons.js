import React, { useEffect, useState } from 'react';
import { getAllAddons, createAddon, updateAddon, deleteAddon } from '../../services/adminService';

const Addons = () => {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', image: '', price: '', tag: '' });
  const [editId, setEditId] = useState(null);

  // Fetch all addons
  const fetchAddons = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllAddons();
      setAddons(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch addons');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editId) {
        await updateAddon(editId, form);
      } else {
        await createAddon(form);
      }
      setForm({ name: '', image: '', price: '', tag: '' });
      setEditId(null);
      fetchAddons();
    } catch (err) {
      setError(err.message || 'Failed to save addon');
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (addon) => {
    setForm({ name: addon.name, image: addon.image, price: addon.price, tag: addon.tag });
    setEditId(addon._id);
  };

  // Handle delete
  const handleDeleteAddon = async (id) => {
    if (!window.confirm('Delete this addon?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteAddon(id);
      fetchAddons();
    } catch (err) {
      setError(err.message || 'Failed to delete addon');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Addons Products</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="tag"
          placeholder="Tag"
          value={form.tag}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {editId ? 'Update' : 'Add'} Addon
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ name: '', image: '', price: '', tag: '' }); }}>
            Cancel
          </button>
        )}
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addons.map((addon) => (
              <tr key={addon._id}>
                <td>{addon.name}</td>
                <td><img src={addon.image} alt={addon.name} style={{ width: 50 }} /></td>
                <td>{addon.price}</td>
                <td>{addon.tag}</td>
                <td>
                  <button onClick={() => handleEdit(addon)}>Edit</button>
                  <button onClick={() => handleDeleteAddon(addon._id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Addons; 