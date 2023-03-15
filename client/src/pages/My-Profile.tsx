import { useGetIdentity, useOne } from "@pankod/refine-core";

import jwt_decode, { JwtPayload } from "jwt-decode";

import Profile from "components/common/Profile";
import { UserInfo } from "interfaces/common";
import { useEffect, useState } from "react";
import { Skeleton } from "@pankod/refine-mui";
interface ProfileProps {
  key: string;
  id: string;
  type: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  number: string;
  properties: any[]; // replace any with the actual type of properties
}
interface showAgentInfo {
  key: string;
  id: string;
  type: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  number: string;
  properties: any[]; // replace any with the actual type of properties
}
const ShowAgentInfo = () => {
  const [agentInfo, setAgentInfo] = useState([])
  const [loading, setLoading] = useState(true);
  // const agent = localStorage.getItem("agent") as string
  // console.log(user);
  const agentToken = localStorage.getItem("agent");
  const showAgentInfo: showAgentInfo | null = agentToken? jwt_decode<showAgentInfo>(agentToken): null;
  // console.log("showAgentInfo", showAgentInfo);
  // const { data: user } = useGetIdentity();
  //@ts-ignore
    // const agentInfo=Object.keys(showAgentInfo).length>0
// console.log("agentInfo",agentInfo);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch(`/api/v1/agents/${showAgentInfo?.id}`);
      const data = await response.json();
      
      // console.log("data",data);
      setAgentInfo(data)
      setLoading(false);
      console.log("agentInfo",agentInfo);
    } catch (error) {
      console.error(error);
    }
  }
if (agentInfo) {
  // agentInfo
    fetchData()
    
  }
}, [])
if (loading || !agentInfo) {
  return (
    <div>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={100} />
    </div>
  );
}
const userString = localStorage.getItem("user") as string
const user = JSON.parse(userString);
  
  // if (isLoading) return <div>loading...</div>;
  // if (isError) return <div>error...</div>;
  return (
    <>
    {
      //@ts-ignore
      showAgentInfo ? (

        <Profile
        //@ts-ignore
        key={agentInfo?._id}
        //@ts-ignore
        id={agentInfo?._id}
        type="My"
        //@ts-ignore 
        name={agentInfo?.agentName}
        //@ts-ignore 
        email={agentInfo?.agentMail}
        //@ts-ignore 
        avatar={agentInfo?.photo}
        //@ts-ignore 
        location={agentInfo?.agentLocation}
        //@ts-ignore 
        number={agentInfo?.mobileNumber}
        //@ts-ignore 
          properties={agentInfo?.allProperties}
        />
      ) 
       :
       (

        <Profile
        key={user.userid}
        id={user.userid}
        type="My"
        name={user?.name}
        email={user?.email}
        avatar={user?.avatar}
        location={user.userLocation}
        number={user.mobileNumber}
        properties={user.allProperties}
        />
    
      )
    }
        </>
  );
};

export default ShowAgentInfo;
