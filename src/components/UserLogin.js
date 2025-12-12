import React, { useState } from 'react';
<<<<<<< HEAD
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { loginFormatted } from '../services/api';
import { useAuth } from '../context/AuthContext';

function UserLogin({ onClose }) {
  const { login } = useAuth();
=======
import { Form, Button, Alert } from 'react-bootstrap';
import ApiService from '../services/ApiService';

export default function UserLogin({ onClose }) {
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
=======

  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
<<<<<<< HEAD
    setError('');
=======
    // Limpiar estado de error cuando el usuario escribe
    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setLoading(true);
    setError('');

    try {
      const response = await loginFormatted({
        email: formData.email,
        password: formData.password
      });

      console.log('Respuesta del servidor:', response);

      // Guardar el token si existe
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      // Verificar si hay datos de usuario en response.usuario
      if (response.usuario && response.usuario.nombre) {
        login(response.usuario);
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      } 
      // Si la respuesta tiene directamente los campos del usuario (name, email, id)
      else if (response.name || response.email || response.id) {
        const userData = {
          id: response.id,
          nombre: response.name, // Xano devuelve 'name'
          email: response.email
        };
        console.log('Usuario creado desde respuesta directa:', userData);
        login(userData);
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      } 
      // Si hay token pero no datos de usuario estructurados
      else if (response.token || response.authToken) {
        const userData = {
          id: response.id,
          nombre: response.name || response.nombre,
          email: response.email || formData.email
        };
        console.log('Usuario creado desde token:', userData);
        login(userData);
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      } 
      else {
        console.error('Estructura de respuesta:', response);
        setError('Respuesta del servidor incorrecta');
      }
    } catch (err) {
      console.error('Error en login:', err);
      if (err.response?.data?.mensaje) {
        setError(err.response.data.mensaje);
      } else if (err.response?.status === 401) {
        setError('Email o contraseña incorrectos');
      } else {
        setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
=======

    // Validación simple
    if (!formData.email || !formData.password) {
      setSubmitStatus('error');
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    
    try {
      // Llamar al backend para autenticar
      const response = await ApiService.login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login exitoso:', response);
      setSubmitStatus('success');
      
      // Cerrar modal después de 1.5 segundos
      setTimeout(() => {
        setFormData({
          email: '',
          password: ''
        });
        setSubmitStatus(null);
        if (onClose) onClose();
        
        // Recargar la página para actualizar el estado de autenticación
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error en login:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Credenciales inválidas');
    } finally {
      setIsLoading(false);
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
    }
  };

  return (
    <div className="user-login-form">
<<<<<<< HEAD
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">¡Inicio de sesión exitoso!</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Email
=======
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-3">
          <i className="fas fa-check-circle me-2"></i>
          ¡Inicio de sesión exitoso!
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="danger" className="mb-3">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errorMessage || 'Revisar elementos ingresados'}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Correo Electrónico
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
<<<<<<< HEAD
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading || success}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
=======
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            disabled={isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
<<<<<<< HEAD
            placeholder="Tu contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading || success}
=======
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            disabled={isLoading}
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
          />
        </Form.Group>

        <div className="d-grid gap-2">
<<<<<<< HEAD
          <Button
            variant="primary"
            type="submit"
            disabled={loading || success}
            className="mt-3"
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
=======
          <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
                Iniciando sesión...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Iniciar Sesión
              </>
            )}
          </Button>
        </div>
      </Form>
<<<<<<< HEAD

      <div className="text-center mt-3">
        <small className="text-muted">
          ¿No tienes una cuenta? Regístrate primero
        </small>
      </div>
=======
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
    </div>
  );
}

<<<<<<< HEAD
export default UserLogin;
=======


>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
