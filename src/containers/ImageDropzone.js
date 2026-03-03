import { Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { uploadImage } from '../apis';

// Dashed border box that accepts image files via drag-and-drop or click
const Dropzone = styled.div`
  border: 2px dashed #d0d5dd;
  border-radius: 12px;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 142px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #fafbfc;
  &:hover {
    border-color: #ff3366;
    background-color: #fff5f8;
    color: #ff3366;
  }
  img {
    height: 138px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

// Uploads a single image to Cloudinary, then passes the URL back via onChange
function ImageDropzone({ value, onChange }) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    uploadImage(acceptedFiles[0])
      .then((json) => onChange(json.url))
      .finally(() => setLoading(false));
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {
        value ? (
          <img src={value} />
        ) : loading ? (
          <Spinner variant="standard" animation="border" role="status" />
        ) : (
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Drop an image here, or click to browse</span>
        )
      }
    </Dropzone>
  )
}

export default ImageDropzone;
