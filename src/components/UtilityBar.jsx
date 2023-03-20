import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SearchTwoTone } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import useMediaQuery from "@mui/material/useMediaQuery";

const UtilityBar = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const theme = useTheme();
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setRegion(e.target.value);
    queryClient.prefetchQuery("filteredCountriesData", () =>
      fetchFilteredCountriesData(e.target.value)
    );
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    queryClient.prefetchQuery("searchCountriesData", () =>
      fetchSearchedCountriesData(search, region)
    );
  };

  const fetchFilteredCountriesData = async (region) => {
    const response = await queryClient.fetchQuery("countriesData");
    const filteredData = response.filter(
      (country) => country.region === region
    );
    return filteredData;
  };

  const fetchSearchedCountriesData = async (search) => {
    const response = await queryClient.fetchQuery("countriesData");
    const data = queryClient.getQueryData("filteredCountriesData") ?? response;

    const regex = new RegExp(search, "gi");
    let searchData = data.filter((country) => country.name.match(regex));
    if (region) {
      searchData = searchData.filter((country) => country.region === region);
    }

    return searchData;
  };
  return (
    <Box
      display="flex"
      flexDirection={smallScreen ? "column" : "row"}
      alignItems={smallScreen ? "flex-start" : "center"}
      justifyContent="space-between"
      m={2}
      p={2}
      sx={{ height: smallScreen ? "20vh" : "auto",overflow:"hidden" }}
    >
      <TextField
        onChange={handleInputChange}
        sx={{
          border: "none",
          backgroundColor: theme.palette.secondary.main,
          width: smallScreen ? "100%" : "auto",
          height: "50px",
          padding: "5px",
          boxShadow:theme.palette.mode ==="light" ? "0 0 2px 0 gray" :"none"
        }}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchTwoTone />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Search for a country.."
      />
      <FormControl
        sx={{
          width: smallScreen ? "50%" : "12%",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <InputLabel>Filter by Region</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={region}
          label="Filter by region"
          onChange={handleChange}
          disableUnderline
          MenuProps={{ disablePortal: true }}
        >
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default UtilityBar;
