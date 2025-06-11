import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import TitleAuth from "../../Shared/TitleAuth/TitleAuth";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginSehemaValidation } from "../../../services/vaildators";
import defaultProfileImg from "../../../assets/userImage.png";
import CustomTextField from "../../Shared/CustomTextField/CustomTextField";
import CustomPasswordField from "../../Shared/CustomPasswordField/CustomPasswordField";

type DataType = {
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
  country: string;
  confirmPassword: string;
};

function Register() {
  const showSnackbar = useContext(SnackbarContext);

  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      loginSehemaValidation.shape({
        userName: yup.string().required("User Name is required"),
        phoneNumber: yup.string().required("Phone Number is required"),
        country: yup.string().required("Country is required"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Passwords must match")
          .required("Confirm Password is required"),
      })
    ),
  });

  const [toggle, setToggle] = useState(false);

  const onSubmit = async (data: DataType) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("userName", data.userName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");

    try {
      const response = await fetch(defaultProfileImg);
      const blob = await response.blob();
      const file = new File([blob], "userImage.png", { type: blob.type });

      formData.append("profileImage", file);

      const res = await apiInstance.post(users_endpoints.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("token", res.data.token);
      setToken(res?.data?.token);
      navigate("/login");
      showSnackbar("User Created successfully", "success");
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<{ message?: string }>;
      showSnackbar(
        axiosError?.response?.data?.message || "Registration failed",
        "error"
      );
    }
  };

  return (
    <Grid>
      <TitleAuth
        title="Sign up"
        desc="If you already have an account register You can"
        navigateTo="/auth/login"
        link="Login here !"
      />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <CustomTextField
          label="User Name"
          register={register("userName")}
          error={errors.userName}
        />

        <div className="d-flex gap-4">
          <CustomTextField
            label="Phone Number"
            register={register("phoneNumber")}
            error={errors.phoneNumber}
          />

          <CustomTextField
            label="Country"
            register={register("country")}
            error={errors.country}
          />
        </div>

        <CustomTextField
          label="Email Address"
          register={register("email")}
          error={errors.email}
        />

        <CustomPasswordField
          label="Password"
          register={register("password")}
          error={errors.password}
          toggle={toggle}
          setToggle={setToggle}
        />

        <CustomPasswordField
          label="Confirm Password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          toggle={toggle}
          setToggle={setToggle}
        />

        <CustomButton fullWidth loading={isSubmitting} type="submit">
          Sign up
        </CustomButton>
      </Box>
    </Grid>
  );
}

export default Register;
