import React from "react";
import { Link, Typography } from "@mui/material";

function MainFooter() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" p={3}>
            {"Copyright © "}
            <Link color="inherit" href="https://www.coderschool.vn">
                TTHL
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default MainFooter;