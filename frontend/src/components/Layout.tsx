import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { path: '/', label: '📊 Dashboard' },
  { path: '/products', label: '📦 Products' },
  { path: '/inventory', label: '🏭 Inventory' },
  { path: '/warehouses', label: '🏢 Warehouses' },
  { path: '/suppliers', label: '🤝 Suppliers' },
  { path: '/stock-movements', label: '📋 Movements' },
];

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">
            📦 Smart Inventory
          </h1>
          <p className="text-sm text-gray-400 mt-1">Management System</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
