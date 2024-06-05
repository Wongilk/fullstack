import styled from "styled-components";
import Button from "../common/Button";
import { useEffect } from "react";

interface Props {
  onComplete: (address: string) => void;
}
const SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const FindAddressButton = ({ onComplete }: Props) => {
  const handleOpen = () => {
    new window.daum.Postcode({
      onComplete: (data: any) => {
        onComplete(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <StFindAddressButton>
      <Button size="small" scheme="normal" type="button" onClick={handleOpen}>
        주소 찾기
      </Button>
    </StFindAddressButton>
  );
};

const StFindAddressButton = styled.div``;
export default FindAddressButton;
