import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function AutocompleteInputAdd({options, value, setValue, label = '', variant = 'outlined'}) {
    return (<Autocomplete
        value={value}
        onChange={(event, newValue) => {
            let valToSave = newValue;

            if (typeof newValue === 'string') {
                valToSave = newValue;
            }
            if (newValue?.inputValue) {
                valToSave = newValue.inputValue;
            } else if (newValue === null) {
                valToSave = '';
            } else {
                valToSave = newValue?.title;
            }
            setValue(valToSave);
        }}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const {inputValue} = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.title);
            // if (inputValue !== '' && !isExisting) {
            //     filtered.push({
            //         inputValue, title: `Add "${inputValue}"`,
            //     });
            // }

            return filtered;
        }}
        selectOnFocus
        // clearOnBlur
        handleHomeEndKeys
        options={options}
        getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
                return option;
            }
            if (option.inputValue) {
                return option.inputValue;
            }
            return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{width: 300}}
        freeSolo
        renderInput={(params) => (<TextField variant={variant} onChange={(e) => {
            setValue({
                title: e.currentTarget.value,
                inputValue: e.currentTarget.value,
            });
        }} {...params} label={label}/>)}
    />);
}
