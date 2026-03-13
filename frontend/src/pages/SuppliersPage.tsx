/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import supplierService, { type Supplier, type SupplierRequest } from '../services/supplierService';

const emptyForm: SupplierRequest = { name: '', email: '', phone: '', address: '' };

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<SupplierRequest>(emptyForm);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSuppliers = async () => {
    try { setSuppliers(await supplierService.getAll()); } catch { /* empty */ } finally { setLoading(false); }
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      if (editId) { await supplierService.update(editId, form); }
      else { await supplierService.create(form); }
      setShowForm(false); setEditId(null); setForm(emptyForm); fetchSuppliers();
    } catch (err: any) { setError(err.response?.data?.message || 'Operation failed'); }
  };

  const handleEdit = (s: Supplier) => {
    setEditId(s.id); setForm({ name: s.name, email: s.email, phone: s.phone, address: s.address }); setShowForm(true); setError('');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this supplier?')) return;
    try { await supplierService.delete(id); fetchSuppliers(); } catch (err: any) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) { fetchSuppliers(); return; }
    try { setSuppliers(await supplierService.search(searchTerm)); } catch {}
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-white">🤝 Suppliers</h1><p className="text-gray-400 mt-1">{suppliers.length} suppliers</p></div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); setError(''); }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">+ Add Supplier</button>
      </div>

      <div className="flex gap-3">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search suppliers..." />
        <button onClick={handleSearch} className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Search</button>
      </div>

      {error && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">{editId ? 'Edit Supplier' : 'Add Supplier'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Phone</label>
                  <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Address</label>
                  <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
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

      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-800/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Phone</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Address</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {suppliers.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No suppliers found</td></tr>
              ) : (
                suppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{s.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{s.email || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{s.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{s.address || '-'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(s)} className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                      <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuppliersPage;
