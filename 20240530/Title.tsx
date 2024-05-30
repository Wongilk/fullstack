import styled from "styled-components";
import { ColorKey } from "../../style/theme";

interface Props {
  children: React.ReactNode;
  size: "large" | "medium" | "small";
  color?: ColorKey;
}

const Title = ({ children, size, color }: Props) => {
  return (
    <StTitle size={size} color={color}>
      {children}
    </StTitle>
  );
};

const StTitle = styled.h1<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.primary};
`;
export default Title;
