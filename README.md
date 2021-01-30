# Quiz desenvolvido na Imersão React 2 da Alura

O tema escolhido para o quizz foi o de histórias em quadrinhos clássicos como snoopy, garfield, mafalda, etc.

## Utilizado

- [template de next com styled components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)

---

## Anotações

### Dia 1

- Feito:

  - foi montado o layout do quiz:

    - criado diretório components
    
    - criado principais componentes como os Widgets, GithubCorner

  - utilizado um arquivo db.json para centralizar questões, cores e temas do layout

- Visto:

  - Com o template do Next com Styled components, já é montado a estrutura de diretórios rapidamente.

  - O arquivo package.json já possui _scripts_ preparados, o que utiliza durante o desenvolvimento é o _dev_
  - No diretório **pages** ficam os arquivos principais, na qual o próprio Next vai realizar o processo de build.

  - Diretório _pages_:

    - Arquivo **\_app.js**:
      - fica o nosso _"reset.css" (GlobalStyle)_.

      - o código que é padrão para todas as páginas que forem criadas (ex: Head do HTML, tema da página, etc).

    - Arquivo **index.js**:

      - é montado o layout da primeira página juntando os components criados dentro da pasta _components_

### Dia 2

- Feito:

  - Add tags no `<head>` do HTML

  - Add eslint no projeto e customizado algumas regras no eslint

  - Criado um `<form>` para que o usuário passe o nome dele para realizar o quiz

  - Criado uma nova página para ter os quizes

- Visto:

  - o eslint define padrões de formatação de código:

    - ```shell
      # inicia o lint
      npx eslint --init

      # realiza auto-correção de erros padrões
      npx eslint caminho_diretorio --fix
      ```

    - após realizar o init, é gerado um arquivo `.eslintrc.js`, nele pode ser formatado regras (_rules_) que a pessoa desejar, além disso, nele possui outras configurações que são geradas automaticamente junto com o init.

    - para verificar o tipo de um erro é necessário passar o mouse em cima do sublinhado de erro, e clicar no link que aparece na frente da info de erro.

  - Para **criar uma nova página**, basta criar um novo arquivo _nome_da_pagina.js_ no diretório **pages**, que o Next vai reconhecer automaticamente (_na URL fica o nome do arquivo escolhido como página_)

  - Roteamento de url utilizando o hook do Next `useRoute`, por baixo dos panos ele utiliza o [history API](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API) que é nativo dos broswers.

  - Hook `useState` do próprio React para armazenar e setar estados.

### Dia 3
- Feito:
  - Montado o layout da página de quizz
  - O componente Widget possui "sub-componentes" ex: Widgets.Header
  - Criado componentes para o formulário, Button e Input.
    - foi utilizado o PropTypes neles.

- Visto:
  - Ciclo de vida do React - nasce(DidMount), irá atualiza(WillUpdate), irá finalizar(WillUnmount). 
  - Efeitos Colaterais - é qualquer evento que afeta algo fora do escopo atual onde a função está sendo executada.
    - Buscar dados, configurar uma subscription, e mudar o DOM manualmente dentro dos componentes React são exemplos de efeitos colaterais
  - [**PropTypes**](https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html) - realiza uma checagem de tipos nas props do componente (a ideia é semelhante ao TypeScript).
    - Para utilizar, é necessário instalar ele com `npm install prop-types`
    - ``` JavaScript
      // Criando componente
      function Componente({ nome, idade }){
        return (
          <div> {nome} </div>
          <div> {idade + idade} </div>
        )
      }

      // define um valor default para a prop
      Componente.defaultProps = {
        nome: 'Tony Tony Chopper',
      }

      // define os tipos para cada prop
      Componente.propTypes = {
        nome: PropTypes.string,
        idade: PropTypes.number.isRequired,
      };
      ```
  - *Atrinbuto **as*** - Um componente quando utiliza o styled-component pode alterar a tag do componente montado para outro no momento de utilizar esse componente.
    - ``` JavaScript
      // definido um componente com a tag a
      const Option = styled.a`
        color: blueViolet;
      `
      // Option seria uma tag a, mas o atributo alterou para ser uma label.
      <Oprion as="label">
      ```

### Dia 4
- Feito:
  - montado a lógica de funcionamento do quizz
  - criado o componente de Widget para os resultados
  - adicionado o componente AlternativeForms que possui um CSS que adiciona estilos dependendo do valor de data-selected e data-status.
  - utilizado useState e useEffect nos componentes da pagina de quizz

- Visto:
  - **LambdaServer** - com o Next é possível montar uma rota assim como no express. o arquivo pages/api/db.js é um exemplo disso.