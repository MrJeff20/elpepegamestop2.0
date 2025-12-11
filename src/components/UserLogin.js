import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { loginFormatted } from '../services/api';
import { useAuth } from '../context/AuthContext';

function UserLogin({ onClose }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="user-login-form">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">¡Inicio de sesión exitoso!</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Email
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading || success}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Tu contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading || success}
          />
        </Form.Group>

        <div className="d-grid gap-2">
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

      <div className="text-center mt-3">
        <small className="text-muted">
          ¿No tienes una cuenta? Regístrate primero
        </small>
      </div>
    </div>
  );
}

export default UserLogin;
