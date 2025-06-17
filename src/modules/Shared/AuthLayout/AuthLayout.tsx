import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Container, Grid, Typography } from "@mui/material";
import Logo from "../Logo/Logo";
import LoginImage from "../../../assets/SigninImage.jpg";
import RegisterImage from "../../../assets/SignupImage.jpg";
import ResetForgetImage from "../../../assets/ResetForgetPasswordImage.jpg";

const Images = {
  login: LoginImage,
  register: RegisterImage,
  "forget-password": ResetForgetImage,
  "reset-passowrd": ResetForgetImage,
};
export default function AuthLayout() {
  const location = useLocation();

  const { token, isManager } = useContext(AuthContext);
  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }
  if (token && !isManager) {
    return <Navigate to="/" />;
  }
  const authPage = location.pathname
    .split("/auth/")
    .filter(Boolean)
    .pop() as string;

  return (
    <Grid size="grow" direction="row" sx={{ height: "100vh", display: "flex" }}>
      {/* Left side: Login form */}
      <Grid
        size="grow"
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          maxWidth: { xs: "100%", md: "50%" },
          padding: { xs: 2, md: 6 },
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Logo />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
            flex: 1,

            // justifyContent: "center",
          }}
        >
          <Container sx={{ width: "100%" }}>
            <Outlet />
          </Container>
        </Box>
      </Grid>

      {/* Right side: Image */}
      <Grid
        size="grow"
        sx={{
          display: { xs: "none", md: "flex" },
          flexBasis: "50%",
          maxWidth: "50%",
          padding: 4,
          borderRadius: 3,
          overflow: "hidden",
          boxSizing: "border-box",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Images[authPage as keyof typeof Images]})`,
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "content-box",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            boxSizing: "border-box",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              color: "#fff",
              padding: "5rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "2vw",
              }}
            >
              Sign in to Roamhome
            </Typography>
            <Typography
              sx={{
                marginTop: "0.5rem",

                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "1vw",
              }}
            >
              Homes as unique as you.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
