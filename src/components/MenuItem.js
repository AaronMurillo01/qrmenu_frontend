import { Col, Button } from 'react-bootstrap';
import React from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

// Card layout for a single menu item — image on the left, details on the right
const Container = styled.div`
  border-radius: 12px;
  background-color: white;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  opacity: ${({active}) => (active ? 1 : 0.5)};
  transition: all 0.2s ease;
  overflow: hidden;
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  > div:first-child {
    width: 40%;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    background-size: cover;
    background-position: center;
  }
  > div:last-child {
    padding: 16px 20px;
    min-height: 150px;
  }
`;

// Renders a menu item card with optional edit/remove (admin) or order (customer) actions
const MenuItem = ({ item, onEdit, onRemove, onOrder, color }) => (
  <Container active={item.is_available}>
    <Col xs={5} style={{ backgroundImage: `url(${item.image})` }} />
    <Col xs={7} className="d-flex flex-column justify-content-between w-100">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0" style={{ fontSize: '1.1rem' }}>
            <b>{item.name}</b>
          </h4>
          <div>
            { onEdit ? (
              <Button variant="link" onClick={onEdit}>
                <BiEdit size={18} color="#4a4a68" />
              </Button>
            ) : null }

            { onRemove ? (
              <Button variant="link" onClick={onRemove}>
                <AiOutlineDelete size={18} color="#dc3545" />
              </Button>
            ) : null }
          </div>
        </div>
        <p className="mb-3" style={{ fontSize: '0.9rem', color: '#6c757d', lineHeight: 1.5 }}>{item.description}</p>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <h5 className="mb-0">
            <b style={{ color: color || '#ff3366', fontSize: '1.15rem' }}>${item.price}</b>
          </h5>

          {onOrder ? (
            <Button
              variant="standard"
              style={color ? { backgroundColor: color } : {}}
              className="mt-2"
              size="sm"
              onClick={() => onOrder(item)}
            >
              {!item.quantity ? "Add to cart" : `Add another (${item.quantity})`}
            </Button>
          ) : null}
        </div>

        {!item.is_available ? (
          <span style={{
            background: '#f0f2f5',
            color: '#6c757d',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            Sold out
          </span>
        ) : null}

      </div>
    </Col>
  </Container>
);

export default MenuItem;
