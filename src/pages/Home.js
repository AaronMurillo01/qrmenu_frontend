import { Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

// Landing page — first thing visitors see when they hit the site
const Home = () => (
  <MainLayout>
    <Jumbotron className="bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="my-auto">
            <p className="mb-2" style={{ color: '#ff3366', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Digital Menus Made Easy
            </p>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.15, color: '#1a1a2e' }}>
              QR Code Menu
            </h1>
            <h5 className="mt-3 mb-4" style={{ color: '#4a4a68', fontWeight: 400, lineHeight: 1.6 }}>
              Turn your menu into a QR code your customers can scan right from the table.
            </h5>
            <Button href="/places" variant="standard" size="lg" className="mt-2" style={{ padding: '14px 36px', fontSize: '1.05rem' }}>
              Get Started
            </Button>
          </Col>
          <Col md={6} className="text-center mt-4 mt-md-0">
            <Image
              src="https://assets.materialup.com/uploads/ae60e834-349c-4c94-8189-2450f09ad37a/preview.gif"
              rounded
              fluid
              style={{ borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}
            />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </MainLayout>
);

export default Home;
