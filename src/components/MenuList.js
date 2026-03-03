import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

// Place header with logo and name
const Place = styled.div`
  text-align: center;
  margin-bottom: 8px;
  img {
    border-radius: 50%;
    margin-bottom: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

// Wrapper that applies the selected font to all menu text
const Container = styled.div`
  b, p {
    ${({ font }) => font && `font-family: ${font};` }
  }
`;

// Full menu view — shows the restaurant info and all available categories/items
const MenuList = ({ place, shoppingCart = {}, onOrder, font = "", color = "" }) => {
  return (
    <Container font={font}>
      <Place>
        <img src={place.image} width={80} height={80} />
        <h3 style={{ fontWeight: 900 }}>{place.name}</h3>
      </Place>
      {place?.categories
        ?.filter(
          (category) => category.menu_items.filter((i) => i.is_available).length
        )
        .map((category) => (
          <div key={category.id} className="mt-5">
            <h4 className="mb-4" style={{ fontWeight: 700, color: '#1a1a2e' }}>
              {category.name}
            </h4>
            {category.menu_items
              .filter((item) => item.is_available)
              .map((item) => (
                <MenuItem
                  key={item.id}
                  item={{
                    ...item,
                    quantity: shoppingCart[item.id]?.quantity,
                  }}
                  onOrder={onOrder}
                  color={color}
                />
              ))
            }
          </div>
        ))
      }
    </Container>
  )
};

export default MenuList;
