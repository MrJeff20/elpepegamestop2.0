import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { actualizarPerfil, loginFormatted } from '../services/api';

function UserProfile() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      nombre: user?.nombre || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      nombre: user?.nombre || '',
      email: user?.email || '',
      password: ''
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    // Validar que se haya ingresado la contraseña
    if (!formData.password) {
      setError('Debes ingresar tu contraseña actual para confirmar los cambios');
      return;
    }

    // Verificar si hay cambios
    if (formData.nombre === user.nombre && formData.email === user.email) {
      setError('No se detectaron cambios');
      return;
    }

    setLoading(true);

    try {
      // Primero verificar la contraseña haciendo login
      await loginFormatted({
        email: user.email,
        password: formData.password
      });

      // Si el login fue exitoso, actualizar los datos
      const updatedData = {
        user_id: user.id,
        name: formData.nombre,  // Xano usa 'name', no 'nombre'
        email: formData.email
      };

      const response = await actualizarPerfil(updatedData);
      
      // Actualizar el contexto con los nuevos datos
      login({
        ...user,
        nombre: formData.nombre,
        email: formData.email
      });

      setSuccess('Datos actualizados correctamente');
      setIsEditing(false);
      setFormData({
        ...formData,
        password: ''
      });

    } catch (err) {
      console.error('Error al actualizar:', err);
      if (err.response?.status === 401) {
        setError('Contraseña incorrecta');
      } else if (err.response?.data?.mensaje) {
        setError(err.response.data.mensaje);
      } else {
        setError('Error al actualizar los datos. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="user-profile-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="profile-card shadow-lg">
              <Card.Header className="bg-primary text-white text-center py-4">
                <div className="profile-avatar mb-3">
                  <i className="fas fa-user-circle fa-5x"></i>
                </div>
                <h3 className="mb-0">{user.nombre || 'Usuario'}</h3>
              </Card.Header>
              <Card.Body className="p-4">
                <h5 className="mb-4 text-center text-muted">Información del Perfil</h5>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <div className="profile-info">
                  <div className="info-item mb-4">
                    <div className="info-label">
                      <i className="fas fa-user me-2 text-primary"></i>
                      <strong>Nombre</strong>
                    </div>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    ) : (
                      <div className="info-value">
                        {user.nombre || 'No disponible'}
                      </div>
                    )}
                  </div>

                  <div className="info-item mb-4">
                    <div className="info-label">
                      <i className="fas fa-envelope me-2 text-primary"></i>
                      <strong>Email</strong>
                    </div>
                    {isEditing ? (
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    ) : (
                      <div className="info-value">
                        {user.email || 'No disponible'}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="info-item mb-4">
                      <div className="info-label">
                        <i className="fas fa-lock me-2 text-warning"></i>
                        <strong>Confirmar con tu contraseña</strong>
                      </div>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingresa tu contraseña actual"
                        className="mt-2"
                        required
                      />
                      <small className="text-muted">
                        Para confirmar los cambios, debes ingresar tu contraseña actual
                      </small>
                    </div>
                  )}

                  {user.telefono && (
                    <div className="info-item mb-4">
                      <div className="info-label">
                        <i className="fas fa-phone me-2 text-primary"></i>
                        <strong>Teléfono</strong>
                      </div>
                      <div className="info-value">
                        {user.telefono}
                      </div>
                    </div>
                  )}

                  {user.direccion && (
                    <div className="info-item mb-4">
                      <div className="info-label">
                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                        <strong>Dirección</strong>
                      </div>
                      <div className="info-value">
                        {user.direccion}
                        {user.ciudad && `, ${user.ciudad}`}
                        {user.codigoPostal && ` - ${user.codigoPostal}`}
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2 mt-4">
                  {isEditing ? (
                    <>
                      <Button 
                        variant="success" 
                        onClick={handleSave}
                        disabled={loading}
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
                            Guardando...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save me-2"></i>
                            Guardar Cambios
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        <i className="fas fa-times me-2"></i>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="primary" 
                        onClick={handleEdit}
                      >
                        <i className="fas fa-edit me-2"></i>
                        Editar Perfil
                      </Button>
                      <Button 
                        variant="outline-primary" 
                        onClick={() => navigate('/')}
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        Volver al Inicio
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Cerrar Sesión
                      </Button>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;
