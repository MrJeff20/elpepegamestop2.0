# ElPepe Gamestop - React Application

## Overview
ElPepe Gamestop es una aplicación web moderna de comercio electrónico para productos gaming, desarrollada con React y Bootstrap. Presenta un diseño oscuro elegante con gradientes vibrantes, animaciones suaves y navegación completa entre categorías de productos.

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 19.2.0
- **UI Library**: React Bootstrap 2.10.10
- **CSS Framework**: Bootstrap 5.3.8
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Routing**: React Router DOM 7.1.3
- **Icons**: Font Awesome 6 (via CDN)
- **Styling**: CSS personalizado con variables CSS y gradientes

### Project Structure
```
/src
  /components
    - CategoryPage.js - Página de categoría de productos
    - Home.js - Componente de página principal
  /data
    - products.json - Base de datos de productos en JSON
  /styles
    - CategoryPage.css - Estilos para páginas de categoría
  /assets/img - Imágenes de productos
  - App.js - Componente principal con rutas
  - App.css - Estilos globales de la aplicación
  - index.js - Punto de entrada
  - index.css - Estilos base
/public
  - index.html - Template HTML con Font Awesome
```

## Features Implementadas

### Sistema de Navegación
- **React Router DOM**: Navegación entre páginas sin recarga
- **Rutas dinámicas**: 
  - `/` - Página principal
  - `/perifericos/teclados` - Teclados gaming
  - `/perifericos/mouse` - Mouse gaming
  - `/perifericos/audifonos` - Audífonos gaming
  - `/perifericos/volantes` - Volantes de carreras
  - `/perifericos/controles` - Controles de consola

### Base de Datos de Productos (JSON)
- **15 productos** distribuidos en 5 categorías
- Estructura por producto:
  - ID único
  - Nombre
  - Precio
  - Imagen (desde Unsplash)
  - Descripción
  - Disponibilidad (true/false)
  - Categoría (Premium, Pro, Gaming, etc.)

