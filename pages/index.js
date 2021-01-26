import styled from "styled-components";
import db from "../db.json";
import Footer from "../src/components/Footer";
import GithubCorner from "../src/components/GithubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Widgets from "../src/components/Widgets";
import Head from "next/head";

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 320px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:image" content={db.bg}/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:width" content="800"/>
        <meta property="og:image:height" content="600"/>
        <meta property="description" content="Quiz sobre histórias em quadrinhos do Snoopy, Garfield, Mafalda, etc" />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />

          <Widgets>
            <Widgets.Header>
              <h1>{db.title}</h1>
            </Widgets.Header>
            <Widgets.Content>
              <p>{db.description}</p>
            </Widgets.Content>
          </Widgets>

          <Widgets>
            <Widgets.Content>
              <h1>Quizes da Galera</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </Widgets.Content>
          </Widgets>

          <Footer />
        </QuizContainer>
        <GithubCorner projectUrl="" />
      </QuizBackground>
    </>
  );
}
