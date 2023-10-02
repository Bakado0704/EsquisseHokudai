"use client";

import { deleteEsquisse } from "@/helpers/api-change";
import Esquisse from "@/models/esquisse";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";
import styled from "styled-components";
import personImg from "@/assets/icon/person.png";
import { getUser } from "@/helpers/api-util";
import { ChangeEsquisseButton } from "../button/ChangeEsquisseButton";
import { ChangeEsquisseModal } from "../modal/ChangeEsquisseModal"; 

type Props = {
  selectedEsquisses: Esquisse[];
  allEsquisses: Esquisse[];
  esquisseModal: boolean;
  setEsquisseModal: (value: SetStateAction<boolean>) => void;
  esquisseModalClose: () => void;
};

export const EsquisseList = ({
  selectedEsquisses,
  allEsquisses,
  esquisseModal,
  setEsquisseModal,
  esquisseModalClose,
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
              <FaceContainer>
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
    </ul>
  );
};

const Li = styled.li`
  display: flex;
  margin-top: 32px;
  align-items: center;
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
`;

const EsquisseComment = styled.p`
  --border-color: #9fa0a0;
  --background-color: #434141;

  margin-top: 10px;
  display: block;
  padding: 16px;
  font-size: 16px;
  background-color: var(--background-color);
  border: solid 3px var(--border-color);
  border-radius: 8px;
`;
