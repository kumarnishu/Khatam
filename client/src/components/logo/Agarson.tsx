import { Avatar, Stack, Typography } from "@mui/material"
import logo from "/logo.jpg";
import logo2 from "/logo.png";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

type Props = {
    width?: number,
    height?: number,
    title: string
}
function AgarsonLogo({ width, height, title }: Props) {
    const { user } = useContext(UserContext)
    return (
        <Stack direction="row" justifyContent={"center"}
            alignItems="center" gap={2} >
            <Avatar title={title}
                sx={{ width: width, height: height, borderRadius: 2 }}
                alt="img1" src={logo}
            />
            <Typography component={"h1"} sx={{ fontWeight: 600, fontSize: 20, color: 'white' }} variant="button">
                {user?.company.name || 'Dashboard'}
            </Typography>
        </Stack>
    )
}

export function AgarsonPngLogo({ width, height, title }: Props) {
    return (

        <Avatar title={title}
            sx={{ width: width, height: height, borderRadius: 2 }}
            alt="img1" src={logo2}
        />
    )
}

export default AgarsonLogo