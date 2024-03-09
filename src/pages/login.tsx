import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import LoginWithGoogle from "../components/login_google.tsx";

import QampaLogoWhite from '../assets/logo/Viewer.png'

function LoginPage() {
    return (
        <main className="bg-dark d-flex h-100 p-5">
            <Container fluid="lg" className="d-flex justify-content-center align-items-center">
                <Row className="w-100 bg-light rounded p-5">
                    <Col>
                        <Image fluid alt="Qampa Viewer for Google Photos" src={QampaLogoWhite} style={{filter:"var(--qampa-color-filter)"}}></Image>
                    </Col>
                    <Col className="d-flex flex-column justify-content-around">
                        <div>
                            <h1 className="mb-4"> Para poder ver tus fotos, inicia sesión con tu cuenta de Google</h1>
                            <p> Disfruta de presentaciones animadas de tus álbumes más recientes</p>
                        </div>
                        <LoginWithGoogle></LoginWithGoogle>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default LoginPage