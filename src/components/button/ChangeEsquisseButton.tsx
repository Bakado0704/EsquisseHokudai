import styled from "styled-components";

type Props = {
  onDelete: () => void;
  onChange: () => void;
};

export const ChangeEsquisseButton = ({ onChange, onDelete }: Props) => {
  return (
    <Container>
      <button onClick={onChange}>変更</button>
      <span> | </span>
      <button onClick={onDelete}>消去</button>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: -16px;
`;
