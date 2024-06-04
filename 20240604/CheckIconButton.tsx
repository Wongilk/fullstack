import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  isChecked: boolean;
  handleCheckItem: () => void;
}
const CheckIconButton = ({ isChecked, handleCheckItem }: Props) => {
  return (
    <StCheckIconButton onClick={handleCheckItem}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </StCheckIconButton>
  );
};
const StCheckIconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;
export default CheckIconButton;
