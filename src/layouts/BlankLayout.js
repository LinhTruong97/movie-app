import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

const HeaderStyle = styled("header")(({ theme }) => ({
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    position: "absolute",
}));

function BlankLayout() {
    return (
        <Stack minHeight="80vh" justifyContent="center" alignItems="center">
            <HeaderStyle>
                <Logo sx={{ width: 100, height: 100 }} />
            </HeaderStyle>
            <Outlet />
        </Stack>
    );
}

export default BlankLayout;