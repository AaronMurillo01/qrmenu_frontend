import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import QRCode from './QRCode.js';
import OperationButton from './OperationButton';

// Modal showing QR codes for every table — lets the owner adjust the table count
const QRCodeModal = ({ show, onHide, place, onUpdatePlace }) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Body className="text-center pt-4">
      <Container>
        <h3 style={{ fontWeight: 900 }}>Table QR Codes</h3>
        <p style={{ color: '#6c757d', marginBottom: '24px' }}>Print or open QR codes for each table</p>
        <div className="d-flex align-items-center justify-content-center mt-2 mb-4">
          <OperationButton
            variant="lightgray"
            size="sm"
            onClick={() => onUpdatePlace(place.number_of_tables - 1)}
          >
            -
          </OperationButton>
          <h5 className="mb-0 mx-3" style={{ fontWeight: 700 }}>
            {place.number_of_tables} {place.number_of_tables === 1 ? 'table' : 'tables'}
          </h5>
          <OperationButton
            variant="lightgray"
            size="sm"
            onClick={() => onUpdatePlace(place.number_of_tables + 1)}
          >
            +
          </OperationButton>
        </div>

        <Row>
          {Array.from({ length: place.number_of_tables }, (_, i) => i + 1).map(
            (table) => (
              <Col key={table} lg={4} md={6} className="mb-4">
                <QRCode table={table} placeId={place.id} />
              </Col>
            )
          )}
        </Row>
      </Container>
    </Modal.Body>
  </Modal>
);

export default QRCodeModal;
