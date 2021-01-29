import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 10px;
  margin-bottom: 10px;
  border: 2px solid blueviolet;
`;

export default function Input({
  onChange, placeholder, name,
}) {
  return (
    <div>
      <InputBase type="text" name={name} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
