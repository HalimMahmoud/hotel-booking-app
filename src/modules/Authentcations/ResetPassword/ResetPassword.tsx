import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { restPassword } from "../../../interfaces/interfaces";
import { users_endpoints } from "./../../../services/api/apiConfig";
import { apiInstance } from "../../../services/api/apiInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { resetPasswordSehemaValidation } from "./../../../services/vaildators";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import CustomPasswordField from "../../Shared/CustomPasswordField/CustomPasswordField";
import CustomTextField from "../../Shared/CustomTextField/CustomTextField";
import TitleAuth from "../../Shared/TitleAuth/TitleAuth";

export default function ResetPassword() {
  const { state } = useLocation();

  const navigate = useNavigate();
  // const { changeTogle, changeTogle2, eyeTogel, eyeTogel2 } = usePasswordHook();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: state,
    },

    resolver: yupResolver(resetPasswordSehemaValidation), // connect Yup schema here
  });

  function submitData(data: restPassword): void {
    console.log(data);
    apiInstance
      .post(users_endpoints.restPassword, data)
      .then((res) => {
        toast.success(res?.data?.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data.message);
      });
  }
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [trigger, confirmPassword, password]);

  console.log(state);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <TitleAuth
        title="Reset Password"
        desc="If you already have an account register You can"
        navigateTo="/auth/login"
        link="Login here !"
      />

      <Box component="form" onSubmit={handleSubmit(submitData)}>
        <CustomTextField
          label="Email"
          value={state}
          disabled={!!state}
          register={register("email")}
        />

        <CustomTextField
          label="OTP"
          register={register("seed")}
          error={errors.seed}
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
          register={register("confirmPassword", {
            validate: (confirmPassword) =>
              confirmPassword === watch("password") ||
              "confirmPassword not match the password",
          })}
          error={errors.confirmPassword}
          toggle={toggle}
          setToggle={setToggle}
        />
        <CustomButton fullWidth loading={isSubmitting} type="submit">
          Reset
        </CustomButton>
      </Box>
    </>
  );
}
