import { Row, Col, Modal} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { fetchPlaces } from '../apis';
import AuthContext from '../contexts/AuthContext';

import MainLayout from '../layouts/MainLayout';
import PlaceForm from '../containers/PlaceForm';

// Styled card for each restaurant — scales up on hover for a nice touch
const Place = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.05);
  }
  > div {
    background-size: cover;
    height: 200px;
    border-radius: 5px;
  }
  > p {
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
  }
`;

// Dashed button to create a new place — visually distinct from existing cards
const AddPlaceButton = styled.div`
  border: 1px dashed gray;
  height: 200px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: #fbfbfb;
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
      <h3>My Places</h3>

      {/* Modal for the "Add New Place" form */}
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <PlaceForm onDone={onDone} />
        </Modal.Body>
      </Modal>

      <Row>
        {places.map((place) => (
          <Col key={place.id} lg={4}>
            <Place onClick={() => history.push(`/places/${place.id}`)}>
              <div style={{ backgroundImage: `url(${place.image})` }}></div>
              <p>{place.name}</p>
            </Place>
          </Col>
        ))}
        <Col lg={4}>
          <AddPlaceButton onClick={onShow}>Add New Place</AddPlaceButton>
        </Col>
      </Row>
    </MainLayout>
  )
}

export default Places;
