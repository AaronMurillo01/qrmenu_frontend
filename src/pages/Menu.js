import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { fetchPlace } from '../apis';
import styled from 'styled-components';

import MenuList from '../components/MenuList';
import ShoppingCart from '../components/ShoppingCart';

// Floating cart button pinned to bottom-right corner
const OrderButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(255, 51, 102, 0.35);
  width: 60px;
  height: 60px;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 28px rgba(255, 51, 102, 0.45);
  }
`;

// Customer-facing menu — what people see after scanning the QR code
const Menu = () => {
  const [place, setPlace] = useState({});
  const [shoppingCart, setShoppingCart] = useState({});
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const params = useParams();

  const onFetchPlace = async () => {
    const json = await fetchPlace(params.id);
    if (json) {
      setPlace(json);
    }
  };

  // Add one more of this item to the cart (or start at 1)
  const onAddItemtoShoppingCart = (item) => {
    setShoppingCart({
      ...shoppingCart,
      [item.id]: {
        ...item,
        quantity: (shoppingCart[item.id]?.quantity || 0) + 1,
      }
    });
  }

  // Remove one of this item — hides cart when the last item is removed
  const onRemoveItemToShoppingCart = (item) => {
    if (totalQuantity === 1) {
      setShowShoppingCart(false);
    }

    setShoppingCart({
      ...shoppingCart,
      [item.id]: {
        ...item,
        quantity: (shoppingCart[item.id]?.quantity || 0) - 1,
      }
    });
  }

  // Clear everything after a successful payment
  const onPaymentDone = () => {
    setShoppingCart({});
    setShowShoppingCart(false);
  }

  // Total number of items in the cart — drives the floating button badge
  const totalQuantity = useMemo(
    () => Object.keys(shoppingCart)
            .map((i) => shoppingCart[i].quantity)
            .reduce((a,b) => a + b, 0),
      [shoppingCart]
  );

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          {showShoppingCart ? (
            <ShoppingCart
              items={Object.keys(shoppingCart)
                .map((key) => shoppingCart[key])
                .filter((item) => item.quantity > 0)
              }
              onAdd={onAddItemtoShoppingCart}
              onRemove={onRemoveItemToShoppingCart}
              onPaymentDone={onPaymentDone}
              color={place.color}
            />
          ) : (
            <MenuList
              place={place}
              shoppingCart={shoppingCart}
              onOrder={onAddItemtoShoppingCart}
              color={place.color}
              font={place.font}
            />
          )}

        </Col>
      </Row>

      {/* Floating button: shows item count, or X to close cart */}
      {totalQuantity ? (
        <OrderButton
          variant="standard"
          style={place.color ? { backgroundColor: place.color } : {}}
          onClick={() => setShowShoppingCart(!showShoppingCart)}>
          {showShoppingCart ? <IoCloseOutline size={25} /> : totalQuantity}
        </OrderButton>
      ) : null}
    </Container>
  )
};

export default Menu;
