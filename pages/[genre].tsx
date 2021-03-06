import { GetStaticProps } from "next";
import Head from "next/head";
import Track from "../components/Tracks/Tracks";

export const capsFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Genre = (props: any) => {
  return (
    <div>
      <Head>
        <title>{capsFirstLetter(props.genre)}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{capsFirstLetter(props.genre)}</h1>
      {props.tracks &&
        props.tracks.map((track: any) => {
          if (track.preview_url) {
            return <Track track={track}></Track>;
          }
        })}
    </div>
  );
};

export const getStaticPaths = async () => {
  const data: any = await fetch(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_0AUTH_TOKEN}`,
      },
    }
  ).then((response) => response.json());

  const genrePaths = data.genres.map((genre: any) => {
    return { params: { genre } };
  });

  return {
    paths: genrePaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (paths: any) => {
  const data = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_genres=${paths.params.genre}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_0AUTH_TOKEN}`,
      },
    }
  ).then((response) => response.json());

  return {
    props: {
      genre: paths.params.genre,
      tracks: data.tracks,
    },
  };
};

export default Genre;
