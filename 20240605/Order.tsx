import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import { StCart as StOrder } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "../models/order.model";
import FindAddressButton from "../components/order/FindAddressButton";
import { order } from "../api/order.api";
import { useAlert } from "../hooks/useAlert";

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

const Order = () => {
  const location = useLocation();
  const orderDataWithoutDelivery = location.state;
  const { totalQuantity, totalPrice, firstBookTitle } =
    orderDataWithoutDelivery;
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handleOrder = (data: DeliveryForm) => {
    const orderSheet: OrderSheet = {
      ...orderDataWithoutDelivery,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };
    showConfirm("주문을 하시겠습니까?", async () => {
      try {
        await order(orderSheet);
        showAlert("주문에 성공하였습니다.");
        navigate("/orderlist");
      } catch (error) {
        showAlert("주문에 실패하였습니다.");
        console.error(error);
      }
    });
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <StOrder>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    type="text"
                    {...register("address", { required: true })}
                  />
                </div>
                <FindAddressButton
                  onComplete={(address) => {
                    setValue("address", address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className="error-text">주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    type="text"
                    {...register("addressDetail", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">상세 주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    type="text"
                    {...register("receiver", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error-text">수령인을 입력해주세요</p>
              )}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    type="tel"
                    {...register("contact", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">전화번호를 입력해주세요</p>
              )}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 외 총 {totalQuantity - 1}권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
          <Button
            size="medium"
            scheme="primary"
            onClick={handleSubmit(handleOrder)}
          >
            결제하기
          </Button>
        </div>
      </StOrder>
      ;
    </>
  );
};
export default Order;
