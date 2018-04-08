import React from 'react';

export default ({ speed }) => (
  <div className="speed">
    <span className="speed__start">Speed&nbsp;</span>
    <span className="speed__content">{Math.round(speed * 100) / 100}</span>
    <span className="speed__end">&nbsp;milliseconds</span>
  </div>
);
