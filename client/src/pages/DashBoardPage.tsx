import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { paths } from "../Routes"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { ApartmentOutlined, Book, Group, Person3Outlined, WhatsApp } from "@mui/icons-material";
import BackupIcon from '@mui/icons-material/Backup';

function DashBoardPage() {
    const { user } = useContext(UserContext)
    return (
        <>
            <Box sx={{ bgcolor: "white", m: 0, pt: 2 }}>
                <Grid container >
                    {/* users */}
                    {!user?.user_access_fields.is_hidden && <Grid item xs={12} md={3} lg={3} sx={{ p: 1 }}>
                        <Link to={paths.users} style={{ textDecoration: 'none' }}>
                            <Card sx={{ bgcolor: 'white', boxShadow: 2, border: 10, borderRadius: 1, borderColor: 'white' }}>
                                <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                                    <Person3Outlined sx={{ height: 50, width: 50 }} />
                                    <Typography variant="button" sx={{ fontSize: 16 }} component="div">
                                        Users
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Link>
                    </Grid>}

                    {/* companies */}
                    {!user?.company_access_fields.is_hidden && user?.is_crm_admin && <Grid item xs={12} md={3} lg={3} sx={{ p: 1 }}>
                        <Link to={paths.company} style={{ textDecoration: 'none' }}>
                            <Card sx={{ bgcolor: 'white', boxShadow: 2, border: 10, borderRadius: 1, borderColor: 'white' }}>
                                <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                                    <ApartmentOutlined sx={{ height: 50, width: 50 }} />
                                    <Typography variant="button" sx={{ fontSize: 16 }} component="div">
                                        Companies
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Link>
                    </Grid>}

                    {/* crm */}
                    {!user?.crm_access_fields.is_hidden && <Grid item xs={12} md={3} lg={3} sx={{ p: 1 }}>
                        <Link to={paths.crm} style={{ textDecoration: 'none' }}>
                            <Card sx={{ bgcolor: 'white', boxShadow: 2, border: 10, borderRadius: 1, borderColor: 'white' }}>
                                <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                                    <Group sx={{ height: 50, width: 50 }} />
                                    <Typography variant="button" sx={{ fontSize: 16 }} component="div">
                                        CRM
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Link>
                    </Grid>}
                    {/* reports */}
                    {!user?.report_access_fields.is_hidden && <Grid item xs={12} md={3} lg={3} sx={{ p: 1 }}>
                        <Link to={paths.report} style={{ textDecoration: 'none' }}>
                            <Card sx={{ bgcolor: 'white', boxShadow: 2, border: 10, borderRadius: 1, borderColor: 'white' }}>
                                <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                                    <Book sx={{ height: 50, width: 50 }} />
                                    <Typography variant="button" sx={{ fontSize: 16 }} component="div">
                                        Reports
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Link>
                    </Grid>}
                    {/* whatsapp bot */}
                    {user?.is_admin && <Grid item xs={12} md={3} lg={3} sx={{ p: 1 }}>
                        <Link to={paths.bot} style={{ textDecoration: 'none' }}>
                            <Card sx={{ bgcolor: 'white', boxShadow: 2, border: 10, borderRadius: 1, borderColor: 'white' }}>
                                <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                                    <WhatsApp sx={{ height: 50, width: 50 }} />
                                    <Typography variant="button" sx={{ fontSize: 16 }} component="div">
                                        WA Bot
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Link>
                    </Grid>}
                    {/* backup */}
                    {!user?.backup_access_fields.is_hidden && <Grid item xs={12} md={3} lg={3} sx={{ p: 1 }}>
                        <Link to={paths.backup} style={{ textDecoration: 'none' }}>
                            <Card sx={{ bgcolor: 'white', boxShadow: 2, border: 10, borderRadius: 1, borderColor: 'white' }}>
                                <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                                    <BackupIcon sx={{ height: 50, width: 50 }} />
                                    <Typography variant="button" sx={{ fontSize: 16 }} component="div">
                                        Backup
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Link>
                    </Grid>}


                </Grid>
            </Box >
        </>
    )
}


export default DashBoardPage