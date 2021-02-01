import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import GithubCorner from '../../components/GithubCorner';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import Widgets from '../../components/Widgets';
import QuizContainer from '../../components/QuizContainer';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import Link from '../../components/Link';

const screen = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

const StyleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
`;

export default function QuizPage({ dbQuestions, dbBg }) {
  const [screenState, setScreenState] = useState('LOADING');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = dbQuestions.length;
  const questionIndex = currentQuestion;
  const questions = dbQuestions[questionIndex];

  useEffect(() => {
    // atualiza apenas na primeira renderização
    setTimeout(() => {
      setScreenState('RESULT');
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
    <QuizBackground backgroundImage={dbBg}>

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
    }, 1 * 1000);
  }

  function listAlternatives() {
    return questions.alternatives.map((alternative, alternativeIndex) => {
      const alternativeId = `alternative__${alternativeIndex}`;
      const dataSelected = selectedAlternative === alternativeIndex;
      const dataStatus = isQuestionCorrect ? 'SUCCESS' : 'ERROR';

      return (
        <Widgets.Topic
          as={motion.label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
            onClick={() => {
              setSelectedAlternative(alternativeIndex);
            }}
            // checked={selectedAlternative !== undefined}
          />
          {alternative}
        </Widgets.Topic>
      );
    });
  }

  return (
    <Widgets
      as={motion.section}
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 1 }}
    >
      <Widgets.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widgets.Header>
      <img
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
        }}
        src={questions.image}
        alt=""
      />
      <Widgets.Content>
        <h2>{questions.title}</h2>

        <p>{questions.description}</p>

        <AlternativesForm onSubmit={handlerQuestionSubmit}>

          {listAlternatives()}

          <Button
            type="submit"
            disabled={!hasSelectAlternative}
          >
            Confirmar
          </Button>
        </AlternativesForm>
      </Widgets.Content>
    </Widgets>
  );
}

function LoadingWidget() {
  return (
    <Widgets>
      <Widgets.Header>
        <h1>Carregando...</h1>
      </Widgets.Header>
      <Widgets.Content>
        Carregando...
      </Widgets.Content>
    </Widgets>
  );
}

function ResultWidget({ results }) {
  function listResults() {
    return results.map((result, resultIndex) => {
      const alternativeId = `${result}__${resultIndex}`;
      return (
        <li key={alternativeId}>
          <p>
            <strong>
              {`#${resultIndex + 1} `}
            </strong>
            {`você ${result ? 'Acertou 😎' : 'Errou 😱'}`}
          </p>
        </li>
      );
    });
  }

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
          {listResults()}
        </ul>
        <Button>
          <StyleLink href="/">Voltar ao início</StyleLink>
        </Button>
      </Widgets.Content>
    </Widgets>
  );
}
