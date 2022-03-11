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
      style={{
        backgroundColor: "#07ad7e",
        padding: "18px 36px",
        margin: "10px 0",
        fontSize: "12px",
        color: "white"
      }}
    >
      {children}
    </StyledButton>
  );
};

export default SubmitButton;

const StyledButton = styled(Button)`
  color: aquamarine;
`;
