import db from '../../db.json';
import QuizScreen from '../../src/screen/QuizScreen';

export default function QuizPage() {
  return (
    <QuizScreen dbQuestions={db.questions} dbBg={db.bg} />
  );
}
