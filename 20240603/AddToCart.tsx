import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
  book: BookDetail;
}
const AddToCart = ({ book }: Props) => {
  const [quantity, setQuantity] = useState<string | number>(1);
  const { cartAdded, addToCart } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setQuantity(value === "" ? "" : Number(value));
    }
  };

  const handleIncrease = () => {
    if (typeof quantity === "string") setQuantity(1);
    else setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) return;

    if (typeof quantity === "string") setQuantity(1);
    else setQuantity(quantity - 1);
  };

  return (
    <StAddToCart $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="small" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="small" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>

      <Button size="small" scheme="primary" onClick={() => addToCart(quantity)}>
        장바구니 담기
      </Button>
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to={"/cart"}>장바구니로 이동</Link>
      </div>
    </StAddToCart>
  );
};

interface AddToCartProps {
  $added: boolean;
}

const StAddToCart = styled.div<AddToCartProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? "1" : "0")};

    transition: opacity 0.5s ease;

    p {
      padding: 0 0 8px 0;
      margin: 0%;
    }
  }
`;
export default AddToCart;
