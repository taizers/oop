import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';

interface SelectFieldType {
    values: Array<string> | null;
    setValues: (data: any) => void;
    label: string;
}

const SelectField: FC<SelectFieldType> = ({setValues, values, label}) => {
    const [fieldValue, setFieldValue] = useState<string>('');

    const onAddClick = () => {
        const isExist = values?.find((item) => item === fieldValue);

        if (isExist || fieldValue === '') {
            return;
        }
        
        setFieldValue('');

        if (values) {
            return setValues([...values, fieldValue]);
            
        }

        setValues([fieldValue]);
    }

    const onDeleteClick = (value: string) => {
        setValues(values?.filter((item) => item !== value));
    }

    return <Box key={label}>
        <Box sx={{display: 'flex', alignItems:'center'}}>
            <TextField
                autoFocus
                margin="dense"
                id="adress"
                label={label}
                type="text"
                value={fieldValue}
                fullWidth
                variant="standard"
                onChange={(evt) => setFieldValue(evt.target.value)}
            />
            <AddIcon onClick={() => onAddClick()} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', mt: 1 }}>
        {values?.map((item, index) => {
            return <Box key={`item ${index}`} sx={{display: 'flex', flexDirection: 'space-between'}}>
                <DeleteIcon key={`delete icon ${index}`} onClick={() => onDeleteClick(item)} />
                <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    key={`course ${index}`}
                >
                    {item} 
                </Typography>
            </Box>
        })}
        </Box>
  </Box>
};

export default SelectField;
