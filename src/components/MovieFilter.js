import React, { useState } from 'react';

import { Stack, Typography } from "@mui/material";
import { FMultiCheckbox } from "./form";

import FRangeSlider from './form/FRangeSlider';
import useGenres from '../hooks/useGenres';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function MovieFilter({ resetFilter }) {
    const { genresList } = useGenres();
    const [isGenresOpen, setIsGenresOpen] = useState(true);
    const [isUserScoreOpen, setIsUserScoreOpen] = useState(true);


    return (
        <Stack spacing={3} sx={{ p: 3, width: 250 }}>
            <Accordion
                expanded={isGenresOpen}
                onChange={() => setIsGenresOpen(!isGenresOpen)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-genres-content"
                    id="panel-genres-header"
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        User Score
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FRangeSlider sx={{ ml: "10px" }} name="userScore" min={0} max={10} />
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}

export default MovieFilter;