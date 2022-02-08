import styled from "styled-components";

const Input = (props): JSX.Element => (
  <InputForm
    value={props.value}
    type={props.type}
    placeholder={props.placeholder}
    ref={props.forwardedRef}
  />
);

export default Input;

const InputForm = styled.input`
  border: 3px solid black;
  border-radius: 3px;
  box-sizing: border-box;
  height: 60px;
  margin-bottom: 20px;
  padding-left: 10px;
  width: 100%;

  ::placeholder {
    color: #b3b3b3;
  }

  :focus {
    border: 3px solid #5551ff;
    box-shadow: 0 0 5px #719ece;
    outline: none !important;
  }
`;
