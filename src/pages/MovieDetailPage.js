import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Box, Button, CardMedia, Chip, Typography, Stack } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { Progress, Space, Statistic } from 'antd';

import { HeartTwoTone } from '@ant-design/icons';
import styled from "@emotion/styled";

const CircleButtonStyle = styled(Button)(() => ({
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    minWidth: 'unset',
    backgroundColor: 'grey'
}));



function MovieDetailPage() {
    const { movieId } = useParams();

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const getMoviesList = async () => {
            setLoading(true);
            try {
                const response = await apiService.get(`/movie/${movieId}?api_key=${API_KEY}&append_to_response=images,credits`);
                const data = response.data
                console.log("movie", data)
                setMovie(data);

            } catch (error) {
                console.log(error);

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
                        <Box sx={{ display: "flex", m: "auto", width: "80%", alignItems: "center", height: "800px" }} gap={3} component="div" className="general-info">
                            <Box sx={{ height: "600px", width: "450px" }}>
                                <CardMedia
                                    className="poster"
                                    component="img"

                                    image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    sx={{
                                        objectFit: 'contain',
                                    }}
                                    alt="image"
                                />
                            </Box>
                            <Box className="info" sx={{ display: "flex", flexDirection: "column", height: "600px", maxWidth: "600px" }} gap={4}  >
                                <Box className="title" sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="h3">{movie.title ? movie.title : movie.name}</Typography>

                                    <CircleButtonStyle variant="contained" onClick={() => addFavoriteMovie(movie)} >
                                        <HeartTwoTone twoToneColor="#eb2f96" />
                                    </CircleButtonStyle>

                                </Box>
                                <Box className="info" sx={{ display: "flex", justifyContent: "space-between" }} gap={5}>
                                    <Box>
                                        <Typography variant="subtitle1">
                                            Release date: {movie.release_date}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Runtime: {movie.runtime !== 0 ? convertToHour(movie.runtime) : "Update later"}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ display: "flex", mb: 1 }}>
                                            Genres:
                                        </Typography>
                                        {movie.genres &&
                                            movie.genres.slice(0, 3).map((item) => (
                                                <Chip
                                                    key={`${item.id}`}
                                                    label={`${item.name}`}
                                                    size="small"
                                                    variant="outlined"
                                                />))}
                                    </Box>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography variant="subtitle1">
                                            User's Score
                                        </Typography>
                                        <Space wrap >
                                            <Progress
                                                type="circle"
                                                strokeColor={movie.vote_average < 3 ? "red" : movie.vote_average < 7 ? "blue" : "green"}
                                                size="small"
                                                percent={Math.ceil(movie.vote_average * 10)}
                                                format={(percent) => (
                                                    <p style={{ color: "white" }}>{movie.vote_average.toFixed(2)}</p>
                                                )}

                                            />
                                        </Space>
                                    </Box>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography variant="subtitle1">
                                            Revenue
                                        </Typography>
                                        <Statistic value={movie.revenue} prefix='$' valueStyle={{ color: "white", fontSize: "18px" }} />
                                    </Box>
                                </Box>
                                <Box className="overview">
                                    <Typography variant="h6">
                                        Overview
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {movie.overview}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ display: "flex", mb: 1 }}>
                                        Production Companies:
                                    </Typography>
                                    {movie.production_companies &&
                                        movie.production_companies.slice(0, 5).map((item) => (
                                            <Chip
                                                key={`${item.id}`}
                                                label={`${item.name}`}
                                                size="small"
                                                variant="outlined"
                                            />))}
                                </Box>
                            </Box>
                        </Box>


                        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>Cast</Typography>
                        <Box
                            sx={{
                                width: '80%',
                                overflowX: 'auto',
                                m: "auto",

                            }}
                        >
                            <Box
                                sx={{
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
                                                minWidth: '138px',
                                                width: '138px',
                                                height: '275px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                margin: '8px',
                                                padding: "10px",

                                            }}
                                        >
                                            {cast.profile_path ? (
                                                <img
                                                    className="avatar"
                                                    src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                                    alt={cast.name}
                                                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: "15px" }}
                                                />
                                            ) : (
                                                <img
                                                    className="no-avatar"
                                                    src={`https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`}
                                                    alt="No Avatar"
                                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                                />
                                            )}
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="subtitle1">{cast.name}</Typography>
                                                <Typography variant="subtitle2">{cast.character}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>


                    </Stack>

                </div>)
            }


        </div >
    );
}

export default MovieDetailPage;