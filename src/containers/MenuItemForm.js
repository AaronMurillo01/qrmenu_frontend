import React, { useState, useContext, useRef } from 'react';
import { Button, Form, Popover, Overlay } from 'react-bootstrap';
import { RiPlayListAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { addCategory, addMenuItems, updateMenuItem } from '../apis';
import AuthContext from '../contexts/AuthContext';
import ImageDropzone from './ImageDropzone';

// Form for creating or editing a menu item (also handles adding new categories)
const MenuItemForm = ({ place, onDone, item = {} }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryFormShow, setCategoryFormShow] = useState(false);

  const [category, setCategory] = useState(item.category);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price || 0);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [isAvailable, setIsAvailable] = useState(
    item.is_available === undefined ? true : !!item.is_available
  );

  const target = useRef(null);

  const auth = useContext(AuthContext);

  // Create a new category via the popover form
  const onAddCategory = async () => {
    const json = await addCategory({ name: categoryName, place: place.id }, auth.token);

    if (json) {
      toast(`"${json.name}" category added!`, { type: "success"});
      setCategory(json.id);
      setCategoryName("");
      setCategoryFormShow(false);
      onDone();
    }
  };

  // Submit a brand-new menu item, then reset the form
  const onAddMenuItems = async () => {
    const json = await addMenuItems({
      place: place.id,
      category,
      name,
      price,
      description,
      image,
      is_available: isAvailable
    }, auth.token);

    if (json) {
      toast(`"${json.name}" added to the menu!`, { type: "success" });
      setCategory("");
      setName("");
      setPrice(0);
      setDescription("");
      setImage("");
      setIsAvailable(true);
      onDone();
    }
  }

  // Update an existing menu item
  const onUpdateMenuItem = async () => {
    const json = await updateMenuItem(
      item.id,
      {
        place: place.id,
        category,
        name,
        price,
        description,
        image,
        is_available: isAvailable
      },
      auth.token
    );

    if (json) {
      toast(`"${json.name}" updated!`, { type: "success" });
      setCategory("");
      setName("");
      setPrice(0)
      setDescription("");
      setImage("");
      setIsAvailable(false);
      onDone();
    }
  }

  return (
    <div>
      {/* Category selector with an inline popover to create new categories */}
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <div className="d-flex align-items-center">

          <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option />
            {place?.categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Control>

          <Button ref={target} variant="link" onClick={() => setCategoryFormShow(true)}>
            <RiPlayListAddFill size={25} />
          </Button>

          <Overlay
            show={categoryFormShow}
            target={target.current}
            placement="bottom"
            rootClose
            onHide={() => setCategoryFormShow(false)}
          >
            <Popover id="popover-contained">
              <Popover.Title as="h3">New Category</Popover.Title>
              <Popover.Content>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Appetizers"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>
                <Button variant="standard" block onClick={onAddCategory}>
                  Add Category
                </Button>
              </Popover.Content>
            </Popover>

          </Overlay>


        </div>
      </Form.Group>

      {/* Menu item fields */}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Margherita Pizza"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="A short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <ImageDropzone value={image} onChange={setImage} />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Available"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
      </Form.Group>
      <Button
        variant="standard"
        block
        onClick={ item.id ? onUpdateMenuItem : onAddMenuItems}
      >
        { item.id ? "Save Changes" : "+ Add Menu Item" }
      </Button>
    </div>

  );
}

export default MenuItemForm;
