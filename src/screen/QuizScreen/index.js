import { useEffect, useState } from 'react';
// import db from '../../../db.json';
import Footer from '../../components/Footer';
import GithubCorner from '../../components/GithubCorner';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import Widgets from '../../components/Widgets';
import QuizContainer from '../../components/QuizContainer';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';

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

function ResultWidget({ results }) {
  return (
    <Widgets>
      <Widgets.Header>
        <BackLinkArrow href="/" />
        <h1>
          Você acertou
          {' '}
          {results.filter((result) => result).length}
          {' '}
          questões
        </h1>
      </Widgets.Header>
      <Widgets.Content>
        <p>Resultado de cada questão: </p>
        <ul>
          {results.map((result, resultIndex) => {
            const liId = `${result}__${resultIndex}`;
            return (
              <li key={liId}>
                <p>
                  #
                  {resultIndex + 1}
                  {' '}
                  você
                  {' '}
                  {result ? 'Acertou 😎' : 'Errou 😱'}
                </p>
              </li>
            );
          })}
        </ul>
      </Widgets.Content>
    </Widgets>
  );
}

function QuizWidget({
  questionIndex, totalQuestions, questions, onSubmit,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isQuestionCorrect = questions.answer === selectedAlternative;
  const hasSelectAlternative = selectedAlternative !== undefined;

  function handlerQuestionSubmit(e) {
    e.preventDefault();
    setIsFormSubmited(true);
    setTimeout(() => {
      onSubmit(isQuestionCorrect);
      setSelectedAlternative(undefined);
      setIsFormSubmited(false);
    }, 3 * 1000);
  }

  return (
    <Widgets>
      <Widgets.Header>
        <BackLinkArrow href="/" />
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
        <h2>{questions.title}</h2>

        <p>{questions.description}</p>

        <AlternativesForm onSubmit={handlerQuestionSubmit}>
          {questions.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const dataSelected = selectedAlternative === alternativeIndex;
            const dataStatus = isQuestionCorrect ? 'SUCCESS' : 'ERROR';
            return (
              <Widgets.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={dataSelected}
                data-status={isFormSubmited && dataStatus}
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name={questionId}
                  id={alternativeId}
                  onChange={() => {
                    setSelectedAlternative(alternativeIndex);
                  }}
                />
                {alternative}
              </Widgets.Topic>
            );
          })}

          {/* <pre>{JSON.stringify(questions, null, 4)}</pre> */}

          <Button
            type="submit"
            disabled={!hasSelectAlternative}
            value="Confirmar"
          />
        </AlternativesForm>
      </Widgets.Content>
    </Widgets>
  );
}

const screen = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState('LOADING');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const questionIndex = currentQuestion;
  const questions = externalQuestions[questionIndex];

  useEffect(() => {
    // atualiza apenas na primeira renderização
    setTimeout(() => {
      setScreenState('QUIZ');
    }, 1 * 1000);
  }, []);

  function handleSubmit(questionResult) {
    setResults([...results, questionResult]);
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState('RESULT');
    }
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
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

        {screenState === screen.RESULT && <ResultWidget results={results} />}

        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/brian-izaki/Projeto_Alura_2" />
    </QuizBackground>
  );
}
