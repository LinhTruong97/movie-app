import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const NextArrowButton = styled(Button)(() => ({
    position: 'absolute',
    top: '40%',
    right: '30px',
    zIndex: '20',
    transformOrigin: 'center center',
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    transform: 'translateY(-20%)',
    transition: 'background-color 0.4s ease-out',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
}));


const PrevArrowButton = styled(Button)(() => ({
    position: 'absolute',
    top: '40%',
    left: '30px',
    zIndex: '20',
    transformOrigin: 'center center',
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    transform: 'translateY(-20%)',
    transition: 'background-color 0.4s ease-out',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
}));


export const SliderNextArrow = ({ onClick }) => {
    return (
        <NextArrowButton onClick={onClick} >
            <ArrowForwardIosIcon sx={{ color: 'white' }} />
        </NextArrowButton>
    )
};

export const SliderPrevArrow = ({ onClick }) => {
    return (
        <PrevArrowButton onClick={onClick}>
            <ArrowBackIosIcon sx={{ color: 'white' }} />
        </PrevArrowButton>
    )
};

