import Button from "@material-ui/core/Button";
import styled from "styled-components";

type Props = {
  children: React.ReactChild;
};
const SubmitButton = ({ children, ...props }: Props) => {
  return (
    <StyledButton
      type="submit"
      fullWidth
      variant="contained"
      {...props}
      style={{}}
    >
      {children}
    </StyledButton>
  );
};

export default SubmitButton;

const StyledButton = styled(Button)`
  &.MuiButton-contained {
    background-color: #07ad7e;

    color: #fff;
    font-size: 12px;
    margin: 10px 0;
    padding: 18px 36px;

    :hover {
      background-color: #07ad7e;
    }
  }
`;
