import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { registrarUsuario } from '../services/api';

function UserRegister({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await registrarUsuario({
        name: formData.nombre,
        email: formData.email,
        password: formData.password
      });

      setSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Cerrar el modal después de 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error en registro:', err);
      if (err.response?.data?.mensaje) {
        setError(err.response.data.mensaje);
      } else if (err.response?.status === 400) {
        setError('El email ya está registrado o los datos son inválidos');
      } else {
        setError('Error al registrar usuario. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-register-form">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          ¡Registro exitoso! Ahora puedes iniciar sesión.
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerNombre">
          <Form.Label>
            <i className="fas fa-user me-2"></i>
            Nombre
          </Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Tu nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={loading || success}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerEmail">
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

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            disabled={loading || success}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerConfirmPassword">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Confirmar Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
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
                Registrando...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Registrarse
              </>
            )}
          </Button>
        </div>
      </Form>

      <div className="text-center mt-3">
        <small className="text-muted">
          Al registrarte, aceptas nuestros términos y condiciones
        </small>
      </div>
    </div>
  );
}

export default UserRegister;
