import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Typography variant="h6" sx={{ fontFamily: "Poppins", flexGrow: 1 }}>
      <Link to="/" style={{ textDecoration: "none", fontSize: "26px" }}>
        <span style={{ color: "#3252DF" }}>Stay</span>
        <span style={{ color: "#152C5B" }}>cation.</span>
      </Link>
    </Typography>
  );
}
