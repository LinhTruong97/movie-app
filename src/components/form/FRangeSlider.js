import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useFormContext, Controller } from 'react-hook-form';


const FRangeSlider = ({ name, min = 0, max = 100, ...other }) => {
    const { control } = useFormContext();

    return (
        <Box sx={{ width: 150 }}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Slider
                        {...field}
                        {...other}
                        marks
                        size="small"
                        min={min}
                        max={max}
                        value={field.value || [min, max]}
                        onChange={(e, value) => field.onChange(value)}
                        valueLabelDisplay="on"
                    />
                )}
            />
        </Box>
    );
};

export default FRangeSlider;
