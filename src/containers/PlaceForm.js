import { Form, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";

import { addPlace } from "../apis";
import AuthContext from "../contexts/AuthContext";

import ImageDropzone from "./ImageDropzone";

const PlaceForm = ({ onDone }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const auth = useContext(AuthContext);

  const onClick = async () => {
    const json = await addPlace({ name, image }, auth.token);
    if (json) {
      setName("");
      setImage("");
      onDone();
    }
  };

  return (
    <div>
      <h4 className="text-center">Place</h4>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image</Form.Label>
        <ImageDropzone value={image} onChange={setImage} />
      </Form.Group>
      <Button variant="standard" block onClick={onClick}>
        Add
      </Button>
    </div>
  );
};

export default PlaceForm;
