import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styled from "@emotion/styled";

const HorizontalCard = styled(Card)(() => ({
    '&:hover': {
        opacity: 1,
        transform: 'scale(1.1)',
        zIndex: 10
    }
}))


function HorizontalMovieCard({ movie }) {
    if (!movie || !movie.backdrop_path) {
        return null;
    }
    return (
        <HorizontalCard sx={{ m: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    width="200"
                    image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    sx={{
                        height: "100%",
                        objectFit: 'cover',
                    }}
                    alt="image"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" noWrap sx={{ textAlign: "center" }} >
                        {movie.title ? movie.title : movie.name}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </HorizontalCard>
    );
}

export default HorizontalMovieCard;