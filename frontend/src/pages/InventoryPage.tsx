/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import inventoryService, { type InventoryItem, type InventoryRequest } from '../services/inventoryService';
import productService, { type Product } from '../services/productService';
import warehouseService, { type Warehouse } from '../services/warehouseService';

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<InventoryRequest>({ productId: 0, warehouseId: 0, quantity: 0 });
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [inv, prods, whs] = await Promise.all([
        inventoryService.getAll(),
        productService.getAll(),
        warehouseService.getAll(),
      ]);
      setInventory(inv);
      setProducts(prods);
      setWarehouses(whs);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await inventoryService.createOrUpdate(form);
      setShowForm(false);
      setForm({ productId: 0, warehouseId: 0, quantity: 0 });
      fetchAll();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this inventory record?')) return;
    try { await inventoryService.delete(id); fetchAll(); } catch (err: any) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      HEALTHY: 'bg-green-500/20 text-green-400',
      LOW:     'bg-yellow-500/20 text-yellow-400',
      CRITICAL:'bg-red-500/20 text-red-400',
    };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || ''}`}>{status}</span>;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">🏭 Inventory</h1>
          <p className="text-gray-400 mt-1">{inventory.length} records total</p>
        </div>
        <button onClick={() => { setShowForm(true); setError(''); }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          + Set Inventory
        </button>
      </div>

      {error && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Set Inventory</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Product *</label>
                <select required value={form.productId} onChange={(e) => setForm({ ...form, productId: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value={0}>Select product...</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Warehouse *</label>
                <select required value={form.warehouseId} onChange={(e) => setForm({ ...form, warehouseId: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value={0}>Select warehouse...</option>
                  {warehouses.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Quantity *</label>
                <input type="number" min={0} required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-300 hover:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-800/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">SKU</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Warehouse</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Quantity</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Reorder</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {inventory.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">No inventory records</td></tr>
              ) : (
                inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{item.productName}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{item.productSku}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{item.warehouseName}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right font-semibold">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">{item.reorderLevel}</td>
                    <td className="px-6 py-4 text-center">{statusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
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

export default InventoryPage;
