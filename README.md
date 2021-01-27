# Quiz desenvolvido na Imersão React 2 da Alura
O tema escolhido para o quizz foi o de histórias em quadrinhos clássicos como snoopy, garfield, mafalda, etc.

## Utilizado
- [template de next com styled components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)

---

## Anotações
### Dia 1

- Desenvolvido:
  - foi montado o layout do quiz:
    - criado diretório components
    - criado principais componentes como os Widgets, GithubCorner
  - utilizado um arquivo db.json para centralizar questões, cores e temas do layout
- Visto: 
  - Com o template do Next com Styled components, já é montado a estrutura de diretórios rapidamente. 
  - O arquivo package.json já possui *scripts* preparados, o que utiliza durante o desenvolvimento é o *dev*
  - No diretório **pages** ficam os arquivos principais, na qual o próprio Next vai realizar o processo de build.
  - Diretório *pages*:
    - Arquivo **_app.js**:
      - fica o nosso *"reset.css" (GlobalStyle)*.
      - o código que é padrão para todas as páginas que forem criadas (ex: Head do HTML, tema da página, etc).
    - Arquivo **index.js**:
      - é montado o layout da primeira página juntando os components criados dentro da pasta *components*
