import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  MenuItem,
  ListItemIcon,
  ListItemText,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { facilities_endpoints } from "../../../../services/api/apiConfig";
import { AxiosError } from "axios";
import { privateApiInstance } from "../../../../services/api/apiInstance";
import { SnackbarContext } from "../../../../contexts/SnackbarContext";
import { facilityDataSehemaValidation } from "../../../../services/vaildators";

// Props interface
interface FacilityDataProps {
  selectedId?: string;
  name?: string;
  getAllFacilities: () => void;
}

// Form inputs interface
interface FormInputs {
  name: string;
}

export default function FacilityData({
  selectedId,
  name,
  getAllFacilities,
}: FacilityDataProps) {
  const showSnackbar = useContext(SnackbarContext);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(facilityDataSehemaValidation),
  });

  useEffect(() => {
    if (open) {
      reset({ name: name || "" });
    }
  }, [open, name, reset]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      if (selectedId && name) {
        await privateApiInstance.put(
          facilities_endpoints.UPDATE_FACILITY(selectedId),
          data
        );
        showSnackbar("Facility updated successfully", "success");
      } else {
        await privateApiInstance.post(facilities_endpoints.ADD_FACILITY, data);
        showSnackbar("Facility added successfully", "success");
      }
      getAllFacilities();
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      showSnackbar(
        axiosError?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <>
      {selectedId ? (
        <MenuItem onClick={() => setOpen(true)}>
          <ListItemIcon>
            <EditIcon
              sx={{
                color: "#203FC7",
              }}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpen(true)}
          sx={{
            textTransform: "none",
            boxShadow: "none",
            px: 4,
            backgroundColor: "#203FC7",
            fontFamily: "Poppins",
          }}
        >
          Add New Facility
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Poppins",
          }}
        >
          <Typography fontWeight="bold">
            {selectedId ? "Edit Facility" : "Add New Facility"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon color="error" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <FormControl fullWidth variant="filled">
              <TextField
                {...register("name")}
                placeholder="Facility Name"
                error={!!errors.name}
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "10px !important",
                  },
                }}
                helperText={errors.name?.message}
              />
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : undefined
              }
              sx={{
                textTransform: "none",
                fontFamily: "Poppins",
              }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
