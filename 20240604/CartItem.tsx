import styled from "styled-components";
import { Cart } from "../../models/cart.model";
import Button from "../common/Button";
import Title from "../common/Title";
import { formatNumber } from "../../utils/format";
import CheckIconButton from "./CheckIconButton";
import { useMemo } from "react";
import { useAlert } from "../../hooks/useAlert";

interface Props {
  cartItem: Cart;
  checkedItems: number[];
  handleCheckItem: (id: number) => void;
  handleDeleteItem: (id: number) => void;
}
const CartItem = ({
  cartItem,
  checkedItems,
  handleCheckItem,
  handleDeleteItem,
}: Props) => {
  const { showConfirm } = useAlert();

  const isChecked = useMemo(() => {
    return checkedItems.includes(cartItem.id);
  }, [checkedItems, cartItem.id]);

  const handleCheck = () => {
    handleCheckItem(cartItem.id);
  };
  const handleDelete = () => {
    showConfirm("장바구니에서 삭제하시겠습니까?", () => {
      handleDeleteItem(cartItem.id);
    });
  };
  return (
    <StCartItem>
      <div className="info">
        <div className="check">
          <CheckIconButton
            isChecked={isChecked}
            handleCheckItem={handleCheck}
          />
        </div>
        <div>
          <Title size="medium" color="text">
            {cartItem.title}
          </Title>
          <p className="summary">{cartItem.summary}</p>
          <p className="price">{formatNumber(cartItem.price)}</p>
          <p className="quantity">{cartItem.quantity}</p>
        </div>
      </div>
      <Button size="small" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </StCartItem>
  );
};

const StCartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 12px;
  padding: 12px;

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 50px;
      flex-shrink: 0;
    }
    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;
export default CartItem;
