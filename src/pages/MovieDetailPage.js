import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Box, Button, CardMedia, Chip, Typography, Stack, CircularProgress, Paper, Grid } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "@emotion/styled";

const CircleButtonStyle = styled(Button)(() => ({
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    minWidth: 'unset',
    backgroundColor: '#99CCFF'
}));



function MovieDetailPage() {
    const { movieId } = useParams();

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getMoviesList = async () => {
            setLoading(true);
            try {
                const response = await apiService.get(`/movie/${movieId}?api_key=${API_KEY}&append_to_response=images,credits`);
                const data = response.data
                setMovie(data);

            } catch (error) {
                console.log('getMovieListId', error);

            }
            setLoading(false);
        };
        getMoviesList();
    }, [movieId]);

    const convertToHour = (time) => {
        const minute = time % 60
        const hour = (time - minute) / 60
        return `${hour}h ${minute}m`
    }

    const addCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    const removeNonNumeric = (num) => {
        return num.toString().replace(/[^0-9]/g, "")
    }

    const addFavoriteMovie = (movie) => {
        let list = JSON.parse(localStorage.getItem("favorite")) || [];
        let itemId;

        for (let i = 0; i < list.length; i++) {
            itemId = list[i].id;
            if (itemId === movie.id) {
                alert("You had already added this item!");
                return;
            }
        }
        list.push(movie);
        localStorage.setItem("favorite", JSON.stringify(list));
        alert("Item Has Added!");
    };

    return (
        <div >
            {loading ? (
                <LoadingScreen />
            ) : (
                <div>
                    <Stack direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box sx={{ display: "flex", flexDirection: 'column', m: "auto", width: "80%", alignItems: "center" }} gap={3} component="div" className="general-info">
                            <Box sx={{ width: "100%" }}>
                                <CardMedia
                                    className="poster"
                                    component="img"

                                    image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                    sx={{
                                        objectFit: 'contain',
                                    }}
                                    alt="image"
                                />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }} gap={4}  >
                                <Grid container className="title" alignItems="center" spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: 'clamp(24px, 5vw, 60px)' }}>
                                            {movie.title ? movie.title : movie.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <CircleButtonStyle variant="contained" onClick={() => addFavoriteMovie(movie)}>
                                            <FavoriteIcon />
                                        </CircleButtonStyle>
                                    </Grid>
                                </Grid>

                                <Grid container className="info" sx={{ justifyContent: "space-between" }} spacing={5}>
                                    <Grid item xs={12} md={6} >
                                        <Typography variant="h5">
                                            <span style={{ fontWeight: 'bold', color: "#99CCFF" }}>
                                                Release date:
                                            </span>{" "}
                                            {movie.release_date}
                                        </Typography>
                                        <Typography variant="h5">
                                            <span style={{ fontWeight: 'bold', color: "#99CCFF" }}>
                                                Runtime:
                                            </span>{" "}
                                            {movie.runtime !== 0 ? convertToHour(movie.runtime) : "Update later"}
                                        </Typography>
                                        <Typography variant="h5" sx={{ display: "flex", mb: 1, fontWeight: 'bold', color: "#99CCFF" }}>
                                            Genres:
                                        </Typography>
                                        {movie.genres &&
                                            movie.genres.slice(0, 3).map((item) => (
                                                <Chip
                                                    key={`${item.id}`}
                                                    label={`${item.name}`}
                                                    size="medium"
                                                    variant="outlined"
                                                    sx={{ mr: 1, fontSize: '20px' }}
                                                />
                                            ))}
                                    </Grid>
                                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: "start", md: "center" } }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#99CCFF" }}>
                                            User's Score
                                        </Typography>
                                        <Box sx={{ position: 'relative', display: 'inline-flex', m: 1 }}>
                                            <CircularProgress variant="determinate" value={movie.vote_average * 10} size={60} />
                                            <Box
                                                sx={{
                                                    top: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography variant="h6" component="div" color="white" size="20px">
                                                    {movie.vote_average.toFixed(1)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: "start", md: "center" } }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#99CCFF" }}>
                                            Revenue
                                        </Typography>
                                        <Paper variant="none">
                                            <Typography variant="h5">
                                                $ {addCommas(removeNonNumeric(movie.revenue))}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Box className="overview">
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#99CCFF" }}>
                                        Overview
                                    </Typography>
                                    <Typography variant="h5">
                                        {movie.overview}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h5" sx={{ display: "flex", mb: 1, fontWeight: 'bold', color: "#99CCFF" }}>
                                        Production Companies:
                                    </Typography>
                                    {movie.production_companies &&
                                        movie.production_companies.slice(0, 5).map((item) => (
                                            <Chip
                                                key={`${item.id}`}
                                                label={`${item.name}`}
                                                size="medium"
                                                variant="outlined"
                                                sx={{ mr: 1, fontSize: '20px' }}
                                            />))}
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="h3" sx={{ textAlign: "center", mb: 2, mt: 2, fontWeight: 'bold', color: "#99CCFF" }}>Cast</Typography>
                        <Box
                            sx={{
                                width: '80%',
                                overflowX: 'auto',
                                m: "auto",
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                            }}
                        >
                            {movie.credits &&
                                movie.credits.cast.filter((item) => item.known_for_department === "Acting").map((cast, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            minWidth: '200px',
                                            width: '200px',
                                            height: '400px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: "10px",

                                        }}
                                    >
                                        {cast.profile_path ? (
                                            <img
                                                className="avatar"
                                                src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                                alt={cast.name}
                                                style={{ width: '100%', height: '267px', objectFit: 'cover', borderRadius: "15px" }}
                                            />
                                        ) : (
                                            <img
                                                className="no-avatar"
                                                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`}
                                                alt="No Avatar"
                                                style={{ width: '100%', height: '267px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{cast.name}</Typography>
                                            <Typography variant="subtitle1">{cast.character}</Typography>
                                        </Box>
                                    </Box>
                                ))}

                        </Box>


                    </Stack>

                </div>)
            }


        </div >
    );
}

export default MovieDetailPage;