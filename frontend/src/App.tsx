import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage';
import WarehousesPage from './pages/WarehousesPage';
import SuppliersPage from './pages/SuppliersPage';
import StockMovementsPage from './pages/StockMovementsPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/warehouses" element={<WarehousesPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/stock-movements" element={<StockMovementsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
