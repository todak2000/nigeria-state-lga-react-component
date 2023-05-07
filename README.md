# NIGERIA-STATE-LGA-COMPONENT

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This library which allows developers to quickly fetch data about Nigerian geographical regions, states and Local Government Areas (LGA). It provides a customisable component which can be used to display the fetched data, allowing developers to save time and energy in coding.

- fetch Geographical region data by using the `useRegionsApi` Hook.
- fetch all 36 states plus FCT data by using the `useStatesApi` Hook.
- fetch all 774 Local Government Area data by using the `useStateLGAApi` Hook.
  However, you could save yourself that time by using the customizbale components `StateWidget` and `LGAWidget`.

- display States data using the `StateWidget` compoennt.
- display LGA data based on state using the `LGAWidget` compoennt.
  While you can use both components as standalone, however, the `LGAWidget` requires that the `state` prop be given a string value.

## Quickstart

Install this library:

```
npm i @todak2000/nigeria-state-lga-component
# or
yarn add @todak2000/nigeria-state-lga-component
```

Then, import and use any of the functionalities you might require:

```
...
import {
  useStatesApi,
  useStateLGAApi,
  StateWidget,
  LGAWidget,
  useRegionsApi,
} from "@todak2000/nigeria-state-lga-component";


function SampleApp() {
  const [state, setState] = useState("");
  const [LGA, setLGA] = useState("");
  const [stateAlone, setStateAlone] = useState("");
  const [stateMultiple, setStateMultiple] = useState([]);
  const [LGAAlone, setLGAAlone] = useState("");
  const [LGAMultiple, setLGAMultiple] = useState([]);

  const singleStateLGAs = useStateLGAApi("cross river");
  const regions = useRegionsApi();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        overflowY: "auto",
        height: "95vh",
      }}
    >
      <div
        style={{
          padding: 10,
          backgroundColor: "#f1f9f9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <p>State/LGA Widgets Together</p>
        <StateWidget
          setState={setState}
          className="bg-select"
          style={{ padding: 5, width: "100%" }}
        />
        <p>State Selected: {state}</p>

        {state !== "" && (
          <>
            <LGAWidget
              state={state}
              setLGAState={setLGA}
              className="bg-select"
              style={{
                padding: 5,
              }}
            />
            <p>LGA Selected: {LGA}</p>
          </>
        )}
      </div>
      <div
        style={{
          padding: 10,
          backgroundColor: "#1e90ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <p>State Widget Standalone (Single Select)</p>
        <StateWidget
          setState={setStateAlone}
          className="bg-select"
          style={{ padding: 5, width: "100%" }}
        />
        <p>State Selected: {stateAlone}</p>
      </div>

      <div
        style={{
          padding: 10,
          backgroundColor: "#0d98ba",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <p>State Widget Standalone (Multiple Select)</p>
        <StateWidget
          isMultipleSelect
          setState={setStateMultiple}
          className="bg-select"
          style={{ padding: 5 }}
        />
        <p>
          States Selected: <br />
          {stateMultiple.map((state: string) => {
            return (
              <span>
                {state}
                <br />
              </span>
            );
          })}
        </p>
      </div>
      <div
        style={{
          padding: 10,
          backgroundColor: "#89CFF0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <p>LGA Widget Standalone (Single Select)</p>
        <LGAWidget
          setLGAState={setLGAAlone}
          className="bg-select"
          style={{ padding: 5, width: "100%" }}
        />
        <p>LGA Selected: {LGAAlone}</p>
      </div>

      <div
        style={{
          padding: 10,
          backgroundColor: "#a2a2d0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <p>LGA Widget Standalone (Multiple Select)</p>
        <LGAWidget
          setLGAState={setLGAMultiple}
          isMultipleSelect
          className="bg-select"
          style={{ padding: 5, width: "100%" }}
        />
        <p>
          LGAs Selected: <br />
          {LGAMultiple.map((lga: string) => {
            return (
              <span>
                {lga}
                <br />
              </span>
            );
          })}
        </p>
      </div>
      <div
        style={{
          padding: 10,
          backgroundColor: "#a2a2d0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <h4>Regions</h4>
        <ul style={{ overflowY: "auto", height: "40vh" }}>
          {regions.map(({ id, region }) => (
            <li key={id}>{region}</li>
          ))}
        </ul>
      </div>
      <div
        style={{
          padding: 10,
          backgroundColor: "#f1f9f9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <h4>Single State Result</h4>
        <ul style={{ overflowY: "auto", height: "40vh" }}>
          {singleStateLGAs.map(({ id, state, lga }) => (
            <div key={id}>
              <h4>{state}</h4>
              <ul style={{ overflowY: "auto", height: "80vh" }}>
                {lga.map((lgaName: string) => (
                  <li key={lgaName}>{lgaName}</li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SampleApp;


```

