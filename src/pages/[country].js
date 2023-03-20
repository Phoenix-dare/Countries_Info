import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useTheme } from "@emotion/react";
import { IconButton, Typography, Box, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useMediaQuery from "@mui/material/useMediaQuery";

const CountryDetails = () => {
  const router = useRouter();
  const theme = useTheme();
  const smallScreen = useMediaQuery("(max-width:768px)");

  const { country } = router.query;
  const queryClient = useQueryClient();
  const countriesData = queryClient.getQueryData("countriesData", {
    staleTime: 1000 * 60 * 15,
    cacheTime: 1000 * 60 * 60,
  });

  const countryData = countriesData?.find(
    (c) => c.name.toLowerCase() === country?.toString().toLowerCase()
  );

  //const borders=countriesData.filter((item)=>countryData.borders?.includes(item.alpha3Code || item.alpha2Code )).map(country=>country.name)
  const borders = countriesData?.reduce((acc, item) => {
    if (countryData.borders?.includes(item.alpha3Code || item.alpha2Code)) {
      acc.push(item.name);
    }
    return acc;
  }, []);

  return (
    <Box
      m={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        onClick={() => router.push("/")}
        sx={{
          backgroundColor: `${theme.palette.primary.main}`,
          boxShadow: "0 0 5px 0 hsl(207, 26%, 17%)",
          borderRadius: "5px",
          alignSelf: "flex-start",
        }}
      >
        <ArrowBackIcon />
        <Typography>Back</Typography>
      </IconButton>

      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        width={smallScreen ? "100vw" : "85%"}
        m={6}
      >
        <Box
          sx={{
            maxWidth: smallScreen ? "80vw" : "450px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={countryData?.flags.svg}
            alt={`${countryData?.name}-flag`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          width={smallScreen ? "100vw" : "50%"}
          p={2}
        >
          <Typography variant="h3" fontSize="22px" fontWeight={600}>
            {countryData?.name}
          </Typography>
          <Box
            display="flex"
            flexDirection={smallScreen ? "column" : "row"}
            justifyContent="flex-start"
            flexWrap="nowrap"
          >
            <Box
              width={smallScreen ? "100%" : "50%"}
              sx={{
                marginTop: "10px",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            >
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Native Name:
                </Typography>
                <Typography variant="body1">
                  {countryData?.nativeName}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Region:
                </Typography>
                <Typography variant="body1"> {countryData?.region}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Sub Region:
                </Typography>
                <Typography variant="body1">
                   {countryData?.subRegion}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Capital:
                </Typography>
                <Typography variant="body1">
                   {countryData?.capital}
                </Typography>
              </Box>
            </Box>
            <Box
              width={smallScreen ? "100%" : "50%"}
              sx={{
                marginTop: "10px",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            >
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Top Level Domain:
                </Typography>
                <Typography variant="body1">
                   {countryData?.topLevelDomain}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Currencies :
                </Typography>
                {countryData?.currencies.map((item) => (
                  <Typography variant="body1" key={item.name}> {item.name}</Typography>
                ))}
              </Box>
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Languages:
                </Typography>
                {countryData?.languages.map((item) => (
                  <Typography variant="body1" key={item.name}> {item.name}</Typography>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection={smallScreen ? "column" : "row"}
            alignItems="center"
            justifyContent="flex-start"
            my={1}
          >
            <Box justifySelf="flex-start" alignSelf="flex-start" my={1}>
              <Typography variant="body1" fontWeight={600}>
                Border Countries:
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap">
              {borders?.map((border) => (
                <Box
                key={border}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "4px",
                    margin: "4px",
                    cursor:"pointer"
                  }}
                  onClick={()=>router.push(`/${border}`)}
                >
                  <Typography variant="body2">{border}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default CountryDetails;
