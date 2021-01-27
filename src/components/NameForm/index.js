import styled from 'styled-components';

const NameInput = styled.input`
  padding: 12px 10px;
  margin-bottom: 10px;
  border: 1px solid blueviolet;
`;

const BtnSubmit = styled.button`
  padding: 12px 30px;
  background-color: ${({ disabled }) => (disabled ? '#8A2BE277' : '#8A2BE2')};
  border: 2px solid transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;
  color: white;
`;

export default function NameForm({ onSubmit, isDisabled, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <NameInput type="text" placeholder="Digite o seu nome" onChange={onChange} />

      <BtnSubmit type="submit" disabled={isDisabled}>
        Iniciar Quiz
      </BtnSubmit>
    </form>
  );
}
