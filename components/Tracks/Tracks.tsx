import Image from "next/image";
import styled from "styled-components";

const Container: any = styled.div`
  height: 200px;
  width: 200px;
`;

export const Track = ({ track }: any) => {
  return (
    <li key={track.id}>
      <a href={`${track.preview_url}`} target={"_blank"} rel="noreferrer">
        {track.name}
      </a>
      <Container>
        <Image
          src={track.album.images[0].url}
          height={track.album.images[0].height}
          width={track.album.images[0].width}
          alt={track.name}
          layout={"responsive"}
        />
      </Container>
    </li>
  );
};

export default Track;
