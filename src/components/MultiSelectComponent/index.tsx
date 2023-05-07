import React, { useState, useEffect } from 'react'
;import { BsChevronDown, BsChevronUp, BsSearch } from 'react-icons/bs'
import './index.scss'
import { SlClose } from 'react-icons/sl'

  type multiProps = {
    options: any;
    selected: any;
    onChange: (state: any)=>void;
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
  type optionsProps = {
    id: string;
    state?: string;
    slogan?: string;
    lga?: string[]
  }

  function MultiSelectDropdown({ options, selected, onChange, 
    selectClassName='defaultSelectClass', selectStyle,
    dropdownClassName='defaultDropdownClass', dropdownStyle,
    selectedItemStyle, selectedItemClass='selectedSpan',
    optionsContainerStyle, optionsContainerClass='defaulfOptionsContainerClass',
    optionsStyle, optionsClass='defaulfOptionsClass',
    searchStyle, searchClass='defaulfSearchInput',
    searchContainerStyle, searchContainerClass='defaultSearchContainer',
}: multiProps) {

  const [showDropdown, setShowDropdown]= useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [dropdownOptions, setDropdownOptions] = useState<optionsProps[]>([])
    useEffect(() => {
      if (searchQuery !== '' && typeof options[0] === 'object') {
        setDropdownOptions(options?.filter(({id, state, slogan}: optionsProps) => state?.toLocaleLowerCase()?.includes(searchQuery?.toLocaleLowerCase())))
      }
      else if (searchQuery !== '' && typeof options[0] === 'string') {
        setDropdownOptions(options?.filter((item: string) => item?.toLocaleLowerCase()?.includes(searchQuery?.toLocaleLowerCase())))
      }
      else{
        setDropdownOptions(options)
      }
    }, [options, searchQuery])

    useEffect(() => {
      setDropdownOptions(options)
    }, [options, showDropdown])
    
    
    return (
        <div className={`${selectClassName}`} style={selectStyle}>
            <div className={`${dropdownClassName}`} style={dropdownStyle} onClick={()=>{
                setShowDropdown(!showDropdown)
            }}>
                <div>{selected.length > 0 ? `${selected.length} item${selected.length > 1 ? 's':''} selected`: "Select" }</div>
                {!showDropdown ? <BsChevronDown /> : <BsChevronUp />}
            </div>
            
            <div className='selectedItems'>
            {selected.map((state:string, index:number)=>{
                return <span key={index} className={selectedItemClass} style={selectedItemStyle}>{state} 
                <SlClose onClick={()=>{onChange(state)}} className="closeItem"/>
                </span>
            })}
            </div>
            {showDropdown &&
            <>
            <div  className={searchContainerClass} style={searchContainerStyle}>
            <BsSearch />
            <input type='text' className={searchClass} style={searchStyle} placeholder='Quick search - Click Enter after' onKeyDown={(e: any)=>{setSearchQuery(e.target.value)}} />
            
            </div>
            <div className="closeContainer">
                <SlClose onClick={()=>{setShowDropdown(false)}} className="closeItem"/>
            </div>
            <ul className={`${optionsContainerClass}`} style={optionsContainerStyle}>
                { typeof options[0] === 'object' && dropdownOptions.map(({id, state, slogan}: optionsProps) => {
                    const isSelected = selected.includes(state);
                    return (
                        <li key={id} className={`${optionsClass}`} style={optionsStyle} onClick={() => onChange(state)}>
                            <input type="checkbox" checked={isSelected} readOnly className="mr-6"></input>
                            <span>{state}</span>
                        </li>
                    )
                })}
                { typeof options[0] === 'string' && dropdownOptions.map((item: any, index: number) => {
                    const isSelected = selected.includes(item);
                    
                    return (
                        <li key={index} className={`${optionsClass}`} style={optionsStyle} onClick={() => onChange(item)}>
                            <input type="checkbox" checked={isSelected} readOnly className="mr-6"></input>
                            <span>{item}</span>
                        </li>
                    )
                })}
            </ul>
            </>
            }
            
        </div>
    );
  }
  
  export default MultiSelectDropdown;