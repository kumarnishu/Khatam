import styled from '@emotion/styled';
import { Menu, MenuItem } from '@mui/material'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReportsMenuActions, MenuContext } from '../../contexts/menuContext';
import { paths } from '../../Routes';
import { UserContext } from '../../contexts/userContext';


export const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;
`

function ReportsMenu() {
    const { menu, setMenu } = useContext(MenuContext)
    const { user } = useContext(UserContext)
    return (
        <Menu
            anchorEl={menu?.anchorEl}
            open={Boolean(menu?.type === ReportsMenuActions.report_menu)}
            onClose={() => setMenu({ type: ReportsMenuActions.close_report_menu, anchorEl: null })}
        >

            <MenuItem
                onClick={
                    () => setMenu({ type: ReportsMenuActions.close_report_menu, anchorEl: null })
                }>
                <StyledLink to={"/"}>Tour</StyledLink>
            </MenuItem>






            <MenuItem
                onClick={
                    () => setMenu({ type: ReportsMenuActions.close_report_menu, anchorEl: null })
                }>
                <StyledLink to={paths.report_help_page}>Help</StyledLink>
            </MenuItem>
        </Menu>
    )
}

export default ReportsMenu