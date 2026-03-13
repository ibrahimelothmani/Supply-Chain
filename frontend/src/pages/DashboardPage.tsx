import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService, { type Product } from '../services/productService';
import inventoryService, { type InventoryItem } from '../services/inventoryService';
import warehouseService, { type Warehouse } from '../services/warehouseService';
import supplierService, { type Supplier } from '../services/supplierService';
import stockMovementService, { type StockMovement } from '../services/stockMovementService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, i, w, s, m] = await Promise.all([
          productService.getAll(),
          inventoryService.getAll(),
          warehouseService.getAll(),
          supplierService.getAll(),
          stockMovementService.getAll(),
        ]);
        setProducts(p);
        setInventory(i);
        setWarehouses(w);
        setSuppliers(s);
        setMovements(m);
      } catch {
        // silently fail — data just won't show
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const lowStockItems = inventory.filter((i) => i.status === 'LOW' || i.status === 'CRITICAL');
  const recentMovements = [...movements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      label: 'Products',
      value: products.length,
      icon: '📦',
      color: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/products'),
    },
    {
      label: 'Warehouses',
      value: warehouses.length,
      icon: '🏢',
      color: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/warehouses'),
    },
    {
      label: 'Suppliers',
      value: suppliers.length,
      icon: '🤝',
      color: 'from-emerald-500 to-emerald-600',
      onClick: () => navigate('/suppliers'),
    },
    {
      label: 'Low Stock Alerts',
      value: lowStockItems.length,
      icon: '⚠️',
      color: lowStockItems.length > 0 ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600',
      onClick: () => navigate('/inventory'),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">📊 Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of your inventory system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-left`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm opacity-80 mt-1">{stat.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">⚠️ Low Stock Alerts</h2>
          {lowStockItems.length === 0 ? (
            <p className="text-gray-400 text-sm">All stock levels are healthy!</p>
          ) : (
            <div className="space-y-3">
              {lowStockItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{item.productName}</p>
                    <p className="text-xs text-gray-400">
                      {item.warehouseName} • SKU: {item.productSku}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {item.quantity} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Movements */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📋 Recent Stock Movements</h2>
          {recentMovements.length === 0 ? (
            <p className="text-gray-400 text-sm">No movements recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMovements.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{m.productName}</p>
                    <p className="text-xs text-gray-400">
                      {m.warehouseName} • {new Date(m.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      m.movementType === 'INBOUND'
                        ? 'bg-green-500/20 text-green-400'
                        : m.movementType === 'OUTBOUND'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {m.movementType === 'INBOUND' ? '+' : '-'}{m.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
