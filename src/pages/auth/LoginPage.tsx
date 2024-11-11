"use client";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../../components/auth/LoginForm";
import "../../app/myStyle.css";

const LoginPage = () => {
    return (
        <Container fluid={true} className="container-login">
            <Row>
                <Col xs={7}></Col>
                <Col sm={12} md={4} lg={4}>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
