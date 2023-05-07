

import React, { useState } from 'react';
import useStateLGAApi from '../Api/useStateLGAApi';
import useStatesApi from '../Api/useStatesApi';

type statesProps = {
    id: string;
    state: string;
    region: string;
    slogan: string;
  }

  type lgaProps = {
    id: string;
    state: string;
    lga: string[];
  }

function StateLGAWidget() {
  const [state, setState] = useState('');
  const [LGA, setLGA] = useState('');
  const lgaData = useStateLGAApi(state);
  const states = useStatesApi();

  return (
    <div>
      <select value={state} onChange={e => setState(e.target.value)}>
      <option  defaultValue="select">Select State</option>
      {states.map(({id, state, slogan}: statesProps) => (
        <option key={id} value={state}>{state}</option>
      ))}
      </select>
      {lgaData.map(({id, state, lga}: lgaProps) => (
        <select value={LGA} onChange={e => setLGA(e.target.value)}>
        <option  defaultValue="select">Select LGA</option>
        {lga.map((lg: string, index: number) => (
          <option key={index} value={lg}>{lg}</option>
        ))}
        </select>
      ))}

    </div>
  );
}

export default StateLGAWidget;