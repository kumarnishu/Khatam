import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { paths } from "../Routes"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Person3Outlined } from "@mui/icons-material";

function DashBoardPage() {
    const { user } = useContext(UserContext)
    return (
        <>
            <Box sx={{ bgcolor: "white", m: 0, pt: 2 }}>
                <Grid container >
                    {/* users */}
                    {!user?.user_access_fields.is_hidden && <Grid item xs={12} md={4} lg={3} sx={{ p: 1 }}>
                        <Link to={paths.users} style={{ textDecoration: 'none' }}>
                            <Card sx={{ bgcolor: 'white', boxShadow: 4, border: 10, borderRadius: 3, borderColor: 'white' }}>
                                <CardContent sx={{ display: 'flex', direction: "row", alignItems: "center", gap: 2 }}>
                                    <Person3Outlined sx={{ height: 50, width: 50 }} />
                                    <Typography variant="button" sx={{ fontSize: 16 }} component="div">
                                        Users
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