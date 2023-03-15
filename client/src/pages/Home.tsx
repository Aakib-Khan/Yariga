import { useList } from "@pankod/refine-core";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@pankod/refine-mui";
import PieChart from "components/charts/PieChart";
import PropertyReferrals from "components/charts/PropertyReferrals";
import TotalRevenue from "components/charts/TotalRevenue";
import PropertyCard from "components/common/PropertyCard";
import TopAgent from "components/Home/TopAgent";
import { useState } from "react";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const tooltipMessage = showPassword ? "Hide password" : "Show password";

  const [open, setOpen] = useState<boolean>(false);

  const latestProperties = data?.data ?? [];
  const agent = localStorage.getItem("agent");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;
  const onFinishHandler = async (data: FieldValues) => {
    // if (!propertyImage.name) return alert("Please select an image");

    // console.log("data",data.agentMail,data.agentPassword);
    let result = await fetch(`/api/v1/agents/signin`, {
      method: "post",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    //@ts-ignore
    const agent = result.agent;
    //@ts-ignore
    console.log(result.agent);
    if (result) {
      localStorage.setItem(
        "agent",
        JSON.stringify(
          //@ts-ignore
          {
            agent,
          }
        )
      );
      setOpen(false);
      // localStorage.removeItem("user");
    }
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleLogOutAgent=()=>{
    localStorage.removeItem("agent")
  }
  return (
    <Box
    //  bgcolor="white"
    >
      <Stack>
        <Stack justifyContent="space-between" direction="row">
          <Stack>
            <Typography
              fontSize={25}
              marginLeft="35px"
              marginBottom="12px"
              fontWeight={500}
              color="#11142D"
            >
              Dashboard
            </Typography>
          </Stack>
          <Stack>
            {!agent && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF0078",
                  color: "#ffffff",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#FF0044", // background color on hover
                  },
                }}
                // style={{ backgroundColor: backgroundColor, color: color }}
                onClick={handleOpen}
              >
                Real Estate Agent Login
              </Button>
            )}

            {agent && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "#ffffff",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#303f9f", // background color on hover
                  },
                }}
                // style={{ backgroundColor: backgroundColor, color: color }}
                onClick={handleLogOutAgent}
              >
                Real Estate Agent Logout
              </Button>
            )}
          </Stack>
        </Stack>

        <Modal
          // className={classes.modal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={handleClose}
        >
          <div
            style={{
              backgroundColor: "#011f4b",
              // boxShadow: theme.shadows[5],
              padding: "30px",
              borderRadius: 10,
              width: "315px",
              height: "275px",
            }}
          >
            <form onSubmit={handleSubmit(onFinishHandler)}>
              <TextField
                // id="email-input"
                label="Email"
                {...register("agentMail", { required: true })}
                type="email"
                // sx={{padding:"20px"}}
                sx={{ width: "240px" }}
                // value={email}
                // onChange={handleEmailChange}
              />
              <br />
              <TextField
                id="password-input"
                type={showPassword ? "text" : "password"}
                label="Enter Password"
                fullWidth
                sx={{ marginY: "20px" }}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                {...register("agentPassword", { required: true })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={tooltipMessage}>
                        <IconButton
                          aria-label={tooltipMessage}
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <Button type="submit" variant="contained" color="primary">
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </Modal>
      </Stack>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#C70039", "#FFBF00"]}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#7D3C98", "#34495E"]}
        />
        <PieChart
          title="Total customers"
          value={5684}
          series={[75, 25]}
          colors={["#275be8", "#2ECC71"]}
        />
        <PieChart
          title="Properties for Cities"
          value={555}
          series={[75, 25]}
          colors={["#6C3483", "#A04000"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestProperties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