## API
This is a list of props required 
| **Property**            	| **Description**                                                                        	| **DefaultValue** 	| **Type** 	| **Component Type**                        	| **Compulsory** 	|
|-------------------------	|----------------------------------------------------------------------------------------	|------------------	|----------	|-------------------------------------------	|----------------	|
| `setState`              	| Function that allows you to update the selected `state` value                          	| `null`           	| function 	| `StateWidget`                             	| Yes            	|
| `setLGAState`           	| Function that allows you to update selected the `LGA` value                            	| `null`           	| function 	| `LGAWidget`                               	| Yes            	|
| `className`             	| Name of parent classes                                                                 	| `""`             	| string   	| All                                       	| optional       	|
| `style`                 	| Name of parent style attribute                                                         	| `{padding: 5}`   	| object   	| All                                       	| optional       	|
| `isMultipleSelect`      	| Help to determine type of select component preffered : `Singleselect` or `Multiselect` 	| `false`          	| boolean  	| All                                       	| optional       	|
| `selectClassName`       	| Select tag parent class attribute - pass your customized classes in here               	| `defaultClass`   	| string   	| All                                       	| optional       	|
| `selectStyle`           	| Select tag parent style attribute - pass your customized style object in here          	| `defaultStyle`   	| object   	| All                                       	| optional       	|
| `dropdownClassName`     	| Drop down parent class attribute - pass your customized classes in here                	| `defaultClass`   	| string   	| All                                       	| optional       	|
| `dropdownStyle`         	| Drop down Container style attribute                                                    	| `defaultStyle`   	| object   	| All                                       	| optional       	|
| `selectedItemStyle`     	| Selected Item Container style attribute                                                	| `defaultStyle`   	| object   	| All but `IsMultipleSelect` must be `true` 	| optional       	|
| `selectedItemClass`     	| Selected item parent class attribute - pass your customized classes in here            	| `defaultClass`   	| string   	| All but `IsMultipleSelect` must be `true` 	| optional       	|
| `optionsContainerClass` 	| Options Container parent class attribute - pass your customized classes in here        	| `defaultClass`   	| string   	| All                                       	| optional       	|
| `optionsContainerStyle` 	| Options Container style attribute                                                      	| `defaultStyle`   	| object   	| All                                       	| optional       	|
| `optionsClass`          	| Option item class attribute - pass your customized classes in here                     	| `defaultClass`   	| string   	| All                                       	| optional       	|
| `optionsStyle`          	| Option item style attribute                                                            	| `defaultStyle`   	| object   	| All                                       	| optional       	|
| `searchClass`           	| Search component class attribute - pass your customized classes in here                	| `defaultClass`   	| string   	| All                                       	| optional       	|
| `searchStyle`           	| Search component style attribute                                                       	| `defaultStyle`   	| object   	| All                                       	| optional       	|
| `searchContainerClass`  	| Search Container class attribute - pass your customized classes in here                	| `defaultClass`   	| string   	| All                                       	| optional       	|
| `searchContainerStyle`  	| Search Container style attribute                                                       	| `defaultStyle`   	| object   	| All                                       	| optional       	|

However, depending if `isMultipleSelect` is `true` or `false`, developer might want to customize the Select/Option component. find the table below showing list of additional props depending on the type of Select component used.

## Author

[Daniel Olagunju](https://github.com/todak2000)
