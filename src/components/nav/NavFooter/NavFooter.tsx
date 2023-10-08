import styled from "styled-components";

export const NavFooter = () => {
  return (
    <Wrapper>
      <WrapperInner>
        <P>EsquisseHokudai</P>
        <Div />
      </WrapperInner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  --background-color: #323131;

  background-color: var(--background-color);
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
`;

const WrapperInner = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-right: 40px;
  padding-left: 40px;
  display: flex;

  justify-content: space-between;
`;

const P = styled.p`
  --main-color: #f8b62d;

  text-align: center;
  font-size: 24px;
  color: var(--main-color);
`;

const Div = styled.div`
  display: block;
  height: 100%;
  width: 100px;
`;
