import React from 'react'
import Grid from "@mui/material/Grid";
import VerticalMovieCard from '../components/VerticalMovieCard';
import { useNavigate } from 'react-router-dom';

function FavoritePage() {
    let list = JSON.parse(localStorage.getItem("favorite")) || [];
    const navigate = useNavigate()

    if (list.length === 0) {
        return null
    };
    return (
        <div>
            <Grid container spacing={2}>
                {list.map((movie, index) => (
                    <Grid
                        key={movie.id}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        item xs={6} sm={4} md={3}
                    >
                        <VerticalMovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}

export default FavoritePage
