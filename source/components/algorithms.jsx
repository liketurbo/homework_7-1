import React from 'react';

export default ({
  algorithms, currentAlgorithm, clickHandler,
}) => (
  <div className="algorithms">
    {
      Object.keys(algorithms).map((name, key) => (
        <div
          className={
            key !== currentAlgorithm
            ? 'algorithm'
            : 'algorithm algorithm--clicked'
          }
          role="button"
          tabIndex="0"
          key={key}
          onClick={() => clickHandler(key)}
        >{name}
        </div>
      ))
    }
  </div>
);
