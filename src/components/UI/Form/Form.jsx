import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Form.less';

function Form({ title, children, className }) {
  return (
    <form
      className={`${className ? className : 'form'}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="form-title">{title}</h1>
      {children}
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Form;
