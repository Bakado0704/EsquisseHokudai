"use client";

import styled from "styled-components";
import Image from "next/image";
import Post from "@/models/post";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  onFileUploadToFirebase: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPost: Post | undefined;
  isUploaded: boolean;
  loading: boolean;
  imageSource: string | StaticImport;
  initialImage: boolean;
};

export const ChangePostPhotoForm = ({
  onFileUploadToFirebase,
  selectedPost,
  loading,
  isUploaded,
  imageSource,
  initialImage
}: Props) => {
  // console.log((await getImage("wood-housing.png")));

  return (
    <Container>
      <Label>写真</Label>
      <RightContainer>
        <input
          multiple
          name="imageURL"
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={onFileUploadToFirebase}
        />
        <PhotoContainer>
          <PhotoInner>
            {loading ? (
              <h2>アップロード中・・・</h2>
            ) : (
              <>
                {selectedPost!.imageSource && initialImage && (
                  <Image
                    src={selectedPost!.imageSource}
                    alt="church"
                    layout={"fill"}
                    objectFit={"cover"}
                  />
                )}
                {isUploaded && (
                  <>
                    {imageSource && (
                      <Image
                        src={imageSource}
                        alt="church"
                        layout={"fill"}
                        objectFit={"cover"}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </PhotoInner>
        </PhotoContainer>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid white;
`;

const RightContainer = styled.div`
  width: 90%;
`;

const Label = styled.label`
  width: 10%;
  text-align: center;
`;

const PhotoContainer = styled.div`
  --color-background: #dcdddd;

  width: 100%;
  height: 500px;
  padding-right: 80px;
  padding-left: 80px;
  margin-top: 8px;
  background-color: var(--color-background);
`;

const PhotoInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
