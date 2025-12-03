import axios from 'axios';

// Configuración de la URL base del backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Crear instancia de axios con configuración por defecto
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para agregar token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== PRODUCTOS ====================

/**
 * Obtener todos los productos con filtros opcionales
 */
export const getAllProductos = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.categoria) params.append('categoria', filters.categoria);
    if (filters.plataforma) params.append('plataforma', filters.plataforma);
    if (filters.destacado !== undefined) params.append('destacado', filters.destacado);
    if (filters.enOferta !== undefined) params.append('enOferta', filters.enOferta);
    
    const response = await api.get(`/productos?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw error;
  }
};

/**
 * Buscar productos por nombre o descripción
 */
export const searchProductos = async (query) => {
  try {
    const response = await api.get(`/productos/buscar?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar productos:', error);
    throw error;
  }
};

/**
 * Obtener productos destacados
 */
export const getProductosDestacados = async () => {
  try {
    const response = await api.get('/productos/destacados');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    throw error;
  }
};

/**
 * Obtener productos en oferta
 */
export const getProductosOferta = async () => {
  try {
    const response = await api.get('/productos/ofertas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos en oferta:', error);
    throw error;
  }
};

/**
 * Obtener productos por categoría
 */
export const getProductosPorCategoria = async (categoria) => {
  try {
    const response = await api.get(`/productos/categoria/${categoria}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener productos de la categoría ${categoria}:`, error);
    throw error;
  }
};

// ==================== CARRITO ====================

/**
 * Obtener el carrito de un usuario
 */
export const getCarrito = async (usuarioId) => {
  try {
    const response = await api.get(`/carrito/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener carrito del usuario ${usuarioId}:`, error);
    throw error;
  }
};

/**
 * Agregar un producto al carrito
 */
export const agregarAlCarrito = async (usuarioId, productoId, cantidad = 1) => {
  try {
    const response = await api.post(
      `/carrito/${usuarioId}/agregar?productoId=${productoId}&cantidad=${cantidad}`
    );
    return response.data;
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    throw error;
  }
};

/**
 * Eliminar un producto del carrito
 */
export const eliminarDelCarrito = async (usuarioId, productoId) => {
  try {
    const response = await api.delete(`/carrito/${usuarioId}/eliminar/${productoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    throw error;
  }
};

/**
 * Vaciar todo el carrito
 */
export const vaciarCarrito = async (usuarioId) => {
  try {
    const response = await api.delete(`/carrito/${usuarioId}/vaciar`);
    return response.data;
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    throw error;
  }
};

// ==================== USUARIOS ====================

/**
 * Registrar un nuevo usuario
 */
export const registrarUsuario = async (usuarioData) => {
  try {
    const response = await api.post('/usuarios/registro', usuarioData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

/**
 * Login de usuario
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/usuarios/login', credentials);
    if (response.data.authToken) {
      localStorage.setItem('authToken', response.data.authToken);
      localStorage.setItem('userId', response.data.id);
    }
    return response.data;
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

/**
 * Login de usuario con formato específico
 */
export const loginFormatted = async (credentials) => {
  try {
    const response = await api.post('/usuarios/login/formatted', credentials);
    if (response.data.authToken) {
      localStorage.setItem('authToken', response.data.authToken);
      localStorage.setItem('userId', response.data.usuario?.id);
    }
    return response.data;
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

/**
 * Obtener información de un usuario
 */
export const getUsuario = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Actualizar información de un usuario
 */
export const actualizarUsuario = async (id, usuarioData) => {
  try {
    const response = await api.put(`/usuarios/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error);
    throw error;
  }
};

// ==================== PEDIDOS ====================

/**
 * Crear un nuevo pedido
 */
export const crearPedido = async (pedidoData) => {
  try {
    const response = await api.post('/pedidos', pedidoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};

/**
 * Obtener los pedidos de un usuario
 */
export const getPedidosUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/pedidos/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pedidos del usuario ${usuarioId}:`, error);
    throw error;
  }
};

/**
 * Obtener detalles de un pedido
 */
export const getPedidoById = async (pedidoId) => {
  try {
    const response = await api.get(`/pedidos/${pedidoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pedido ${pedidoId}:`, error);
    throw error;
  }
};

export default api;
