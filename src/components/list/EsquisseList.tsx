"use client";

import { deleteEsquisse, getUser } from "@/helpers/api-util";
import Esquisse from "@/models/esquisse";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";
import styled from "styled-components";
import personImg from "@/assets/icon/person.png";
import { ChangeEsquisseButton } from "../button/ChangeEsquisseButton";
import { ChangeEsquisseModal } from "../modal/ChangeEsquisseModal";

type Props = {
  selectedEsquisses: Esquisse[];
  allEsquisses: Esquisse[];
  esquisseModal: boolean;
  setEsquisseModal: (value: SetStateAction<boolean>) => void;
  esquisseModalClose: () => void;
  sideAppear: () => void;
};

export const EsquisseList = ({
  selectedEsquisses,
  allEsquisses,
  esquisseModal,
  setEsquisseModal,
  esquisseModalClose,
  sideAppear
}: Props) => {
  const router = useRouter();
  const user = getUser();

  return (
    <ul>
      {selectedEsquisses.map((esquisse) => {
        const esquisseIndex = allEsquisses.indexOf(esquisse);

        const changeEsquisseHandler = () => {
          setEsquisseModal(true);
        };
        const deleteEsquisseHandler = () => {
          deleteEsquisse(esquisseIndex);
          router.push(`/esquisse/${esquisse.id}`);
        };

        return (
          <Li key={esquisse.key}>
            <Person>
              <FaceContainer style={{ backgroundColor: "#D3BDD9" }}>
                <Image src={personImg} alt="tag" width={100} height={100} />
              </FaceContainer>
              <DisplayName>{esquisse.user.displayName}</DisplayName>
            </Person>
            <EsquisseContainer>
              {user && esquisse.user.uid === user.uid && (
                <ChangeEsquisseButton
                  onChange={changeEsquisseHandler}
                  onDelete={deleteEsquisseHandler}
                />
              )}
              <EsquisseComment>{esquisse.description}</EsquisseComment>
            </EsquisseContainer>
            {esquisseModal && (
              <ChangeEsquisseModal
                id={esquisse.key}
                modalClose={esquisseModalClose}
              />
            )}
          </Li>
        );
      })}
      <Line />
      <Button onClick={sideAppear}>メッセージを投稿する</Button>
    </ul>
  );
};

const Li = styled.li`
  display: flex;
  margin-top: 32px;
  align-items: flex-start;
`;

const Person = styled.div`
  margin-right: 24px;
`;

const FaceContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
`;

const DisplayName = styled.p`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;

const EsquisseContainer = styled.div`
  position: relative;
  margin-top: 8px;
`;

const EsquisseComment = styled.p`
  --border-color: #9fa0a0;
  --background-color: #727171;

  margin-top: 10px;
  display: block;
  padding: 16px;
  font-size: 16px;
  background-color: var(--background-color);
  border: solid 3px var(--border-color);
  border-radius: 8px;
`;

const Line = styled.div`
  border-top: 1px solid white;
  margin-top: 24px;
`;

const Button = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  padding: 8px 32px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
  margin: 32px auto 0;

  &:hover {
    filter: brightness(0.85);
  }
`;
