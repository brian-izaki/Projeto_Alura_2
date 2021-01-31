import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screen/QuizScreen';

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen externalQuestions={externalDb.questions} externalBg={externalDb.bg} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const projectLink = context.query.id.replace('___', '.');
  try {
    const externalDb = await fetch(`https://${projectLink}.vercel.app/api/db`)
      .then((dbApi) => {
        if (dbApi.ok) {
          return dbApi.json();
        }
        throw new Error('Erro na requisição');
      })
      .then((dbjson) => dbjson)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    return {
      props: {
        externalDb,
      },
    };
  } catch (err) {
    // pode ser passado redirects aqui
    throw new Error(`erro ao pegar dados da dbAPI de ${projectLink}`);
  }
}
