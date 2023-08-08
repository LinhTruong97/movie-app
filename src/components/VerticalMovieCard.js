import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styled from "@emotion/styled";

const VeriticalCard = styled(Card)(() => ({
    '&:hover': {
        opacity: 1,
        transform: 'scale(1.1)',
        zIndex: 10
    }
}))



function VerticalMovieCard({ movie }) {
    if (!movie || !movie.poster_path) {
        return null;
    }
    return (
        <VeriticalCard sx={{ m: 2 }} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    sx={{
                        height: "100%",
                        objectFit: 'cover',
                    }}
                    alt="image"
                />
                <CardContent >
                    <Typography gutterBottom variant="h6" noWrap sx={{ textAlign: "center" }} >
                        {movie.title ? movie.title : movie.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </VeriticalCard>
    );
}

export default VerticalMovieCard;