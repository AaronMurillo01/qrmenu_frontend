import { Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

// Landing page — first thing visitors see when they hit the site
const Home = () => (
  <MainLayout>
    <Jumbotron className="bg-light">
      <Container>
        <Row>
          <Col md={6} className="my-auto">
            <h1><b>QR Code Menu</b></h1>
            <h5 className="mt-4 mb-4">
              Turn your menu into a QR code your customers can scan right from the table.
            </h5>
            <br/>
            <Button href="/places" variant="standard" size="lg">
              Get Started
            </Button>
          </Col>
          <Col md={6}>
            <Image src="https://assets.materialup.com/uploads/ae60e834-349c-4c94-8189-2450f09ad37a/preview.gif" rounded fluid />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </MainLayout>
);

export default Home;
