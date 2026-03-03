import { IoMdArrowBack } from 'react-icons/io';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import { fetchOrders, completeOrder } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Order from '../components/Order';

// Live orders feed — polls every 5 seconds so new orders show up automatically
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onBack = () => history.push(`/places/${params.id}`);

  const onFetchOrders = async () => {
    const json = await fetchOrders(params.id, auth.token);
    if (json) {
      setOrders(json);
    }
  }

  const onCompleteOrder = async (orderId) => {
    const json = await completeOrder(orderId, { status: "completed"}, auth.token);
    if (json) {
      onFetchOrders();
    }
  }

  // Poll for new orders on a 5-second interval
  useEffect(() => {
    onFetchOrders();
    const interval = setInterval(() => {
      onFetchOrders();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="#1a1a2e" />
        </Button>
        <h3 className="mb-0 ml-2 mr-2" style={{ fontWeight: 900 }}>Orders</h3>
      </div>

      {orders?.filter((order) => order.status === "processing").length === 0 && (
        <div className="text-center" style={{ padding: '60px 0', color: '#a0a4b0' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No orders right now</p>
          <p style={{ fontSize: '0.9rem' }}>New orders will show up here automatically</p>
        </div>
      )}

      <Row className="justify-content-center">
        {orders
          ?.filter((order) => order.status === "processing")
          ?.map((order) => (
          <Col key={order.id} lg={8}>
            <Order order={order} onComplete={() => onCompleteOrder(order.id)} />
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
}

export default Orders;
