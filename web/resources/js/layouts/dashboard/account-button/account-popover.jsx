import PropTypes from 'prop-types';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import {
    Box,
    Button,
    Divider, Link,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    SvgIcon,
    Typography
} from '@mui/material';
import {RouterLink} from '@/components/router-link';
import {useDispatch} from "react-redux";
import {logout} from "@/slices/userSlice";

export const AccountPopover = (props) => {
    const {anchorEl, onClose, open, user, ...other} = props;
    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom'
            }}
            disableScrollLock
            onClose={onClose}
            open={!!open}
            PaperProps={{sx: {width: 200}}}
            {...other}>
            <Box sx={{p: 2}}>
                <Typography variant="body1">
                    {user.name}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {user.email}
                </Typography>
            </Box>
            <Divider/>
            <Box sx={{p: 1}}>
                <ListItemButton
                    component={RouterLink}
                    href={route('settings.edit')}
                    onClick={onClose}
                    sx={{
                        borderRadius: 1,
                        px: 1,
                        py: 0.5
                    }}
                >
                    <ListItemIcon>
                        <SvgIcon fontSize="small">
                            <Settings04Icon/>
                        </SvgIcon>
                    </ListItemIcon>
                    <ListItemText
                        primary={(
                            <Typography variant="body1">
                                Settings
                            </Typography>
                        )}
                    />
                </ListItemButton>
            </Box>
            <Divider sx={{my: '0 !important'}}/>
            <Box
                sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'center'
                }}
            >
                <Link onClick={logoutHandler} method={'post'}>
                    <Button
                        color="inherit"
                        size="small"
                    >
                        Logout
                    </Button>
                </Link>
            </Box>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool
};
