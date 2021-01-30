import PropTypes from 'prop-types';
import styled from 'styled-components';

const Btn = styled.button`
  width: 100%;
  padding: 12px 30px;
  border: 2px solid transparent;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 1px;
  font-weight: bold;
  transition: linear 200ms;
  background-color: ${({ disabled, theme }) => (disabled ? `${theme.colors.primary}77` : theme.colors.primary)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}77`};
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
