import { Button } from 'react-bootstrap';
import styled from 'styled-components';

// Small round +/- button used in the shopping cart and table count controls
const OperationButton = styled(Button)`
  width: 32px;
  height: 32px;
  margin: 0 8px;
  font-size: 18px;
  line-height: 18px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.15s ease;
`;

export default OperationButton;
