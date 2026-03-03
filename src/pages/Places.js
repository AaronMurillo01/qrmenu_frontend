import { Row, Col, Modal} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { fetchPlaces } from '../apis';
import AuthContext from '../contexts/AuthContext';

import MainLayout from '../layouts/MainLayout';
import PlaceForm from '../containers/PlaceForm';

// Styled card for each restaurant — lifts on hover with a smooth shadow
const Place = styled.div`
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.25s ease;
  :hover {
    transform: translateY(-4px);
  }
  > div {
    background-size: cover;
    background-position: center;
    height: 200px;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.25s ease;
  }
  :hover > div {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  > p {
    margin-top: 10px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a2e;
  }
`;

// Dashed button to create a new place — matches card height
const AddPlaceButton = styled.div`
  border: 2px dashed #d0d5dd;
  height: 200px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s ease;
  :hover {
    border-color: #ff3366;
    color: #ff3366;
    background-color: #fff5f8;
  }
`;

// Dashboard showing all of the user's restaurants
const Places = () => {
  const [places, setPlaces] = useState([]);
  const [show, setShow] = useState(false);

  const auth = useContext(AuthContext);
  const history = useHistory();

  const onHide = () => setShow(false);
  const onShow = () => setShow(true);

  const onFetchPlaces = async () => {
    const json = await fetchPlaces(auth.token);
    if (json) {
      setPlaces(json);
    }
  };

  // Refresh the list and close the modal after adding a place
  const onDone = () => {
    onFetchPlaces();
    onHide();
  }

  useEffect(() => {
    onFetchPlaces();
  }, []);

  return (
    <MainLayout>
      <h3 className="mb-4">My Places</h3>

      {/* Modal for the "Add New Place" form */}
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <PlaceForm onDone={onDone} />
        </Modal.Body>
      </Modal>

      <Row>
        {places.map((place) => (
          <Col key={place.id} lg={4} md={6}>
            <Place onClick={() => history.push(`/places/${place.id}`)}>
              <div style={{ backgroundImage: `url(${place.image})` }}></div>
              <p>{place.name}</p>
            </Place>
          </Col>
        ))}
        <Col lg={4} md={6}>
          <AddPlaceButton onClick={onShow}>+ Add New Place</AddPlaceButton>
        </Col>
      </Row>
    </MainLayout>
  )
}

export default Places;
