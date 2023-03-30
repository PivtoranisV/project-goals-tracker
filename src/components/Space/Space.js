import React, { useState } from 'react';
import SpaceStarter from './SpaceStarter';
import SpaceFact from './SpaceFact';

const Space = () => {
  const [showStarter, setShowStarter] = useState(true);

  const showStarterHandler = () => {
    setShowStarter(false);
  };

  return (
    <React.Fragment>
      {showStarter ? (
        <SpaceStarter onShowStarter={showStarterHandler} />
      ) : (
        <SpaceFact />
      )}
    </React.Fragment>
  );
};

export default Space;
