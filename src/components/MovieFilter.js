import React, { useState } from 'react';

import { Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox } from "./form";

import FRangeSlider from './form/FRangeSlider';
import useGenres from '../hooks/useGenres';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function MovieFilter({ resetFilter }) {
    const { genresList } = useGenres();
    const [isGenresOpen, setIsGenresOpen] = useState(false);
    const [isUserScoreOpen, setIsUserScoreOpen] = useState(false);


    return (
        <Stack spacing={[1, 3, 5]} sx={{ p: 3, width: 230 }}>
            <Accordion
                expanded={isGenresOpen}
                onChange={() => setIsGenresOpen(!isGenresOpen)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-genres-content"
                    id="panel-genres-header"
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#99CCFF' }}>
                        Genres
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <FMultiCheckbox
                            name="genres"
                            options={genresList.map((genre) => genre.name)}
                            sx={{ width: 1 }}
                        />
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={isUserScoreOpen}
                onChange={() => setIsUserScoreOpen(!isUserScoreOpen)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-genres-content"
                    id="panel-user-score-header"
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#99CCFF' }}>
                        User Score
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FRangeSlider sx={{ ml: "10px" }} name="userScore" min={0} max={10} />
                </AccordionDetails>
            </Accordion>

            <Button onClick={resetFilter} sx={{ fontSize: '20px', fontWeight: 'bold' }} variant='outlined' >Clear All</Button>
        </Stack>
    );
}

export default MovieFilter;