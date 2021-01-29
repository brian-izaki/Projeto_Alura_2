import { useEffect, useState } from 'react';
import db from '../db.json';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widgets from '../src/components/Widgets';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widgets>
      <Widgets.Header>
        <h1>Carregando...</h1>
      </Widgets.Header>
      <Widgets.Content>
        <p>Carregando descrição...</p>
      </Widgets.Content>
    </Widgets>
  );
}

function QuizWidget({
  questionIndex, totalQuestions, questions, onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widgets>
      <Widgets.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widgets.Header>
      <img
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={questions.image}
        alt=""
      />
      <Widgets.Content>
        <p>{db.description}</p>

        <h2>{questions.title}</h2>

        <p>{questions.description}</p>
        <form onSubmit={onSubmit}>

          {questions.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widgets.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
              >
                <input type="radio" name={questionId} id={alternativeId} />
                {alternative}
              </Widgets.Topic>
            );
          })}
          {/* <pre>
            {JSON.stringify(questions, null, 4)}
          </pre> */}

          <Button type="submit" value="Confirmar" />
        </form>
      </Widgets.Content>
    </Widgets>
  );
}

export default function QuizPage() {
  const [screenState, setScreenState] = useState('LOADING');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const questions = db.questions[questionIndex];
  const screen = {
    LOADING: 'LOADING',
    QUIZ: 'QUIZ',
    RESULT: 'RESULT',
  };

  useEffect(() => {
    // atualiza apenas na primeira renderização
    setTimeout(() => {
      setScreenState('QUIZ');
    }, 1 * 1000);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState('RESULT');
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screen.QUIZ && (
          <QuizWidget
            questions={questions}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
          />
        )}

        {screenState === screen.LOADING && <LoadingWidget />}

        {screenState === screen.RESULT && <div> Acertou esta quantia ... </div>}

        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/brian-izaki/Projeto_Alura_2" />
    </QuizBackground>
  );
}
