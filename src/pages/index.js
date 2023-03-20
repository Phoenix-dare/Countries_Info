import Head from "next/head";
import { useQuery } from "react-query";
import axios from "axios";
import { Inter } from "next/font/google";
import { Grid, Skeleton,Alert } from "@mui/material";
import AllCountries from "@/components/AllCountries";
import UtilityBar from "@/components/UtilityBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const fetchCountriesData = async () => {
    /* try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data;
    } catch (error) {}*/
    try {
      const response = await axios.get("/data.json");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { isLoading, isError, data, error } = useQuery(
    "countriesData",
    fetchCountriesData
  );
  const { data: filteredData } = useQuery("filteredCountriesData", () => {});

  const { data: searchData } = useQuery("searchCountriesData", () => {});

  const countries = searchData || filteredData || data;

  if (isLoading) {
    return <Skeleton variant="rounded" width={210} height={60} />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        Some Error Occured while getting data {error.message}
      </Alert>
    );
  }
  return (
    <>
      <Head>
        <title>Countries Info -Rest Countries Api</title>
        <meta name="description" content="countries-info-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UtilityBar />
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          rowSpacing={8}
        >
          {countries.map((country) => (
            <AllCountries key = {country.name} country={country} />
          ))}
        </Grid>
      </main>
    </>
  );
}
