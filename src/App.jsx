import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'; 
import Cart from './components/Cart';

/**
 * Конфигурация приложения с использованием React Router. В данном случае мы создаем компонент App, который будет содержать все другие компоненты приложения.
 * Внутри App мы используем Router, который позволяет нам управлять маршрутизацией. Мы также используем Routes и Route для определения маршрутов и компонентов, которые должны отображаться в зависимости от текущего маршрута.
 */

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;