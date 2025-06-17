import { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import banner from "../../../assets/banner.png";
import Rectangle from "../../../assets/Rectangle3.png";
import BackyardHousesSection from "./BackyardHousesSection";
import HotelSection from "./HotelSection";
import AdsSections from "./AdsSection";
import TestimonialSlider from "./TestimonalSlider";
import Footer from "./Footer";

import axios from "axios";

import { DateRangePicker } from "rsuite";
import { useNavigate } from "react-router-dom";

import "rsuite/DateRangePicker/styles/index.css";
import NavBar from "../../Shared/NavBar/NavBar";
import { AuthContext } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { IRoom } from "../../../interfaces/IRoom";

import Room1 from "../../../assets/img_Mg==.jpg";
import Room2 from "../../../assets/room-2.jpg";
import Room3 from "../../../assets/room-3.jpg";
import Room4 from "../../../assets/room-4.jpg";
import Room5 from "../../../assets/room-5.jpg";

import Pic1 from "../../../assets/pic.png";
import Pic2 from "../../../assets/pic (1).png";
import Pic3 from "../../../assets/pic (2).png";
import Pic4 from "../../../assets/pic (3).png";
import Pic5 from "../../../assets/pic (1).png";
import Pic6 from "../../../assets/pic (2).png";
import Pic7 from "../../../assets/pic (3).png";
export default function LandingPage() {
  const { token, isManager } = useContext(AuthContext);

  const navigate = useNavigate();
  const [count, setCount] = useState(2);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const [ads, setAdds] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);

  const handleExplore = () => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0]?.toISOString().split("T")[0];
      const endDate = dateRange[1]?.toISOString().split("T")[0];
      navigate(
        `/explore?startDate=${startDate}&endDate=${endDate}&capacity=${count}`
      );
    } else {
      alert("Please select a date range.");
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30"
      );

      if (response.data.success) {
        setRooms(response.data.data.rooms);
      } else {
        console.error("API returned an unsuccessful response.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const fetchAdds = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/ads"
      );

      if (response.data.success) {
        setAdds(response.data.data.ads);
      } else {
        console.error("API returned an unsuccessful response.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchAdds();
  }, []);

  if (token && isManager) {
    return <Navigate to="/dashboard" />;
  }

  // Static dummy data
  const dummyLivingRooms = [
    {
      id: "1",
      roomName: "Green Park",
      location: "Tangerang, Indonesia",
      image: Pic4,
    },
    {
      id: "2",
      roomName: "Podo Wae",
      location: "Madiun, Indonesia",
      image: Pic5,
    },
    {
      id: "3",
      roomName: "Silver Rain",
      location: "Bandung, Indonesia",
      image: Pic6,
    },
    {
      id: "4",
      roomName: "Cashville",
      location: "Kemang, Indonesia",
      image: Pic7,
      label: "Popular Choice",
    },
  ];
  const dummyAds = [
    {
      id: "1",
      roomNumber: "Blue Origin Fams",
      location: "Jakarta, Indonesia",
      price: "$50",
      image: Room1,
    },
    {
      id: "2",
      roomNumber: "Ocean Land",
      location: "Bandung, Indonesia",
      price: "$22",
      image: Room2,
    },
    {
      id: "3",
      roomNumber: "Stark House",
      location: "Malang, Indonesia",
      price: "$856",
      image: Room3,
    },
    {
      id: "4",
      roomNumber: "Vinna Vill",
      location: "Malang, Indonesia",
      price: "$62",
      image: Room4,
    },
    {
      id: "5",
      roomNumber: "Bobox",
      location: "Medan, Indonesia",
      price: "$72",
      image: Room5,
    },
  ];

  const dummyHouses = [
    {
      id: "1",
      houseName: "Tabby Town",
      location: "Gunung Batu, Indonesia",
      image: Pic1,
      label: "Popular Choice",
    },
    {
      id: "2",
      houseName: "Anggana",
      location: "Bogor, Indonesia",
      image: Pic2,
    },
    {
      id: "3",
      houseName: "Seattle Rain",
      location: "Jakarta, Indonesia",
      image: Pic3,
    },
    {
      id: "4",
      houseName: "Wodden Pit",
      location: "Wonosobo, Indonesia",
      image: Pic4,
    },
  ];

  return (
    <>
      <NavBar />

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          p: 4,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pr: 6,
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="#1f2b6c">
            Forget Busy Work,
            <br />
            Start Next Vacation
          </Typography>

          <Typography sx={{ mt: 2, mb: 4 }} color="text.secondary">
            We provide what you need to enjoy your holiday with family.
            <br />
            Time to make another memorable moments.
          </Typography>

          <Typography variant="caption">Pick a Date</Typography>

          <Box sx={{ my: 1 }}>
            <DateRangePicker
              onChange={(value) => setDateRange(value)}
              placeholder="Select Date Range"
              style={{ width: "100%" }}
            />
          </Box>
          <Typography variant="caption">Capacity</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              mb: 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          >
            <IconButton
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              sx={{
                backgroundColor: "#E74C3C",
                borderRadius: 1,
                color: "#fff",
              }}
            >
              <Remove />
            </IconButton>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              {count} person
            </Box>
            <IconButton
              onClick={() => setCount((prev) => prev + 1)}
              sx={{
                backgroundColor: "#1ABC9C",
                borderRadius: 1,
                color: "#fff",
              }}
            >
              <Add />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, width: 200, borderRadius: "8px", color: "#fff" }}
            onClick={handleExplore}
          >
            Explore
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={banner}
            alt="Vacation house"
            sx={{
              width: "100%",
              maxWidth: 500,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ px: 4, py: 6, backgroundColor: "#fff" }}>
        <Typography variant="h5" fontWeight="bold" color="#1f2b6c" mb={3}>
          Most popular ads
        </Typography>
        {dummyAds.length >= 5 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Box sx={{ flex: { xs: "100%", md: "25%" } }}>
              <AdCard
                item={{
                  title: dummyAds[0].roomNumber,
                  location: dummyAds[0].location,
                  price: `$${dummyAds[0].price}`,
                  image: dummyAds[0].image || Rectangle,
                }}
                height={400}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                flex: { xs: "100%", md: "25%" },
              }}
            >
              <AdCard
                item={{
                  title: dummyAds[1].roomNumber,
                  location: dummyAds[1].location,
                  price: `$${dummyAds[1].price}`,
                  image: dummyAds[1].image || Rectangle,
                }}
                height={190}
              />
              <AdCard
                item={{
                  title: dummyAds[2].roomNumber,
                  location: dummyAds[2].location,
                  price: `$${dummyAds[2].price}`,
                  image: dummyAds[2].image || Rectangle,
                }}
                height={190}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                flex: { xs: "100%", md: "25%" },
              }}
            >
              <AdCard
                item={{
                  title: dummyAds[3].roomNumber,
                  location: dummyAds[3].location,
                  price: `${dummyAds[3].price}`,
                  image: dummyAds[3].image || Rectangle,
                }}
                height={190}
              />
              <AdCard
                item={{
                  title: dummyAds[4].roomNumber,
                  location: dummyAds[4].location,
                  price: `$${dummyAds[4].price}`,
                  image: dummyAds[4].image || Rectangle,
                }}
                height={190}
              />
            </Box>
          </Box>
        )}
      </Box>
      <BackyardHousesSection room={dummyHouses} />
      <HotelSection room={dummyLivingRooms} />
      <AdsSections ads={ads} />
      <TestimonialSlider />
      <Footer />

      {/* <Outlet /> */}
    </>
  );
}
function AdCard({ item, height }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        height,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#FF498B",
          color: "#fff",
          borderBottomLeftRadius: "12px",
          px: 2,
          py: 0.8,
          fontSize: "0.9rem",
          fontWeight: "bold",
          zIndex: 2,
        }}
      >
        {item.price} per night
      </Box>
      <CardMedia
        component="img"
        height="100%"
        image={item.image}
        alt={item.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0,0,0,0))",
          color: "white",
          px: 2,
          pb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {item.title}
        </Typography>
        <Typography variant="caption">{item.location}</Typography>
      </CardContent>
    </Card>
  );
}
