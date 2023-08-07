import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));
function SearchBar() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q");

    useEffect(() => {
        if (q) {
            navigate(`/search?q=${encodeURIComponent(q)}`);;
        }
    }, [q, navigate]);

    const handleInputChange = (event) => {
        const newSearch = event.target.value;
        if (newSearch) {
            setSearchParams({ q: newSearch });
        } else {
            setSearchParams({});
        }
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                type="text"
                onChange={handleInputChange}
                name="q"
                placeholder="Search"
                value={q ?? ""}
                inputProps={{ "arial-label": "search" }}
            />
        </Search>
    );
}

export default SearchBar;