import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import OperationButton from './OperationButton';
import PaymentForm from '../containers/PaymentForm';

// Cart summary — lists selected items with +/- controls and a Stripe payment form
const ShoppingCart = ({ items, onAdd, onRemove, onPaymentDone, color }) => {
  const totalPrice = useMemo(
    () => items.map((i) => i.quantity * i.price).reduce((a,b) => a + b, 0),
    [items]
  );

  return (
    <>
      <h3 className="text-center mb-4" style={{ fontWeight: 900 }}>
        Your Order
      </h3>
      <Card>
        <Card.Body>
          {items.map((item) => (
            <div key={item.id} className="d-flex mb-4 align-items-center" style={{ padding: '4px 0' }}>
              <div className="flex-grow-1">
                <p className="mb-0" style={{ fontWeight: 700, color: '#1a1a2e' }}>
                  {item.name}
                </p>
                <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>${item.price}</span>
              </div>

              <div className="d-flex align-items-center">
                <OperationButton
                  variant="lightgray"
                  size="sm"
                  onClick={() => onRemove(item)}
                >
                  -
                </OperationButton>
                <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <OperationButton
                  variant="lightgray"
                  size="sm"
                  onClick={() => onAdd(item)}
                >
                  +
                </OperationButton>
              </div>
            </div>
          ))}

          <hr/>
          <div className="d-flex justify-content-between" style={{ padding: '8px 0' }}>
            <h5 className="mb-0" style={{ fontWeight: 700 }}>Total</h5>
            <h5 className="mb-0" style={{ fontWeight: 900, color: '#1a1a2e' }}>${totalPrice}</h5>
          </div>

          <hr className="mb-4" />
          <PaymentForm amount={totalPrice} items={items} onDone={onPaymentDone} color={color} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ShoppingCart;
