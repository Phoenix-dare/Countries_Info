import { IconButton, Typography, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { ColorModeContext } from "@/context/ColorModeContext";
import { useTheme } from "@emotion/react";

const TopBar = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={4}
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Typography variant="h1" fontSize={"18px"} fontWeight={600}>
        Where in the world?
      </Typography>
      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          <Typography variant="body2" padding={1} fontWeight={600}>
            {theme.palette.mode === "dark" ? "LightMode" : "DarkMode"}
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