### Diseño Visual
- **Paleta de Colores**: Esquema oscuro (#0f0f0f, #1a1a1a) con acentos de gradiente morado-azul
- **Navbar**: Navegación fija con efectos de scroll, degradados y animaciones hover
- **Hero Carousel**: Carrusel de imágenes a pantalla completa con overlays y CTAs animados
- **Product Cards**: Tarjetas de productos con efectos hover, badges y botones de compra
- **Páginas de Categoría**: 
  - Hero section con gradiente morado
  - Botón "Volver al Inicio" funcional
  - Grid de productos responsive
  - Badges de disponibilidad y categoría
  - Imágenes de alta calidad
  - Estados de producto agotado
- **Info Section**: Beneficios del servicio con iconos animados
- **Footer**: Completo con enlaces, redes sociales y contacto

### Mejoras de Contraste
- **Subtítulos**: Color blanco con 90% opacidad para mejor legibilidad
- **Etiquetas de categoría**: Color optimizado con font-weight 500
- **Títulos informativos**: Color #f8f9fa para contraste perfecto
- **Textos del footer**: Mejorado contraste en descripciones y contacto
- **Consistencia visual**: Todos los textos legibles sobre fondos oscuros

### Características Técnicas
- **Responsive Design**: Totalmente adaptativo con breakpoints para móvil, tablet y desktop
- **Animaciones CSS**: Transiciones suaves y efectos hover en todos los elementos
- **Scrollbar Personalizada**: Estilo personalizado con gradiente
- **Smooth Scroll**: Navegación fluida entre secciones
- **Icon Integration**: Font Awesome para todos los iconos
- **Component-Based**: Arquitectura modular con componentes reutilizables

## Development Setup

### Configuración del Entorno
- **Host**: 0.0.0.0 (compatibilidad con Replit)
- **Port**: 5000
- **Host Check**: Deshabilitado (requerido para proxy iframe de Replit)

### Variables de Entorno (npm start)
```bash
PORT=5000
HOST=0.0.0.0
DANGEROUSLY_DISABLE_HOST_CHECK=true
WDS_SOCKET_PORT=0
```

### Workflows
- **Server**: Ejecuta `npm start` en puerto 5000 para desarrollo

## Deployment Configuration
- **Type**: Autoscale (aplicación web sin estado)
- **Build Command**: `npm run build`
- **Run Command**: `npx serve -s build -l 5000`
- **Server**: Usa el paquete `serve` para servir el build de producción

## Productos por Categoría

### Teclados (3 productos)
- Razer BlackWidow - $129.99 (Premium)
- Logitech G Pro X - $149.99 (Pro)
- Corsair K95 RGB Platinum - $199.99 (Premium)

### Mouse (3 productos)
- Logitech G502 HERO - $79.99 (Gaming)
- Razer DeathAdder V3 - $89.99 (Pro)
- SteelSeries Rival 650 - $119.99 (Wireless, Agotado)

### Audífonos (3 productos)
- HyperX Cloud II - $99.99 (Gaming)
- SteelSeries Arctis 7 - $149.99 (Wireless)
- Razer Kraken Ultimate - $129.99 (Premium)

### Volantes (3 productos)
- Logitech G29 - $299.99 (Simulación)
- Thrustmaster T300 RS - $399.99 (Pro)
- Fanatec CSL DD - $599.99 (Direct Drive, Agotado)

### Controles (3 productos)
- Xbox Elite Series 2 - $179.99 (Premium)
- DualSense Edge PS5 - $199.99 (Pro)
- Nintendo Switch Pro Controller - $69.99 (Nintendo)

## Paleta de Colores

### Colores Base
- `--primary-color`: #0d6efd
- `--dark-bg`: #1a1a1a
- `--darker-bg`: #0f0f0f
- `--card-bg`: #2a2a2a
- `--text-light`: #f8f9fa

### Gradientes
- **Gradient 1** (Principal): #667eea → #764ba2
- **Gradient 2** (Juegos): #f093fb → #f5576c
- **Gradient 3** (Periféricos): #4facfe → #00f2fe

## Recent Changes

### October 15, 2025 - Replit Environment Setup Complete
- ✅ Imported GitHub repository to Replit
- ✅ Installed all npm dependencies (1405 packages)
- ✅ Configured workflow for development server on port 5000
- ✅ Set environment variables (PORT=5000, HOST=0.0.0.0, DANGEROUSLY_DISABLE_HOST_CHECK=true, WDS_SOCKET_PORT=0)
- ✅ Verified application compiles and runs successfully
- ✅ Configured deployment (autoscale, build + serve)
- ✅ Application accessible through Replit webview

### October 14, 2025 - Sistema de Navegación y Productos
- ✅ Instalado React Router DOM para navegación SPA
- ✅ Creado sistema de base de datos JSON con 15 productos
- ✅ Implementadas 5 rutas de categorías de periféricos
- ✅ Componente CategoryPage reutilizable
- ✅ Mejorado contraste de colores en toda la aplicación
- ✅ Navbar con navegación funcional a categorías
- ✅ Botón "Volver al Inicio" en páginas de categoría
- ✅ Badges de disponibilidad y categoría en productos
- ✅ Hero sections con gradientes por categoría

### October 13, 2025 - Rediseño Completo
- ✅ Implementado diseño moderno con tema oscuro
- ✅ Agregado navbar con efectos de scroll y animaciones
- ✅ Mejorado carousel con overlays y CTAs
- ✅ Creadas secciones de productos con cards interactivas
- ✅ Implementadas categorías con gradientes personalizados
- ✅ Agregada sección de servicios/beneficios
- ✅ Diseñado footer completo con redes sociales
- ✅ Integrado Font Awesome para iconografía
- ✅ Optimizado para responsive design

### October 13, 2025 - Setup Inicial
- Importado desde GitHub
- Configurado para entorno Replit
- Setup de servidor en puerto 5000
- Configurado deployment autoscale

## User Preferences
- Diseño oscuro con acentos vibrantes
- Interfaz moderna y funcional
- Navegación fluida entre categorías
- Productos organizados por tipo
- Experiencia de usuario optimizada

## Technical Notes
- Font Awesome se carga via script en `index.html`
- React Router DOM maneja toda la navegación
- productos.json es la fuente de verdad para productos
- CategoryPage es un componente reutilizable para todas las categorías
- useNavigate hook para navegación programática
- Todos los gradientes usan CSS custom properties
- El diseño es mobile-first con media queries
- Las imágenes mantienen aspect ratio con `object-fit: cover`
- Productos agotados se muestran con badge rojo y botón deshabilitado

## Navegación
- Click en "Periféricos" en navbar → Despliega menú
- Click en categoría (ej: Teclados) → Navega a `/perifericos/teclados`
- En página de categoría → Click "Volver al Inicio" → Regresa a `/`
- Navbar visible en todas las páginas
- Logo "ElPepe Gamestop" siempre regresa al inicio
