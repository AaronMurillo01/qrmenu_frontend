import { Card, Button } from 'react-bootstrap';
import React from 'react';

// Single order card — shows order number, table, items, and a "Done" button for staff
const Order = ({ order, onComplete }) => {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span style={{ fontWeight: 700, color: '#1a1a2e' }}>
          {`Order #${order.id}`}
          <span style={{ color: '#6c757d', fontWeight: 400, marginLeft: '8px' }}>
            Table {order.table}
          </span>
        </span>
        <span style={{ fontWeight: 900, color: '#1a1a2e', fontSize: '1.1rem' }}>${order.amount}</span>
      </Card.Header>
      <Card.Body className="d-flex justify-content-between">
        <div>
          {JSON.parse(order.detail).map((item) => (
            <div className="mb-2 d-flex align-items-center" key={item.id}>
              <span style={{
                background: '#f0f2f5',
                borderRadius: '6px',
                padding: '2px 8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginRight: '10px'
              }}>
                x{item.quantity}
              </span>
              <img
                src={item.image}
                width={32}
                height={32}
                style={{ borderRadius: 6, marginRight: '10px', objectFit: 'cover' }}
              />
              <span style={{ fontWeight: 500 }}>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="d-flex align-items-end">
          {onComplete ? (
            <Button variant="standard" size="md" onClick={onComplete}>
              Mark Done
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Order;
