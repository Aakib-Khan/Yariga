import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";

import Profile from "components/common/Profile";

const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "agents",
    id: id as string,
  });

//   console.log(data);

  const myProfile = data?.data ?? [];
  console.log("my Profile",myProfile);
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      id={myProfile._id}
      type="Agent"
      name={myProfile?.agentName}
      email={myProfile?.agentMail}
      avatar={myProfile?.photo}
      location={myProfile?.agentLocation}
      number={myProfile?.mobileNumber}
      properties={myProfile?.allProperties}
    />
  );
};

export default AgentProfile;
