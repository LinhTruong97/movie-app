import styled from '@emotion/styled';
import { Box, Card, CardContent, Modal, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'

const BoxCard = styled(Box)(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 1000 },
    bgcolor: "background.paper",
    borderRadius: 2,
    outline: "none",

}));

function MovieCardModal({ movie, onClose }) {


    return (
        <div className="hover-content">
            <Modal open={true} onClose={onClose} >
                <BoxCard >
                    <Card
                        sx={{
                            border: "none",
                            boxShadow: 0,
                        }}
                    >
                        <CardContent sx={{ display: "flex", flexDirection: 'column', gap: "20px", textAlign: 'center' }}  >

                            <Typography variant="h4">{movie.title}</Typography>
                            <div>
                                <p>Score: {movie.vote_average}</p>
                                <p>{movie.overview}</p>
                                <Link to={`/movie/${movie.id}`} >
                                    <button>See More</button>
                                </Link>
                            </div>


                        </CardContent>

                    </Card>

                </BoxCard>

            </Modal>

        </div >
    )
}

export default MovieCardModal
