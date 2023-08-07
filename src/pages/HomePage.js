import React from 'react';
import Banner from "../components/Banner";
import { Box } from "@mui/material";
import VerticalMovieList from "../components/VerticalMovieList";
import HorizontalMovieList from "../components/HorizontalMovieList";
import useGenres from '../hooks/useGenres';

const verticalMovieListTitle = [
    {
        title: "Popular Movies",
        keyword: "popular"
    },
    {
        title: "Top Rated Movies",
        keyword: "top_rated"
    },
    {
        title: "Upcoming Movies",
        keyword: "upcoming"
    }
]

const horizontalMovieListTitle = ["Action", "Comedy", "Romance", "Thriller"]

function HomePage() {
    const { genresList } = useGenres();

    const getGenreIdByName = (genreName) => {
        const genre = genresList.find((genre) => genre.name === genreName);
        return genre ? genre.id : null;
    };

    return (
        <div>
            <Banner />
            <Box sx={{ flexGrow: 1 }} />
            {verticalMovieListTitle.map((item) => (
                <VerticalMovieList key={item.title} title={item.title} keyword={item.keyword} />
            ))}
            {horizontalMovieListTitle.map((genreName) => (
                <HorizontalMovieList
                    key={genreName}
                    title={genreName}
                    genreId={getGenreIdByName(genreName)}
                />
            ))}
        </div>
    );
}

export default HomePage;