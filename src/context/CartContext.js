import React, { createContext, useContext, useState, useEffect } from 'react';
import * as apiService from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener el usuario actual (puedes implementar autenticación más adelante)
  const getUserId = () => {
    return localStorage.getItem('userId') || 'guest';
  };

  // Cargar el carrito desde el backend al iniciar
  useEffect(() => {
    const loadCart = async () => {
      const userId = getUserId();
      if (userId && userId !== 'guest') {
        try {
          setLoading(true);
          const carritoData = await apiService.getCarrito(userId);
          // Adaptar la estructura del carrito del backend al formato local
          if (carritoData && carritoData.items) {
            setCartItems(carritoData.items);
          }
        } catch (err) {
          console.error('Error al cargar el carrito:', err);
          // Si falla, usar carrito local
        } finally {
          setLoading(false);
        }
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const userId = getUserId();
    
    // Actualizar estado local inmediatamente para mejor UX
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // Si hay usuario autenticado, sincronizar con el backend
    if (userId && userId !== 'guest') {
      try {
        await apiService.agregarAlCarrito(userId, product.id, 1);
      } catch (err) {
        console.error('Error al agregar al carrito en el backend:', err);
        setError('Error al agregar al carrito');
      }
    }
  };

  const removeFromCart = async (productId) => {
    const userId = getUserId();

    // Actualizar estado local
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));

    // Sincronizar con backend si hay usuario autenticado
    if (userId && userId !== 'guest') {
      try {
        await apiService.eliminarDelCarrito(userId, productId);
      } catch (err) {
        console.error('Error al eliminar del carrito en el backend:', err);
        setError('Error al eliminar del carrito');
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const userId = getUserId();
    
    // Actualizar estado local
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    // Sincronizar con backend
    if (userId && userId !== 'guest') {
      try {
        // Primero eliminar el producto actual
        await apiService.eliminarDelCarrito(userId, productId);
        // Luego agregarlo con la nueva cantidad
        await apiService.agregarAlCarrito(userId, productId, quantity);
      } catch (err) {
        console.error('Error al actualizar cantidad en el backend:', err);
        setError('Error al actualizar cantidad');
      }
    }
  };

  const clearCart = async () => {
    const userId = getUserId();
    
    // Actualizar estado local
    setCartItems([]);

    // Sincronizar con backend
    if (userId && userId !== 'guest') {
      try {
        await apiService.vaciarCarrito(userId);
      } catch (err) {
        console.error('Error al vaciar carrito en el backend:', err);
        setError('Error al vaciar carrito');
      }
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.precio.replace('$', '').replace('.', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    showCart,
    setShowCart,
    toggleCart,
    loading,
    error
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
