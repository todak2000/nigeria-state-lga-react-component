import React, { useEffect, useState } from 'react';
import { regions } from "../Constants/regions";

type regionsProps = {
  id: string;
  region: string;
}

const useRegionsApi = (): regionsProps[] => {
  const [regionsData, setRegionsData] = useState<regionsProps[]>(regions);

  useEffect(() => {
    try {
      setRegionsData(regions);
    } catch (err) {
      console.error(err);
    }
  }, [regions]);

  return regionsData;
};

export default useRegionsApi;