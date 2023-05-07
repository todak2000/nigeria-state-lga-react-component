

import React, { useState, useEffect } from 'react';
import useStatesApi from '../Api/useStatesApi';
import MultiSelectDropdown from '../components/MultiSelectComponent';
import SingleSelectDropdown from '../components/SingleSelectComponent';

type widgetProps = {
  setState: React.Dispatch<React.SetStateAction<any>>;
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

const StateWidget = ({setState, className="", style={padding: 5}, isMultipleSelect,
    selectClassName, selectStyle,
    dropdownClassName, dropdownStyle,
    selectedItemStyle, selectedItemClass,
    optionsContainerStyle, optionsContainerClass,
    optionsStyle, optionsClass,
    searchStyle, searchClass,
    searchContainerStyle, searchContainerClass,

}: widgetProps) => {
  const [statee, setStatee] = useState('');
  const states = useStatesApi();
  const [selected, setSelected] = useState<string[]>([])

  const handleSelect = (e: string| any)=>{
    setStatee(e)
    setState(e)
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
    setState(selected)
  }
}, [isMultipleSelect, selected, setState])

  return (
    <>
    
    {
    isMultipleSelect ? 
    <MultiSelectDropdown 
    options={states} selected={selected} onChange={onChange}
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
    <SingleSelectDropdown options={states} selected={statee} onChange={handleSelect}
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

export default StateWidget;