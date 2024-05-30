import React, { forwardRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: "text" | "email" | "password" | "number";
}

const InputText = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, inputType, onChange, ...props }, ref) => {
    return (
      <StInputText
        placeholder={placeholder}
        type={inputType}
        onChange={onChange}
        {...props}
        ref={ref}
      />
    );
  }
);

const StInputText = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;
export default InputText;
