import PropTypes from 'prop-types';
import styled from 'styled-components';

const Btn = styled.button`
  width: 100%;
  padding: 12px 30px;
  border: 2px solid transparent;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  transition: linear 200ms;
  background-color: ${({ disabled }) => (disabled ? '#8A2BE277' : '#8A2BE2')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#8A2BE277' : '#601e9e')};
  }
`;

export default function Button({ type, value, disabled }) {
  return (
    <div>
      <Btn type={type} disabled={disabled}>
        {value}
      </Btn>
    </div>
  );
}

Button.defaultProps = {
  type: 'submit',
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
};
