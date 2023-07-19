import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineQrcode } from 'react-icons/ai';
import { RiFileList3Line } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { 
  fetchPlace, 
  removePlace, 
  removeCategory, 
  removeMenuItem, 
  updatePlace 
} from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import MenuItemForm from '../containers/MenuItemForm';
import MenuItem from '../components/MenuItem';
import QRCodeModal from '../components/QRCodeModal';

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.05);
`;

const Place = () => {
  const [place, setPlace] = useState({});
  const [menuItemFormShow, setMenuItemFormShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrCode, setQrCode] = useState(false);

  const showModal = () => setMenuItemFormShow(true);
  const hideModal = () => setMenuItemFormShow(false);

  const showQRModal = () => setQrCode(true);
  const hideQRModal = () => setQrCode(false);

  const auth = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();

  const onBack = () => history.push("/places");

  const onFetchPlace = async () => {
    const json = await fetchPlace(params.id, auth.token);
    if (json) {
      setPlace(json);
    }
  };

  const onRemovePlace = () => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removePlace(params.id, auth.token).then(onBack);
    }
  };

  const onRemoveCategory = (id) => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removeCategory(id, auth.token).then(onFetchPlace);
    }
  };

  const onRemoveMenuItem = (id) => {
    const c = window.confirm("Are you sure?");
    if (c) {
      removeMenuItem(id, auth.token).then(onFetchPlace);
    }
  };

  const onUpdatePlace = (tables) => {
    updatePlace(place.id, { number_of_tables: tables }, auth.token).then(
      (json) => {
        if (json) {
          setPlace(json);
        }
      }
    )
  }

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={25} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>

              <Button variant="link" onClick={onRemovePlace}>
                <AiOutlineDelete size={25} color="red" />
              </Button>
            </div>

            <Button variant="link" onClick={showQRModal}>
              <AiOutlineQrcode size={25} />
            </Button>
            <Button variant="link" href={`/places/${params.id}/orders`}>
              <RiFileList3Line size={25} />
            </Button>
            <Button variant="link" href={`/places/${params.id}/settings`}>
              <FiSettings size={25} />
            </Button>
          </div>
        </Col>

        <Col md={4}>
          <Panel>
            <MenuItemForm place={place} onDone={onFetchPlace} />
          </Panel>
        </Col>

        <Col md={8}>
          {place?.categories?.map((category) => (
            <div key={category.id} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0 mr-2">
                  <b>{category.name}</b>
                </h4>
                <Button variant="link" onClick={() => onRemoveCategory(category.id)}>
                  <AiOutlineDelete size={25} color="red" />
                </Button>
              </div>
              {category.menu_items.map((item) => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  onEdit={() => {
                    setSelectedItem(item);
                    showModal()
                  }}
                  onRemove={() => onRemoveMenuItem(item.id)}
                />
              ))}
            </div>
          ))}
        </Col>
      </Row>
    
      <Modal show={menuItemFormShow} onHide={hideModal} centered>
        <Modal.Body>
          <h4 className="text-center">Menu Item</h4>
          <MenuItemForm 
            place={place}
            onDone={() => {
              onFetchPlace();
              hideModal()
            }}
            item={selectedItem}
          />
        </Modal.Body>
      </Modal>

      <QRCodeModal 
        show={qrCode} 
        onHide={hideQRModal} 
        place={place} 
        centered 
        onUpdatePlace={onUpdatePlace}
      />
    </MainLayout>
  )
};

export default Place;