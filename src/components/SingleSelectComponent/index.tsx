import React, { useState, useEffect } from 'react'
;import { BsChevronDown, BsChevronUp, BsSearch } from 'react-icons/bs'
import '../MultiSelectComponent/index.scss'
import { SlClose } from 'react-icons/sl'

  type singleProps = {
    options: any;
    selected: string;
    onChange: (e:string | any)=>void;
    selectClassName?: string;
    selectStyle?:object;
    dropdownClassName?: string;
    dropdownStyle?: object;
    optionsContainerClass?: string;
    optionsContainerStyle?: object;
    optionsClass?: string;
    optionsStyle?: object;
    searchClass?: string;
    searchStyle?: object;
    searchContainerClass?: string;
    searchContainerStyle?: object;
    activeOptionBg?: string;
  }
  type optionsProps = {
    id: string;
    state?: string;
    slogan?: string;
    lga?: string[]
  }

  function SingleSelectDropdown({ options, selected, onChange, 
    selectClassName='defaultSelectClass', selectStyle,
    dropdownClassName='defaultDropdownClass', dropdownStyle,
    optionsContainerStyle, optionsContainerClass='defaulfOptionsContainerClass',
    optionsStyle, optionsClass='defaulfOptionsClass',
    searchStyle, searchClass='defaulfSearchInput',
    searchContainerStyle, searchContainerClass='defaultSearchContainer',
    activeOptionBg='#eeeeee'
}: singleProps) {

  const [showDropdown, setShowDropdown]= useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [dropdownOptions, setDropdownOptions] = useState<optionsProps[]>([])

    const handleChange = (item: string)=>{
      if (item !== "Select") {
        onChange(item)
      }
      else{
        onChange('')
      }
      
      setShowDropdown(false)
    }
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
                <div>{selected ? selected : "Select"}</div>
                {!showDropdown ? <BsChevronDown /> : <BsChevronUp />}
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
                <li className={`${optionsClass}`} style={optionsStyle } onClick={()=>handleChange("Select")}>
                    <span>Select</span>
                </li>
                { typeof options[0] === 'object' && dropdownOptions.map(({id, state, slogan}: optionsProps) => {
                  let stringState: any =  state
                    return (
                        <li key={id} className={`${optionsClass}`} style={state === selected ? {backgroundColor: activeOptionBg} : optionsStyle } onClick={()=>handleChange(stringState)}>
                            <span>{state}</span>
                        </li>
                    )
                })}
                { typeof options[0] === 'string' && dropdownOptions.map((item: any, index: number) => {
                    
                    return (
                        <li key={index} className={`${optionsClass}`}  style={item === selected ? {backgroundColor: activeOptionBg} : optionsStyle }  onClick={()=>handleChange(item)}>
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
  
  export default SingleSelectDropdown;
  