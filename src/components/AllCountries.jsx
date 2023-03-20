import { useRouter } from "next/router";
import { Grid, Typography, Box ,Card} from "@mui/material";
import { useTheme } from "@emotion/react";
import { memo } from 'react';

const AllCountries = memo(function AllCountries({ country }) {
  const theme = useTheme();
  const router = useRouter()
  return (
    <Grid item lg={3} container direction="column" alignItems="center">
      
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="80%"
          sx={{
            backgroundColor: theme.palette.primary.main,
            cursor: "pointer",
          }}
          onClick={()=>router.push(`/${country.name}`)}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "190px",
              overflow: "hidden",
            }}
          >
            <img
              src={country.flags.svg}
              alt="official-flag"
              style={{
                maxWidth: "100%",
                minHeight: "100%",
                objectFit: "cover",
              }}
            
            />
          </Box>
          <Box
            p={2}
            display="flex"
            alignSelf="flex-start"
            width={"100%"}
            flexDirection="column"
          >
            <Typography variant="h2" fontSize={"20px"} py={2} fontWeight={600}>
              {country.name}
            </Typography>
            <Box>
              <Typography variant="body" fontWeight={600}>
                Population
              </Typography>
              <Typography variant="body">:{country.population}</Typography>
            </Box>
            <Box>
              <Typography variant="body" fontWeight={600}>
                Region
              </Typography>
              <Typography variant="body">:{country.region}</Typography>
            </Box>
            <Box>
              <Typography variant="body" fontWeight={600}>
                Capital
              </Typography>
              <Typography variant="body">:{country.capital}</Typography>
            </Box>
          </Box>
        </Box>
    </Grid>
  );
});

export default AllCountries;
