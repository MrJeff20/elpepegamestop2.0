import React from 'react';

function ContactForm() {
    return (
        <div className="contact-form-container">
            <h2>Contacto</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea id="mensaje" className="form-control" rows="4" required />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default ContactForm;