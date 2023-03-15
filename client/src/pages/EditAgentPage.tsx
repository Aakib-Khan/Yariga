import { Button, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from "@pankod/refine-mui";
import { Paper } from "@pankod/refine-mui";
import { Box } from "@pankod/refine-mui";
import CustomButton from "components/common/CustomButton";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CreateAgent = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event:any) => {
    event.preventDefault();
  };
  const tooltipMessage = showPassword ? "Hide password" : "Show password";
  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please select an image");

    console.log(data);
    await onFinish(
      {
        ...data,
        photo: propertyImage.url,
        // email: user.email,
      }

      // console.log(photo);
    );
  };
  return (
    <Box>
      {/* <Stack marginLeft="35px"> */}
      <Paper sx={{ px: "25px", pb: "25px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              What Does a Real Estate Agent Do?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              A real estate agent or realtor, is a licensed professional who
              acts as an intermediary between buyers and sellers of real estate.
              The primary responsibilities of a property agent include:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              1. Listing and Marketing Properties for Sale or Rent
            </Typography>
            <Typography variant="body1">
              A property agent will create a marketing plan to showcase
              properties and attract potential buyers or tenants.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              2. Conducting Property Viewings
            </Typography>
            <Typography variant="body1">
              The agent will arrange and conduct property viewings with
              potential buyers or tenants, highlighting the unique features and
              benefits of the property.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">3. Negotiating Deals</Typography>
            <Typography variant="body1">
              The agent will negotiate on behalf of their clients to ensure they
              get the best possible price and terms for the property.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">4. Advising Clients</Typography>
            <Typography variant="body1">
              The agent will provide advice and guidance to clients on market
              conditions, pricing, legal requirements, and other important
              considerations related to buying, selling or renting properties.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">5. Managing Paperwork</Typography>
            <Typography variant="body1">
              The agent will assist in the preparation and signing of legal
              documents such as purchase agreements, leases, and other contracts
              related to real estate transactions.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              6. Providing After-Sales Service
            </Typography>
            <Typography variant="body1">
              The agent will continue to provide support and assistance to their
              clients after the sale or lease is completed, to ensure a smooth
              transition.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Overall, a property agent helps to streamline the buying, selling
              or renting process and ensures that their clients get the best
              possible outcome.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* </Stack> */}
      <Typography
        fontSize={25}
        marginLeft="35px"
        marginTop="20px"
        fontWeight={700}
        color="#11142d"
      >
        Fill The Form To Become an Agent
      </Typography>
      <Box
        height="600px"
        bgcolor="#3f3757"
        mt={2.5}
        borderRadius="15px"
        padding="20px"
      >
        {/* <br /> */}
        <form onSubmit={handleSubmit(onFinishHandler)}>
          <TextField
            label="Agent Name"
            {...register("agentName", { required: true })}
            fullWidth

            margin="normal"
            required
          />
          
          <TextField
            label="Agent Email"
            {...register("agentMail", { required: true })}
            fullWidth
            margin="normal"
            required
          />
          <br />
          <TextField
            id="password-input"
            type={showPassword ? "text" : "password"}
            label="Set a Password"
            fullWidth
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            {...register("agentPassword", { required: true })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={tooltipMessage}>
                    <IconButton
                      aria-label={tooltipMessage}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          {/* <TextField
            label="Set a Password"
            {...register("agentPassword", { required: true })}
            // fullWidth
            margin="normal"
            required
          /> */}
          
          <TextField
            label="Agent Location"
            {...register("agentLocation", { required: true })}
            fullWidth
            margin="normal"
            required
          />
          
          <TextField
            label="Mobile Number"
            {...register("mobileNumber", { required: true })}
            fullWidth
            margin="dense"
            // sx={{ marginBottom: "20px" }}
            required
          />
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="#ffffff"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property Photo/Avatar
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#fcfcfc"
            color="#000000"
          />
        </form>
      </Box>
    </Box>
  );
};

export default CreateAgent;
