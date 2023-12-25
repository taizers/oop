import React, {FC} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface AutoCompleteComponentType {
    value: any;
    setValue: (data: any) => void;
    label: string;
    options: Array<{id: number, name: string}>;
}

const AutoCompleteComponent: FC<AutoCompleteComponentType> = ({value, setValue, label, options}) => {
    const defaultProps = {
        options: options,
        getOptionLabel: (option: {id: number, name: string}) => option.name,
    };

    return (
        <Autocomplete
            disablePortal
            id="auto-complete"
            sx={{ mt: 4, mb: 1 }}
            value={value}
            onChange={(event: any, newValue: { id: number; name: string; } | null) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} label={label} />}
            {...defaultProps}
        />
    );
}

export default AutoCompleteComponent;