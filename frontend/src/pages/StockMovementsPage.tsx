/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import stockMovementService, { type StockMovement, type StockMovementRequest, type MovementType } from '../services/stockMovementService';
import productService, { type Product } from '../services/productService';
import warehouseService, { type Warehouse } from '../services/warehouseService';

const StockMovementsPage = () => {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<StockMovementRequest>({
    productId: 0, warehouseId: 0, movementType: 'INBOUND', quantity: 1, reference: '',
  });
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  const fetchAll = async () => {
    try {
      const [m, p, w] = await Promise.all([
        stockMovementService.getAll(),
        productService.getAll(),
        warehouseService.getAll(),
      ]);
      setMovements(m);
      setProducts(p);
      setWarehouses(w);
    } catch { /* empty */ } finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      await stockMovementService.record(form);
      setShowForm(false);
      setForm({ productId: 0, warehouseId: 0, movementType: 'INBOUND', quantity: 1, reference: '' });
      fetchAll();
    } catch (err: any) { setError(err.response?.data?.message || 'Operation failed'); }
  };

  const handleFilter = async (type: string) => {
    setFilterType(type);
    try {
      if (type === 'ALL') { setMovements(await stockMovementService.getAll()); }
      else { setMovements(await stockMovementService.getByType(type as MovementType)); }
    } catch { /* empty */ }
  };

  const typeBadge = (type: string) => {
    const styles: Record<string, string> = {
      INBOUND:  'bg-green-500/20 text-green-400',
      OUTBOUND: 'bg-red-500/20 text-red-400',
      TRANSFER: 'bg-blue-500/20 text-blue-400',
    };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[type] || ''}`}>{type}</span>;
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-white">📋 Stock Movements</h1><p className="text-gray-400 mt-1">{movements.length} movements</p></div>
        <button onClick={() => { setShowForm(true); setError(''); }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">+ Record Movement</button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {['ALL', 'INBOUND', 'OUTBOUND', 'TRANSFER'].map((t) => (
          <button key={t} onClick={() => handleFilter(t)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              filterType === t ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {error && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Record Stock Movement</h2>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Type *</label>
                  <select value={form.movementType} onChange={(e) => setForm({ ...form, movementType: e.target.value as MovementType })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="INBOUND">Inbound</option>
                    <option value="OUTBOUND">Outbound</option>
                    <option value="TRANSFER">Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Quantity *</label>
                  <input type="number" min={1} required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Reference</label>
                <input type="text" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. PO-2024-001" />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-300 hover:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">Record</button>
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
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Warehouse</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Type</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Quantity</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {movements.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">No movements found</td></tr>
              ) : (
                [...movements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((m) => (
                  <tr key={m.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-300">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{m.productName}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{m.warehouseName}</td>
                    <td className="px-6 py-4 text-center">{typeBadge(m.movementType)}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-white">
                      {m.movementType === 'INBOUND' ? '+' : '-'}{m.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{m.reference || '-'}</td>
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

export default StockMovementsPage;
