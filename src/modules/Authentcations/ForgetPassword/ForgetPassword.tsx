import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fogetPass } from "../../../interfaces/interfaces";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { toast } from "react-toastify";
import { forgetPasswordSehemaValidation } from "../../../services/vaildators";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import CustomTextField from "../../Shared/CustomTextField/CustomTextField";
import TitleAuth from "../../Shared/TitleAuth/TitleAuth";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({
    mode: "onChange",

    resolver: yupResolver(forgetPasswordSehemaValidation), // connect Yup schema here
  });

  function submitData(data: fogetPass): void {
    console.log(data);
    apiInstance
      .post(users_endpoints.forgetPass, data)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        navigate("/auth/reset-password", { state: data?.email });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <TitleAuth
        title="Forget Password"
        desc="If you already have an account register You can"
        navigateTo="/auth/login"
        link="Login here !"
      />
      <Box component="form" onSubmit={handleSubmit(submitData)}>
        <CustomTextField
          {...register("email")}
          label="Email"
          register={register("email")}
          error={errors.email}
        />
        <br />
        <br />

        <CustomButton fullWidth loading={isSubmitting} type="submit">
          Send mail
        </CustomButton>
      </Box>
    </>
  );
}
