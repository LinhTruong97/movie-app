import React, { useEffect, useState } from 'react'
import useMovie from '../hooks/useMovie';
import { Grid, Pagination, PaginationItem } from '@mui/material';
import VerticalMovieCard from '../components/VerticalMovieCard';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CenterPagination = styled(Pagination)(() => ({
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

const moviesPerPage = 12;

function SearchPage() {
    const { moviesList } = useMovie();

    const [currentMovieList, setCurrentMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [pages, setPages] = useState(1);
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");

    useEffect(() => {
        setPages(1)
    }, [q]);

    useEffect(() => {
        const applyFilter = () => {
            if (moviesList) {
                if (q) {
                    const lowerCaseQ = q.toLowerCase();
                    const searchedMoviesList = moviesList.filter((movie) =>
                        (movie.title ? movie.title : movie.name).toLowerCase().includes(lowerCaseQ)
                    );
                    setTotalPages(Math.ceil(searchedMoviesList.length / moviesPerPage));
                    setCurrentMovieList(searchedMoviesList.slice((pages - 1) * moviesPerPage, pages * moviesPerPage));

                } else {
                    setTotalPages(Math.ceil(moviesList.length / moviesPerPage));
                    setCurrentMovieList(moviesList.slice((pages - 1) * moviesPerPage, pages * moviesPerPage));
                }
            }
        };
        applyFilter();
    }, [pages, q, moviesList]);


    return (
        <div>
            <Grid container spacing={2}>
                {currentMovieList.map((movie, index) => (
                    <Grid key={movie.id} item xs={6} sm={4} md={3} onClick={() => navigate(`/movie/${movie.id}`)}>
                        <VerticalMovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
            <CenterPagination
                sx={{ marginTop: "15px" }}
                count={totalPages}
                page={pages}
                renderItem={(item) => (
                    <CustomPaginationItem {...item} sx={{ fontSize: '20px', fontWeight: 'bold' }} />
                )}
                onChange={(event, value) => {
                    setPages(value);
                }}
            />
        </div>
    )
}

export default SearchPage
