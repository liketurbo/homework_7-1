import React from 'react';

export default ({
  input, output, clickHandler, changeHandler,
}) => (
  <div className="suggest" >
    <input
      value={input}
      className="suggest__input"
      onChange={e => changeHandler(e)}
    />
    <button
      className="suggest__button"
      onClick={() => clickHandler()}
    >Suggest
    </button>
    <div className="suggest__output">
      {
        output.map((elem, index) => (
          <div key={index} className="output__item">{elem}</div>
        ))
      }
    </div>
  </div>
);
