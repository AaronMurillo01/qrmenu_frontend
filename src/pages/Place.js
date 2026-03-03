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

// White card panel used for the sidebar form
const Panel = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
`;

// Quick action icon button — subtle hover highlight
const ActionButton = styled(Button)`
  border-radius: 10px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: all 0.15s ease;
  &:hover {
    background-color: #f0f2f5;
  }
`;

// Single place detail page — manage menu items, categories, QR codes, and orders
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

  // Confirm before deleting — sends user back to the places list on success
  const onRemovePlace = () => {
    const c = window.confirm("Delete this place? This can't be undone.");
    if (c) {
      removePlace(params.id, auth.token).then(onBack);
    }
  };

  const onRemoveCategory = (id) => {
    const c = window.confirm("Remove this category and all its items?");
    if (c) {
      removeCategory(id, auth.token).then(onFetchPlace);
    }
  };

  const onRemoveMenuItem = (id) => {
    const c = window.confirm("Remove this menu item?");
    if (c) {
      removeMenuItem(id, auth.token).then(onFetchPlace);
    }
  };

  // Update number of tables (used by the QR code modal's +/- buttons)
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
            {/* Top bar: back button, place name, delete */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <Button variant="link" onClick={onBack}>
                  <IoMdArrowBack size={25} color="#1a1a2e" />
                </Button>
                <h3 className="mb-0 ml-2" style={{ fontWeight: 900 }}>{place.name}</h3>
              </div>

              <Button variant="link" onClick={onRemovePlace}>
                <AiOutlineDelete size={22} color="#dc3545" />
              </Button>
            </div>

            {/* Quick action icons: QR codes, orders, settings */}
            <div className="d-flex mb-2">
              <ActionButton variant="link" onClick={showQRModal}>
                <AiOutlineQrcode size={22} />
              </ActionButton>
              <ActionButton variant="link" href={`/places/${params.id}/orders`}>
                <RiFileList3Line size={22} />
              </ActionButton>
              <ActionButton variant="link" href={`/places/${params.id}/settings`}>
                <FiSettings size={22} />
              </ActionButton>
            </div>
          </div>
        </Col>

        {/* Left sidebar: form to add new menu items */}
        <Col md={4}>
          <Panel>
            <MenuItemForm place={place} onDone={onFetchPlace} />
          </Panel>
        </Col>

        {/* Right side: all categories and their menu items */}
        <Col md={8}>
          {place?.categories?.map((category) => (
            <div key={category.id} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0 mr-2">
                  <b>{category.name}</b>
                </h4>
                <Button variant="link" onClick={() => onRemoveCategory(category.id)}>
                  <AiOutlineDelete size={20} color="#dc3545" />
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

      {/* Edit modal — pops up when clicking the edit icon on a menu item */}
      <Modal show={menuItemFormShow} onHide={hideModal} centered>
        <Modal.Body>
          <h4 className="text-center mb-4" style={{ fontWeight: 700 }}>Edit Menu Item</h4>
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
