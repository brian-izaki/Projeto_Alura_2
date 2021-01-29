import { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widgets from '../src/components/Widgets';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer';

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

              <form onSubmit={handlerSubmit}>
                <Input
                  onChange={handlerChange}
                  placeholder="Digite o seu nome aqui"
                  name="player"
                />
                <Button disabled={name.length === 0} value="Iniciar Quiz" />
              </form>

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
