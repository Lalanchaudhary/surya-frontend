import React, { useEffect, useState } from 'react';
import { getAllAddons, createAddon, updateAddon, deleteAddon } from '../../services/adminService';

const Addons = () => {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', image: '', price: '', tag: '' });
  const [editId, setEditId] = useState(null);
  const [touched, setTouched] = useState({});

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
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Validation
  const validate = () => {
    const errors = {};
    if (!form.name) errors.name = 'Name is required';
    if (!form.image) errors.image = 'Image URL is required';
    if (!form.price) errors.price = 'Price is required';
    else if (isNaN(form.price) || Number(form.price) <= 0) errors.price = 'Price must be a positive number';
    return errors;
  };
  const errors = validate();
  const isFormValid = Object.keys(errors).length === 0;

  // Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, image: true, price: true });
    if (!isFormValid) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (editId) {
        await updateAddon(editId, form);
        setSuccess('Addon updated successfully!');
      } else {
        await createAddon(form);
        setSuccess('Addon added successfully!');
      }
      setForm({ name: '', image: '', price: '', tag: '' });
      setEditId(null);
      fetchAddons();
    } catch (err) {
      setError(err.message || 'Failed to save addon');
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  // Handle edit
  const handleEdit = (addon) => {
    setForm({ name: addon.name, image: addon.image, price: addon.price, tag: addon.tag });
    setEditId(addon._id);
    setTouched({});
    setSuccess('');
    setError('');
  };

  // Handle cancel
  const handleCancel = () => {
    setEditId(null);
    setForm({ name: '', image: '', price: '', tag: '' });
    setTouched({});
    setSuccess('');
    setError('');
  };

  // Handle delete
  const handleDeleteAddon = async (id) => {
    if (!window.confirm('Delete this addon?')) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await deleteAddon(id);
      fetchAddons();
      setSuccess('Addon deleted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to delete addon');
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Addons Products</h2>
      {/* Form Card */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, marginBottom: 32 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontWeight: 500 }}>Name<span style={{ color: 'red' }}>*</span></label>
              <input
                name="name"
                placeholder="Addon Name"
                value={form.name}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: errors.name && touched.name ? '1px solid red' : '1px solid #ccc', marginTop: 4 }}
              />
              {errors.name && touched.name && <div style={{ color: 'red', fontSize: 12 }}>{errors.name}</div>}
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontWeight: 500 }}>Image URL<span style={{ color: 'red' }}>*</span></label>
              <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: errors.image && touched.image ? '1px solid red' : '1px solid #ccc', marginTop: 4 }}
              />
              {errors.image && touched.image && <div style={{ color: 'red', fontSize: 12 }}>{errors.image}</div>}
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ fontWeight: 500 }}>Price<span style={{ color: 'red' }}>*</span></label>
              <input
                name="price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: errors.price && touched.price ? '1px solid red' : '1px solid #ccc', marginTop: 4 }}
              />
              {errors.price && touched.price && <div style={{ color: 'red', fontSize: 12 }}>{errors.price}</div>}
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ fontWeight: 500 }}>Tag</label>
              <input
                name="tag"
                placeholder="Tag (optional)"
                value={form.tag}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }}
              />
            </div>
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <button
              type="submit"
              disabled={loading || !isFormValid}
              style={{
                background: editId ? '#2563eb' : '#059669',
                color: '#fff',
                padding: '10px 24px',
                border: 'none',
                borderRadius: 4,
                fontWeight: 600,
                fontSize: 16,
                cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
                opacity: loading || !isFormValid ? 0.7 : 1
              }}
            >
              {editId ? 'Update Addon' : 'Add Addon'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  background: '#f3f4f6',
                  color: '#111',
                  padding: '10px 24px',
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  marginLeft: 8
                }}
              >
                Cancel
              </button>
            )}
          </div>
          {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: 12 }}>{success}</div>}
        </form>
      </div>
      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
          <thead style={{ background: '#f3f4f6' }}>
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
                <td><img src={addon.image} alt={addon.name} style={{ width: 50, borderRadius: 4 }} /></td>
                <td>{addon.price}</td>
                <td>{addon.tag}</td>
                <td>
                  <button onClick={() => handleEdit(addon)} style={{ marginRight: 8, background: '#fbbf24', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteAddon(addon._id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }}>Delete</button>
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