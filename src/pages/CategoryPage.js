import { Box, Grid, Pagination, PaginationItem, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';

import { useForm } from "react-hook-form";
import VerticalMovieCard from '../components/VerticalMovieCard';
import { FormProvider } from '../components/form';
import MovieFilter from '../components/MovieFilter';
import useGenres from '../hooks/useGenres';
import styled from '@emotion/styled';
import useMovie from '../hooks/useMovie';
import LoadingScreen from '../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';

const CentterPagination = styled(Pagination)(() => ({
    ul: {
        justifyContent: "center",
    },
}));
const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
    '&.Mui-selected': {
        color: 'black',
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

const jobsPerPage = 12;

function CategoryPage() {
    const { genresList } = useGenres();
    const { moviesList, loading } = useMovie();
    const navigate = useNavigate()

    const [currentMovies, setCurrentMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [pages, setPages] = useState(1);

    const getGenreIdByName = (genreName) => {
        const genre = genresList.find((genre) => genre.name === genreName);
        return genre ? genre.id : null;
    };

    const defaultValues = {
        genres: [],
        userScore: [0, 10]
    };
    const methods = useForm({
        defaultValues,
    });

    const { watch } = methods;
    const filters = watch();
    const filteredMovies = applyFilter(moviesList, filters, getGenreIdByName);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredMovies.length / jobsPerPage));
        if (pages > totalPages) {
            setPages(1);
        }
        setCurrentMovies(filteredMovies.slice((pages - 1) * jobsPerPage, pages * jobsPerPage));

    }, [pages, filteredMovies, totalPages]);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Stack>
                    <FormProvider methods={methods}>
                        <MovieFilter />
                    </FormProvider>
                </Stack>
                <Grid container sx={{ justifyContent: "center" }} spacing={2}>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        <>
                            {
                                currentMovies.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {currentMovies.map((movie, index) => (
                                            <Grid key={movie.id} item xs={6} sm={4} md={3} onClick={() => navigate(`/movie/${movie.id}`)}>
                                                <VerticalMovieCard movie={movie} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography variant="body1" sx={{ mt: 4, fontSize: "25px" }}>No movie found</Typography>
                                )
                            }
                            < CentterPagination
                                sx={{ marginTop: "15px" }}
                                count={totalPages}
                                page={pages}
                                renderItem={(item) => (
                                    <CustomPaginationItem {...item} />
                                )}
                                onChange={(event, value) => {
                                    setPages(value);
                                }}
                            />
                        </>
                    )}
                </Grid>
            </Box>
        </ >
    )
}

export default CategoryPage

function applyFilter(movies, filters, getGenreIdByName) {
    const { genres, userScore } = filters;
    let filteredMovies = movies;

    if (genres && genres.length > 0) {
        filteredMovies = filteredMovies.filter((movie) =>
            genres.some((genreName) => movie.genre_ids.includes(getGenreIdByName(genreName)))
        );
    }
    if (userScore && userScore.length === 2) {
        const [minScore, maxScore] = userScore;
        filteredMovies = filteredMovies.filter(
            (movie) => movie.vote_average >= minScore && movie.vote_average <= maxScore
        );
    }

    return filteredMovies;
}



