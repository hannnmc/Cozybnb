import './Search.css';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { useState } from 'react';
import PlacesAutoComplete from './PlacesAutoComplete';

const Search = props => {

    const [selected, setSelected ] = useState(null);

    return (
        <>
            {/* <PlacesAutoComplete setSelected={setSelected} /> */}
        </>

    );
  };
  
export default Search;
