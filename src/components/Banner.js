import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import ReactPlayer from 'react-player';
import styled from "@emotion/styled";

const CircleButtonStyle = styled(Button)(() => ({
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    minWidth: 'unset',
    border: '2px solid white'
}));

function Banner() {
    const [mute, setMute] = useState(true);


    const handleMuteToggle = () => {
        setMute((prevMute) => !prevMute);
    };

    return (

        <Box sx={{ flexGrow: 1, position: 'relative', width: '96vw', height: '54vw', ml: 2 }}>
            <ReactPlayer
                url="https://vimeo.com/776439371"
                playing
                loop
                muted={mute}
                width='100%'
                height='100%'
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '5%',
                    width: '80%',
                }}
            >
                <Typography variant='h2' sx={{ fontFamily: 'Mogra, cursive', color: 'b', textShadow: '0px 2px 4px black', fontSize: 'clamp(24px, 5vw, 80px)' }}>Avatar: The Way of Water</Typography>
                {mute ? (
                    <CircleButtonStyle>
                        <VolumeOffRoundedIcon sx={{ color: 'white' }} onClick={handleMuteToggle} />
                    </CircleButtonStyle>

                ) : (
                    <CircleButtonStyle>
                        <VolumeUpRoundedIcon sx={{ color: 'white' }} onClick={handleMuteToggle} />
                    </CircleButtonStyle>

                )}
            </Stack>
        </Box >
    );
}

export default Banner;
