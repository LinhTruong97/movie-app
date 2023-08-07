import { Alert, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { SliderPrevArrow, SliderNextArrow } from './SliderArrow';
import HorizontalMovieCard from './HorizontalMovieCard';
import useMovie from '../hooks/useMovie';
import LoadingScreen from './LoadingScreen';
import MovieCardModal from './MovieCardModal';


function HorizontalMovieList({ title, genreId }) {

    const { moviesList, loading, error } = useMovie();
    const [currentMovieList, setCurrentMovieList] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const list =
            genreId && moviesList
                ? moviesList.filter((movie) => movie.genre_ids.includes(genreId))
                : moviesList;
        setCurrentMovieList(list)
    }, [genreId, moviesList]);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };
    return (
        <div>
            <Typography variant="h5" m={3}>
                {title}
            </Typography>

            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {error ? (
                        <Alert severity="error" > {error}</Alert>
                    ) : (
                        <Slider {...settings} prevArrow={<SliderPrevArrow sx={{ height: "50px", width: "40px" }} />} nextArrow={<SliderNextArrow sx={{ height: "50px", width: "40px" }} />} >
                            {currentMovieList.map((movie, index) => (
                                <Grid key={movie.id} onClick={() => handleMovieClick(movie)} item xs={6} sm={4} md={3}>
                                    <HorizontalMovieCard movie={movie} />
                                </Grid>
                            ))}
                        </Slider>
                    )}
                </>

            )}
            {selectedMovie && <MovieCardModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}

        </div >
    );
}

export default HorizontalMovieList;