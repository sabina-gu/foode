import styled from "styled-components";

export const Title = styled.span`
  display: inline-block;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Subtitle = styled.span`
  color: #666666;
  display: inline-block;
  font-size: 14px;
  margin-bottom: 20px;
  margin-right: 5px;
`;

export const Highlighted = styled.a`
  color: #5551ff;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 30px;
  :hover {
    color: #4542d6;
  }
`;

export const Submit = styled.button`
  background-color: #00bc87;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 18px 35px;
  width: 100%;

  :hover {
    background-color: #07ad7e;
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 350px;
  padding-top: 100px;
`;

export const WrapperInside = styled.div`
  margin-top: 20px;
  width: 100%;
`;
