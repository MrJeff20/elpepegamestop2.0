import React, { useState } from 'react';
<<<<<<< HEAD
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { registrarUsuario } from '../services/api';
=======
import { Form, Button, Alert } from 'react-bootstrap';
import ApiService from '../services/ApiService';
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c

function UserRegister({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
=======

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
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
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
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
        nombre: formData.nombre,
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
=======
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Enviar datos al backend
        const response = await ApiService.signup({
          name: formData.nombre,
          email: formData.email,
          password: formData.password
        });
        
        console.log('Registro exitoso:', response);
        setSubmitStatus('success');
        
        // Resetear formulario y cerrar después de 2 segundos
        setTimeout(() => {
          setFormData({
            nombre: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          setSubmitStatus(null);
          if (onClose) onClose();
        }, 2000);
        
      } catch (error) {
        console.error('Error en registro:', error);
        setSubmitStatus('error');
        setErrors({ submit: error.message || 'Error al registrar usuario' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
      setSubmitStatus('error');
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
    }
  };

  return (
    <div className="user-register-form">
<<<<<<< HEAD
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
=======
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-3">
          <i className="fas fa-check-circle me-2"></i>
          ¡Registro exitoso! Bienvenido a ElPepe Gamestop.
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="danger" className="mb-3">
          <i className="fas fa-exclamation-circle me-2"></i>
          {errors.submit || 'Por favor, corrige los errores en el formulario.'}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-user me-2"></i>
            Nombre *
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
          </Form.Label>
          <Form.Control
            type="text"
            name="nombre"
<<<<<<< HEAD
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
=======
            value={formData.nombre}
            onChange={handleChange}
            isInvalid={!!errors.nombre}
            placeholder="Ingresa tu nombre completo"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Email *
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

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña
=======
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="ejemplo@correo.com"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña *
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
<<<<<<< HEAD
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
=======
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Mínimo 6 caracteres"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Confirmar Contraseña *
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
<<<<<<< HEAD
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
=======
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
            placeholder="Repite tu contraseña"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
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
<<<<<<< HEAD
      </Form>

      <div className="text-center mt-3">
        <small className="text-muted">
          Al registrarte, aceptas nuestros términos y condiciones
        </small>
      </div>
=======

        <p className="text-muted text-center mt-3 small">
          Los campos marcados con * son obligatorios
        </p>
      </Form>
>>>>>>> ec1ded1d0aee34a82b7d681b1a264713b60b0c7c
    </div>
  );
}

export default UserRegister;
