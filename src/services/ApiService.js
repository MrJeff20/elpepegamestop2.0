import * as api from './api';

const ApiService = {
  getAllProductos: api.getAllProductos,
  getProductoById: api.getProductoById,
  searchProductos: api.searchProductos,
  getProductosDestacados: api.getProductosDestacados,
  getProductosOferta: api.getProductosOferta,
  getProductosPorCategoria: api.getProductosPorCategoria,
  getCarrito: api.getCarrito,
  agregarAlCarrito: api.agregarAlCarrito,
  eliminarDelCarrito: api.eliminarDelCarrito,
  vaciarCarrito: api.vaciarCarrito,
  registrarUsuario: api.registrarUsuario,
  login: api.login,
  loginFormatted: api.loginFormatted,
  getUsuario: api.getUsuario,
  actualizarUsuario: api.actualizarUsuario,
  crearPedido: api.crearPedido,
  getPedidosUsuario: api.getPedidosUsuario,
  getPedidoById: api.getPedidoById
};

export default ApiService;
