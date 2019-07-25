import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/detailsPane.scss';

function DetailsPane({ bookmark, close }) {

  return (
    <TransitionGroup component={null}>
      {bookmark && (
        <CSSTransition in={Boolean(bookmark)} timeout={200} classNames="slide">
          <div className="details-pane">
            <h3>Details Pane <button onClick={close}>x</button></h3>
            {JSON.stringify(bookmark)}
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}

export default DetailsPane;
