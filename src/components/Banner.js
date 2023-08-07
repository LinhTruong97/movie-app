import React, { useState, useRef } from "react";
import { Box, Stack } from "@mui/material";
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import ReactPlayer from 'react-player';

function Banner() {
    const [mute, setMute] = useState(true);
    const playerRef = useRef(null);

    const handleMuteToggle = () => {
        setMute((prevMute) => !prevMute);
        if (playerRef.current) {
            playerRef.current.muted = !mute;
        }
    };

    return (

        <Box sx={{ flexGrow: 1, position: 'relative', width: '1200px', height: '675px', m: 3 }}>
            <ReactPlayer
                ref={playerRef}
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
                    left: '20px',
                    width: '80%',
                }}
            >

                <h1>Avatar: The Way of Water</h1>


                {mute ? (
                    <VolumeOffRoundedIcon onClick={handleMuteToggle} />
                ) : (
                    <VolumeUpRoundedIcon onClick={handleMuteToggle} />
                )}
            </Stack>
        </Box>
    );
}

export default Banner;
