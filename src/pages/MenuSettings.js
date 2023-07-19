import { IoMdArrowBack } from 'react-icons/io';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import AuthContext from '../contexts/AuthContext';
import {toast} from 'react-toastify';

import { fetchPlace, updatePlace } from '../apis';
import MainLayout from '../layouts/MainLayout';
import MenuList from '../components/MenuList';

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.05);
`;

const MenuSettings = () => {
  const [place, setPlace] = useState({});
  const [font, setFont] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onBack = () => history.push(`/places/${params.id}`);

  const onFetchPlace = async () => {
    const json = await fetchPlace(params.id);
    if (json) {
      setPlace(json);
      setFont(json.font);
      setColor(json.color);
    }
  }

  const onUpdatePlace = async () => {
    setLoading(true);
    const json = await updatePlace(place.id, { font, color }, auth.token);
    if (json) {
      toast("New settings is updated", {type: "success"});
      setPlace(json);
      setLoading(false);
    }
  }

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <MainLayout>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="black" />
        </Button>
        <h3 className="mb-0 mr-2 ml-2">Menu Settings</h3>
      </div>

      <Row>
        {/* LEFT SIDE */}
        <Col md={4}>
          <Panel>
            <Form.Group>
              <Form.Label>Font</Form.Label>
              <Form.Control as="select" value={font} onChange={(e) => setFont(e.target.value)}>
                <option>Lato</option>
                <option>Teko</option>
                <option>Lobster</option>
                <option>Caveat</option>
                <option>Indie Flower</option>
              </Form.Control>
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <ChromePicker
                color={color}
                onChange={(value) => setColor(value.hex)}
                disableAlpha
                width="100%"
              />
            </Form.Group>

            <Button className="mt-4" variant="standard" block onClick={onUpdatePlace} disabled={loading}>
              Save Setings
            </Button>
          </Panel>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={8}>
          <MenuList place={place} font={font} color={color} onOrder={() => []} />
        </Col>
      </Row>
    </MainLayout>
  )
}

export default MenuSettings;