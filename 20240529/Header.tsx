import styled from "styled-components";

const Header = () => {
  return (
    <StHeader>
      <h1>Book Store</h1>
    </StHeader>
  );
};

const StHeader = styled.header`
  background-color: ${({ theme }) => theme.color.background};

  h1 {
    color: ${(props) => props.theme.color.primary};
  }
`;

export default Header;
