import styled from "styled-components";

type Props = {
  onDelete: () => void;
  onChange: () => void;
};

export const ChangePostButton = ({ onChange, onDelete }: Props) => {
  return (
    <Container>
      <button onClick={onChange}>変更</button>
      <span> | </span>
      <button onClick={onDelete}>消去</button>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 8px;
`;
