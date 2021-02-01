import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widgets from '../src/components/Widgets';
import Link from '../src/components/Link';
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

          <Widgets
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
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
                <Button disabled={name.length === 0}>
                  Iniciar Quiz
                </Button>
              </form>

            </Widgets.Content>
          </Widgets>

          <Widgets
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
            <Widgets.Content>
              <h1>Quizes da Galera</h1>

              <ul>
                {db.external.map((linkExterno, linkIndex) => {
                  const linkKey = `linkExterno__${linkIndex}`;
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');

                  return (
                    <li key={linkKey}>
                      <Widgets.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}`}
                      >
                        {`${projectName}/ ${githubUser}`}
                      </Widgets.Topic>
                    </li>
                  );
                })}
              </ul>

            </Widgets.Content>
          </Widgets>

          <Footer />
        </QuizContainer>
        <GithubCorner projectUrl="" />
      </QuizBackground>
    </>
  );
}
