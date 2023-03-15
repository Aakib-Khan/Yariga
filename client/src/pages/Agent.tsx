import { Edit } from "@mui/icons-material";
import { useList } from "@pankod/refine-core";
import { Box, Skeleton, Stack, Typography } from "@pankod/refine-mui";
import {  useNavigate } from "@pankod/refine-react-router-v6";
// import {  useNavigate } from "@pankod/refine-react-router-v6";

import AgentCard  from "components/Agent/AgentCard";
import CustomButton from "components/common/CustomButton";

const Agents = () => {
    const { data, isLoading, isError } = useList({ resource: "agents" });
    const navigate = useNavigate();

    const allAgents = data?.data ?? [];
    // console.log(allAgents);
    const user = localStorage.getItem("user");
    const agentToken = localStorage.getItem("agent");


    // if (isLoading) return <div>loading...</div>;
    if (isLoading) {
        return (
          <div>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={100} />
          </div>
        );
      }
    if (isError) return <div>error...</div>;

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">

            <Stack>

            <Typography fontSize={25} marginLeft="35px" fontWeight={700} color="#11142d">
                Agents List
            </Typography>
            </Stack>

            <Stack>
            {
               user && !agentToken && (

                    <CustomButton
                          title="Want To Become a real estate agent ?"
                          backgroundColor='#FF0000'
                          color='#ffffff'
                          fullWidth
                        //   icon={ <Edit />}
                          handleClick={() => {
                              navigate(`/agents/create/`)
                            
                          }}
                          />
                
          )  }
            </Stack>
            </Stack>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                {allAgents.map((agent) => (
                    <AgentCard
                        key={agent._id}
                        id={agent._id}
                        name={agent.agentName}
                        email={agent.agentMail}
                        number={agent.mobileNumber}
                        location={agent.agentLocation}
                        avatar={agent.photo}
                        noOfProperties={agent.allProperties.length}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Agents;
