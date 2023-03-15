import React from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { AppBar, Avatar, Stack, Toolbar, Typography } from "@pankod/refine-mui";
import jwt_decode, { JwtPayload } from "jwt-decode";

interface UserInfo {
  id: string;
  name: string;
  photo: string;
}
export const Header: React.FC = () => {
  const agentToken = localStorage.getItem("agent");
  const showUserInfo: UserInfo | null = agentToken
    ? jwt_decode(agentToken)
    : null;


    const userString = localStorage.getItem("user") as string
const user = JSON.parse(userString);
console.log(user);

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{ background: "#FCFCFC" }}
    >
      <Toolbar>

        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          
          {showUserInfo ?(
            <Stack direction="row" gap="16px" alignItems="center">
              {showUserInfo?.photo && (
                <Avatar src={showUserInfo?.photo} alt={showUserInfo?.name} />
              )}
              {showUserInfo?.name && (
                <Typography variant="subtitle2" color="black">
                  {showUserInfo?.name}
                </Typography>
              )}
            </Stack>
          ):(
            <Stack direction="row" gap="16px" alignItems="center">
            {user?.picture && (
              <Avatar src={user?.picture} alt={user?.name} />
            )}
            {user?.name && (
              <Typography variant="subtitle2" color="black">
                {user?.name}
              </Typography>
            )}
          </Stack>
          )
          }
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
