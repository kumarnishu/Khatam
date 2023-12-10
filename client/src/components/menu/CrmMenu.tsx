import styled from '@emotion/styled';
import { Menu, MenuItem } from '@mui/material'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CrmMenuActions, MenuContext } from '../../contexts/menuContext';
import { paths } from '../../Routes';
import { UserContext } from '../../contexts/userContext';


export const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;
`

function CrmMenu() {
    const { menu, setMenu } = useContext(MenuContext)
    const { user } = useContext(UserContext)
    return (
        <Menu
            anchorEl={menu?.anchorEl}
            open={Boolean(menu?.type === CrmMenuActions.crm_menu)}
            onClose={() => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })}
        >
            <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.crm_reminders}>Reminders</StyledLink>
            </MenuItem>
            <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.leads}>Leads</StyledLink>
            </MenuItem>
            <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.customers}>Customers</StyledLink>
            </MenuItem>

            <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.refers}>Refers</StyledLink>
            </MenuItem>
            <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.crm_activities}>Activities</StyledLink>
            </MenuItem>

            {user?.is_admin && <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.updateble_fields_lead}>Fields</StyledLink>
            </MenuItem>}
            <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.useless_leads}>Useless</StyledLink>
            </MenuItem>
            <MenuItem
                onClick={
                    () => setMenu({ type: CrmMenuActions.close_crm_menu, anchorEl: null })
                }>
                <StyledLink to={paths.crm_help_page}>Help</StyledLink>
            </MenuItem>
        </Menu>
    )
}

export default CrmMenu