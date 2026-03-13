/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { useEffect, useState } from 'react';
import warehouseService, { type Warehouse, type WarehouseRequest } from '../services/warehouseService';

const emptyForm: WarehouseRequest = { name: '', location: '', capacity: 0 };

const WarehousesPage = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<WarehouseRequest>(emptyForm);
  const [error, setError] = useState('');

  const fetchWarehouses = async () => {
    try { setWarehouses(await warehouseService.getAll()); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchWarehouses(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      if (editId) { await warehouseService.update(editId, form); }
      else { await warehouseService.create(form); }
      setShowForm(false); setEditId(null); setForm(emptyForm); fetchWarehouses();
    } catch (err: any) { setError(err.response?.data?.message || 'Operation failed'); }
  };

  const handleEdit = (w: Warehouse) => {
    setEditId(w.id); setForm({ name: w.name, location: w.location, capacity: w.capacity }); setShowForm(true); setError('');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this warehouse?')) return;
    try { await warehouseService.delete(id); fetchWarehouses(); } catch (err: any) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-white">🏢 Warehouses</h1><p className="text-gray-400 mt-1">{warehouses.length} warehouses</p></div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); setError(''); }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">+ Add Warehouse</button>
      </div>

      {error && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">{editId ? 'Edit Warehouse' : 'Add Warehouse'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Location *</label>
                <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Capacity</label>
                <input type="number" min={0} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-300 hover:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center py-8">No warehouses found</p>
        ) : (
          warehouses.map((w) => (
            <div key={w.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{w.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(w)} className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                  <button onClick={() => handleDelete(w.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">📍 {w.location}</p>
              <p className="text-gray-400 text-sm">📦 Capacity: {w.capacity}</p>
              <p className="text-gray-500 text-xs mt-3">{new Date(w.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WarehousesPage;
