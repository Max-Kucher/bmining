import ArchiveIcon from '@untitled-ui/icons-react/build/esm/Archive';
import ClipboardIcon from '@untitled-ui/icons-react/build/esm/Clipboard';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import FileCheck03Icon from '@untitled-ui/icons-react/build/esm/FileCheck03';
import {
    IconButton, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon, Tooltip
} from '@mui/material';
import {usePopover} from "@/hooks/use-popover";
import {Add} from "@mui/icons-material";
import {RouterLink} from "@/components/router-link";
import {dashboardRoutes} from "@/routes/main";

export const MinersTableActions = ({userId = null, user = null, ...props}) => {
    const popover = usePopover();

    const generateAddMinerLink = () => {
        if (userId !== null) {
            return userId !== null ? `/manage/users/${userId}/miners/add` : 'dashboard';
        }

        return dashboardRoutes.dashboard;
    };

    return (<>
        <Tooltip title="More options">
            <IconButton
                onClick={popover.handleOpen}
                ref={popover.anchorRef}
                {...props}>
                <SvgIcon>
                    <DotsHorizontalIcon/>
                </SvgIcon>
            </IconButton>
        </Tooltip>
        <Menu
            anchorEl={popover.anchorRef.current}
            anchorOrigin={{
                horizontal: 'right', vertical: 'bottom'
            }}
            onClose={popover.handleClose}
            open={popover.open}
            PaperProps={{
                sx: {
                    maxWidth: '100%', width: 200
                }
            }}
            transformOrigin={{
                horizontal: 'right', vertical: 'top'
            }}
        >
            <MenuItem onClick={popover.handleClose} component={RouterLink}
                      to={generateAddMinerLink()}>
                <ListItemIcon>
                    <SvgIcon>
                        <Add/>
                    </SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Add new miner"/>
            </MenuItem>
        </Menu>
    </>);
};
