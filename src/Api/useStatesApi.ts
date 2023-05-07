import React, { useEffect, useState } from 'react';
import { states } from "../Constants/states";

type statesProps = {
  id: string;
  state: string;
  region: string;
  slogan: string;
}

const useStatesApi = (): statesProps[] => {
  const [statesData, setStatesData] = useState<statesProps[]>(states);

  useEffect(() => {
    try {
      setStatesData(states);
    } catch (err) {
      console.error(err);
    }
  }, [states]);

  return statesData;
};

export default useStatesApi;