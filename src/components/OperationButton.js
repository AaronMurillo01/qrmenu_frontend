import { Button } from 'react-bootstrap';
import styled from 'styled-components';

// Small round +/- button used in the shopping cart and table count controls
const OperationButton = styled(Button)`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  font-size: 20px;
  line-height: 18px;
`;

export default OperationButton;
