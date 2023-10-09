import styled from "styled-components";

type Props = {
  onDelete: () => void;
  onChange: () => void;
};

export const ChangePostButton = ({ onChange, onDelete }: Props) => {
  return (
    <Container>
      <Button onClick={onChange}>変更</Button>
      <span> | </span>
      <Button onClick={onDelete}>消去</Button>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 16px;
`;

const Button = styled.button`
  &:hover {
    filter: brightness(0.85);
  }
`;
