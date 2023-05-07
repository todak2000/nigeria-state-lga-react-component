import React, { useEffect, useState } from 'react';
import { lgas } from "../Constants/lga";


type lgaProps = {
  id: string;
  state: string;
  lga: string[];
}

const useStateLGAApi = (singleState?: string): lgaProps[] => {
  const [allLGAData, setAllLGAData] = useState<lgaProps[]>(lgas);
  
  let returnData: any[];

  useEffect(() => {
    
    try {
      setAllLGAData(lgas);
    } catch (err) {
      console.error(err);
    }
  }, []);
  if (singleState) {
    returnData = allLGAData.filter(stateData => stateData.state.toLocaleLowerCase() === singleState.toLocaleLowerCase())
  }
  else{
    returnData = allLGAData.map((item: lgaProps) => item.lga).flat().sort();
  }
  return returnData ;
};

export default useStateLGAApi;