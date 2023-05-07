

import React, { useState, useEffect } from 'react';
import useStateLGAApi from '../Api/useStateLGAApi';
import MultiSelectDropdown from '../components/MultiSelectComponent';
import SingleSelectDropdown from '../components/SingleSelectComponent';

  type lgaProps = {
    setLGAState: React.Dispatch<React.SetStateAction<any>>;
    state?: string | undefined;
    className?: string;
    style?: object;
    isMultipleSelect?: boolean;

    selectClassName?: string;
    selectStyle?:object;
    dropdownClassName?: string;
    dropdownStyle?: object;
    selectedItemClass?: string;
    selectedItemStyle?: object;
    optionsContainerClass?: string;
    optionsContainerStyle?: object;
    optionsClass?: string;
    optionsStyle?: object;
    searchClass?: string;
    searchStyle?: object;
    searchContainerClass?: string;
    searchContainerStyle?: object;
  }

const LGAWidget = ({
    setLGAState,
    state, 
    className="", 
    style={padding: 5}, 
    isMultipleSelect,
    selectClassName, selectStyle,
    dropdownClassName, dropdownStyle,
    selectedItemStyle, selectedItemClass,
    optionsContainerStyle, optionsContainerClass,
    optionsStyle, optionsClass,
    searchStyle, searchClass,
    searchContainerStyle, searchContainerClass,
}: lgaProps) => {
  
  const [LGA, setLGA] = useState('');
  const [selected, setSelected] = useState<string[]>([])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const lgaData = state && state !=='' ? useStateLGAApi(state) : useStateLGAApi();

  const handleSelect = (e: string | any)=>{
    setLGA(e)
    setLGAState(e)
  }
  const onChange = (state: string) => {
    setSelected(prevSelected => {
        // if it's in, remove
        const newArray = [...prevSelected]
        if (newArray.includes(state)) {
            return newArray.filter(item => item !== state)
            // else, add
        } else {
            newArray.push(state)
            return newArray;
        }
    })
    
}
useEffect(() => {
  if (isMultipleSelect) {
    setLGAState(selected)
  }
}, [isMultipleSelect, selected, setLGAState])
  return (
    <>
    {
    isMultipleSelect ?
    <MultiSelectDropdown 
    options={lgaData} 
    selected={selected} 
    onChange={onChange}
    selectClassName={selectClassName} 
    selectStyle={selectStyle}
    dropdownClassName={dropdownClassName} 
    dropdownStyle={dropdownStyle}
    selectedItemStyle={selectedItemStyle} 
    selectedItemClass={selectedItemClass}
    optionsContainerStyle={optionsContainerStyle} 
    optionsContainerClass={optionsContainerClass}
    optionsStyle={optionsStyle} 
    optionsClass={optionsClass}
    searchStyle={searchStyle} 
    searchClass={searchClass}
    searchContainerStyle={searchContainerStyle} 
    searchContainerClass={searchContainerClass}
    />
    :
    <SingleSelectDropdown 
    options={state && state !=='' ? lgaData[0]?.lga : lgaData} 
    selected={LGA} 
    onChange={handleSelect}
    selectClassName={selectClassName} 
    selectStyle={selectStyle}
    dropdownClassName={dropdownClassName} 
    dropdownStyle={dropdownStyle}
    optionsContainerStyle={optionsContainerStyle} 
    optionsContainerClass={optionsContainerClass}
    optionsStyle={optionsStyle} 
    optionsClass={optionsClass}
    searchStyle={searchStyle} 
    searchClass={searchClass}
    searchContainerStyle={searchContainerStyle} 
    searchContainerClass={searchContainerClass}
    />
}
    </>
  );
}

export default LGAWidget;