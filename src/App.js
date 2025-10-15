import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Col, Row } from 'react-bootstrap';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import ContactForm from './components/ContactForm';

function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/perifericos/${category}`);
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      fixed="top"
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <i className="fas fa-gamepad me-2"></i>
          ElPepe Gamestop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link href="#juegos" className="nav-link-custom">
              <i className="fas fa-ghost me-1"></i> Juegos
            </Nav.Link>
            <NavDropdown title={<><i className="fas fa-tv me-1"></i> Consolas</>} id="nav-dropdown-consolas" className="nav-dropdown-custom">
              <NavDropdown.Item href="#playstation">
                <i className="fab fa-playstation me-2"></i> PlayStation
              </NavDropdown.Item>
              <NavDropdown.Item href="#nintendo">
                <i className="fas fa-star me-2"></i> Nintendo
              </NavDropdown.Item>
              <NavDropdown.Item href="#xbox">
                <i className="fab fa-xbox me-2"></i> Xbox
              </NavDropdown.Item>
              <NavDropdown.Item href="#portable">
                <i className="fas fa-mobile-alt me-2"></i> Portátil
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<><i className="fas fa-keyboard me-1"></i> Periféricos</>} id="nav-dropdown-perifericos" className="nav-dropdown-custom">
              <NavDropdown.Item onClick={() => handleCategoryClick('teclados')}>
                <i className="fas fa-keyboard me-2"></i> Teclados
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('mouse')}>
                <i className="fas fa-mouse me-2"></i> Mouse
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('audifonos')}>
                <i className="fas fa-headphones me-2"></i> Audífonos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('volantes')}>
                <i className="fas fa-steering-wheel me-2"></i> Volantes
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('controles')}>
                <i className="fas fa-gamepad me-2"></i> Controles
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate('/contacto')} className="nav-link-custom">
              <i className="fas fa-envelope me-1"></i> Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perifericos/teclados" element={<CategoryPage category="teclados" />} />
          <Route path="/perifericos/mouse" element={<CategoryPage category="mouse" />} />
          <Route path="/perifericos/audifonos" element={<CategoryPage category="audifonos" />} />
          <Route path="/perifericos/volantes" element={<CategoryPage category="volantes" />} />
          <Route path="/perifericos/controles" element={<CategoryPage category="controles" />} />
          <Route path="/contacto" element={<ContactForm />} />
        </Routes>

        <footer className="custom-footer">
          <Container>
            <Row className="py-5">
              <Col xs={12} md={4} className="mb-4 mb-md-0">
                <h5 className="footer-title">
                  <i className="fas fa-gamepad me-2"></i>
                  ElPepe Gamestop
                </h5>
                <p className="footer-description">
                  Tu tienda de confianza para todo lo relacionado con videojuegos, consolas y accesorios gaming.
                </p>
                <div className="social-links mt-3">
                  <a href="#facebook" className="social-link"><i className="fab fa-facebook-f"></i></a>
                  <a href="#twitter" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#instagram" className="social-link"><i className="fab fa-instagram"></i></a>
                  <a href="#youtube" className="social-link"><i className="fab fa-youtube"></i></a>
                </div>
              </Col>
              <Col xs={12} md={4} className="mb-4 mb-md-0">
                <h5 className="footer-title">Enlaces Rápidos</h5>
                <ul className="footer-links">
                  <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
                  <li><a href="#politica-privacidad">Política de Privacidad</a></li>
                  <li><a href="#terminos">Términos y Condiciones</a></li>
                  <li><a href="#faq">Preguntas Frecuentes</a></li>
                </ul>
              </Col>
              <Col xs={12} md={4}>
                <h5 className="footer-title">Contacto</h5>
                <ul className="footer-contact">
                  <li><i className="fas fa-map-marker-alt me-2"></i> Santiago, Chile</li>
                  <li><i className="fas fa-phone me-2"></i> +56 9 1234 5678</li>
                  <li><i className="fas fa-envelope me-2"></i> info@elpepegamestop.cl</li>
                </ul>
              </Col>
            </Row>
            <hr className="footer-divider" />
            <Row className="py-3">
              <Col className="text-center">
                <p className="mb-0 footer-copyright">
                  © 2025 N.W.A - ElPepe Gamestop | Equipo: Jeferson Carbonell, Roberto Jara, Vicente Arriagada, Ice Cube
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
