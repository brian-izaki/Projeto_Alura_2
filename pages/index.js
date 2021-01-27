import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widgets from '../src/components/Widgets';
import NameForm from '../src/components/NameForm';

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
  const router = useRouter();
  const [name, setName] = useState('');

  function handlerSubmit(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  function handlerChange(e) {
    setName(e.target.value);
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />

          <Widgets>
            <Widgets.Header>
              <h1>{db.title}</h1>
            </Widgets.Header>
            <Widgets.Content>
              <p>{db.description}</p>

              <NameForm
                onChange={handlerChange}
                onSubmit={handlerSubmit}
                isDisabled={name.length === 0}
              />

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
