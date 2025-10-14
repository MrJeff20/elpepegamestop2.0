import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Carousel } from 'react-bootstrap';
import switchImg from './assets/img/switch_2.jpg';
import ps5Img from './assets/img/1366_2000.jpg';
import steamImg from './assets/img/Steam-Deck.jpg';
import { consolas, perifericos, juegos } from './menuData';


function App() {
  // keep simple state only for future needs
  // let react-bootstrap manage dropdown state; use CSS for hover in desktop
  useEffect(() => {
    // Inject external stylesheet for custom styles and Bootstrap
    const head = document.head;

    const links = [];

    const customCss = document.createElement('link');
    customCss.href = '/assets/style.css';
    customCss.rel = 'stylesheet';
    head.appendChild(customCss);
    links.push(customCss);

    const bootstrap = document.createElement('link');
    bootstrap.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    bootstrap.rel = 'stylesheet';
    bootstrap.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
    bootstrap.crossOrigin = 'anonymous';
    head.appendChild(bootstrap);
    links.push(bootstrap);

    // FontAwesome kit is a script
    const faScript = document.createElement('script');
    faScript.src = 'https://kit.fontawesome.com/49b80977bc.js';
    faScript.crossOrigin = 'anonymous';
    faScript.defer = true;
    head.appendChild(faScript);

    return () => {
      // cleanup injected nodes on unmount
      links.forEach(l => l.parentNode && l.parentNode.removeChild(l));
      if (faScript.parentNode) faScript.parentNode.removeChild(faScript);
    };
  }, []);

  // dynamic import of react-bootstrap components on client
  // no dynamic imports needed now — react-bootstrap is imported statically

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
        <Container>
          <Navbar.Brand href="/">ElPepe Gamestop</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar" className="justify-content-center">
            <Nav>
              {juegos.map((item) => (
                <Nav.Link key={item.file} href={`/Juegos/${item.file}`}>{item.name}</Nav.Link>
              ))}
              {/* Submenu: CSS hover will open on desktop; react-bootstrap handles click/tap */}
              <NavDropdown title="Consolas" id="nav-dropdown-consolas">
                {consolas.map((item) => (
                  <NavDropdown.Item key={item.file} href={`/Consolas/${item.file}`}>
                    {item.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <NavDropdown title="Periféricos" id="nav-dropdown-perifericos">
                {perifericos.map((item) => (
                  <NavDropdown.Item key={item.file} href={`/Perifericos/${item.file}`}>
                    {item.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="container mt-3">
        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#333' }}>Esta es la empresa que el DUOC pide rellenar.</p>

        <div className="redirect mb-3">
          <a href="https://www.gamestop.com/">Página de prueba de GameStop</a>
        </div>

  <img src={switchImg} width="900" height="475" alt="Test" className="img-fluid" />

        <div id="contentItemCarrusel" className="mt-4">
          <Carousel controls indicators interval={4000} pause={'hover'}>
            <Carousel.Item>
              <img className="d-block w-100" src={switchImg} width="900" height="475" alt="Switch" />
              <Carousel.Caption>
                <h3>Switch - Nuevos lanzamientos</h3>
                <p>Explora juegos exclusivos y accesorios.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={ps5Img}  width="900" height="475" alt="PS5" />
              <Carousel.Caption>
                <h3>PS5 - Ediciones Limitadas</h3>
                <p>Encuentra consolas y bundles exclusivos.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={steamImg} width="900" height="475" alt="PC" />
              <Carousel.Caption>
                <h3>PC Gaming</h3>
                <p>Armado, componentes y periféricos de alto rendimiento.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>


      </main>

      <footer style={{ marginTop: 20, fontSize: 12, color: '#777' }} className="text-center">
        <p>© 2025 N.W.A, Equipo Fundador: Jeferson Carbonell | Roberto Jara | Vicente Arriagada | Ice Cube. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
