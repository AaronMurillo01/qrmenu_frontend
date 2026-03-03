import { AiOutlineLink } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import QRCodeReact from 'qrcode.react';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';

const Container = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

// Semi-transparent overlay with action buttons on top of the QR code
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.2s ease;
  ${Container}:hover & {
    opacity: 1;
  }
`;

// Hidden print layout — large table number + QR code for printing
const ComponentToPrint = styled.div`
  text-align: center;
  margin-top: 200px;
  h1 {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  h2 {
    font-size: 60px;
    margin-bottom: 100px
  }
`;

// QR code for a single table — shows a preview with print and link buttons on hover
const QRCode = ({ table, placeId }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const url = `${window.location.origin}/menu/${placeId}/${table}`;

  return (
    <Container>
      <p style={{ fontWeight: 700, color: '#1a1a2e', marginBottom: '12px', fontSize: '0.9rem' }}>
        Table {table}
      </p>
      <QRCodeReact value={url} size={160} />
      <Overlay>
        <div className="d-flex">
          <Button variant="standard" onClick={handlePrint} className="mr-2" size="sm">
            Print
          </Button>
          <Button variant="standard" href={`/menu/${placeId}/${table}`} target="_blank" size="sm">
            <AiOutlineLink size={18} />
          </Button>
        </div>
      </Overlay>

      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef}>
          <h1>Table {table}</h1>
          <h2>Scan to see the menu</h2>
          <QRCodeReact value={url} size={500} />
        </ComponentToPrint>
      </div>
    </Container>
  )
}

export default QRCode;
