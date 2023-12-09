import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/system';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { UserMenuActions, MenuContext } from '../../contexts/menuContext';
import { UserContext } from '../../contexts/userContext';
import { paths } from '../../Routes';
import ProfileMenu from '../menu/ProfileMenu';
import ResetPasswordSendMailDialog from '../dialogs/users/ResetPasswordSendMailDialog';
import SignUpDialog from '../dialogs/users/SignUpDialog';
import AgarsonLogo from '../logo/Agarson';
import { StyledLink } from '../styled/Link';


export default function DashBoardNavBar() {
    const { setMenu } = useContext(MenuContext)
    const { user } = useContext(UserContext)
    return (
        <>
            <Box sx={{ bgcolor: '#0039a6', width: '100%', pt: 2, pb: 2, pr: 1 }}>
                {/* parent stack */}
                <Stack direction="row" sx={{
                    justifyContent: "space-between", alignItems: "center"
                }}
                >
                    <StyledLink to={paths.dashboard}>
                        <AgarsonLogo width={35} height={35} title='Go To Dashboard' />
                    </StyledLink>
                    <Stack direction="row"
                        justifyContent={"center"}
                        alignItems="center"
                    >
                        {user ?
                            <>
                                {/* stack1 nav links*/}
                                <Stack
                                    direction="row"
                                    gap={2}
                                    px={2}
                                    sx={{
                                        display: { xs: 'none', md: 'flex' }
                                    }}
                                >
                                </Stack>

                                {/* stack2 right icons*/}
                                <Stack
                                    direction="row"
                                    justifyContent={"center"}
                                    alignItems="center"
                                    gap={2}
                                >

                                    <Tooltip title={user.username || "open settings"}>
                                        <IconButton
                                            onClick={(e) => setMenu({ type: UserMenuActions.profile_menu, anchorEl: e.currentTarget })
                                            }
                                        >
                                            <Avatar
                                                sx={{ width: 30, height: 30 }}
                                                alt="img1" src={user.dp?.public_url} />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </>
                            :
                            null
                        }
                    </Stack >
                </Stack>
            </Box >
            <Outlet />
            <ProfileMenu />
            <ResetPasswordSendMailDialog />
            <SignUpDialog />

        </>
    )
}