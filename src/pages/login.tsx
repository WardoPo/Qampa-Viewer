import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import LoginWithGoogle from "../components/login_google.tsx";

function LoginPage() {
    return (
        <main className="bg-dark d-flex h-100 p-5">
            <Container fluid="lg" className="d-flex justify-content-center align-items-center h-100">
                <Row className="w-100 bg-light rounded p-5">
                    <Col>
                        <Image fluid alt="Qampa Viewer for Google Photos"></Image>
                    </Col>
                    <Col>
                        <h1> Para poder ver tus fotos, inicia sesión con Google</h1>
                        <h2> Disfruta de tus albumes y fotos recientes</h2>
                        <LoginWithGoogle></LoginWithGoogle>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default LoginPage