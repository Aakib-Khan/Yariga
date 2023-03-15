import { Email, Phone, Place } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@pankod/refine-mui";
import {
  Edit
} from "@mui/icons-material";
import { ProfileProps, PropertyProps } from "interfaces/common";
import PropertyCard from "./PropertyCard";
import CustomButton from "./CustomButton";
import {  useNavigate } from "@pankod/refine-react-router-v6";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const Profile = ({id,location,number, type, name, avatar, email, properties }: ProfileProps) => {
  // console.log(name,email,  avatar);

  const navigate = useNavigate();
  return(

  <Box>
    <Typography
      fontSize={25}
      fontWeight={700}
      marginLeft="35px"
      color="#11142D"
    >
      {type} Profile
    </Typography>

    <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2.5,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
          width={340}
          height={320}
          alt="abstract"
          className="my_profile-bg"
        />
        <Box
          flex={1}
          sx={{
            marginTop: { md: "58px" },
            marginLeft: { xs: "20px", md: "0px" },
          }}
        >
          <Box
            flex={1}
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap="20px"
          >
            <img
              src={
                checkImage(avatar)
                  ? avatar
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              }
              width={78}
              height={78}
              alt="user_profile"
              className="my_profile_user-img"
            />

            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="30px"
            >
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Typography fontSize={22} fontWeight={600} color="#11142D">
                    {name}
                  </Typography>
                  <Typography fontSize={16} color="#808191">
                    { number && "Realestate Agent"}
                  </Typography>
                </Stack>


                {/* <Stack>
                  <CustomButton
                  title="Edit"
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth
                  icon={ <Edit />}
                  handleClick={() => {
                      navigate(`/agents/edit/${id}`)
                    
                  }}
                  />
                </Stack> */}

              </Stack>

              <Stack direction="column" gap="30px">
              <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">
                      Email
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="10px"
                    >
                      <Email sx={{ color: "#11142D" }} />
                      <Typography fontSize={14} color="#11142D">
                        {email}
                      </Typography>
                    </Box>
                  </Stack>

                <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                  <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">
                   { number && "Phone Number"}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="10px"
                    >
                   { number &&  <Phone sx={{ color: "#11142D" }} />}
                      <Typography fontSize={14} color="#11142D" noWrap>
                        { number && number}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack gap="15px">
                  <Typography marginLeft="15px" fontSize={14} fontWeight={500} color="#808191">
                    {location && "Address"}
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    marginRight="20px"
                    gap="10px"
                  >
                   {location && <Place sx={{ color: "#11142D" }} />}
                    <Typography marginRight="20px" fontSize={14} color="#11142D">
                      {   location }
                    </Typography>
                  </Box>
                </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    {properties && properties.length>0 && (
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
        <Typography fontSize={18} fontWeight={600} color="#11142D">
          {type} Properties
        </Typography>

        <Box
          mt={2.5}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2.5,
          }}
        >
          {properties?.length>0 && (properties.map((property: PropertyProps) => (
            <PropertyCard
              key={property?._id}
              id={property?._id}
              title={property?.title}
              location={property?.location}
              price={property?.price}
              photo={property?.photo}
            />
          )))}
        </Box>
      </Box>
    )}
  </Box>
)
          }

export default Profile;
