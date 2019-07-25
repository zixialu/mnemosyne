import React from 'react';
import '../styles/detailsPane.scss';

function DetailsPane({ bookmark }) {
  return bookmark && (
    <div className="details-pane">
      Details Pane
    </div>
  );
}

export default DetailsPane;
