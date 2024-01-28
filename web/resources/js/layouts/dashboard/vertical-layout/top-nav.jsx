import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import {Box, IconButton, Stack, SvgIcon, useMediaQuery} from '@mui/material';
import {alpha, useTheme} from '@mui/material/styles';
import {AccountButton} from '../account-button';
import {NotificationsButton} from '../notifications-button';
import {SearchButton} from '../search-button';
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import {ManagerContent} from "@/Components/Wrappers/Permissions/ManagerContent";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice";
import {TasksButton} from "@/Components/Tasks/TasksButton";

const TOP_NAV_HEIGHT = 64;
const SIDE_NAV_WIDTH = 320;

export const TopNav = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const {onMobileNavOpen, ...other} = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const theme = useTheme();
    return (
        <Box
            component="header"
            sx={{
                borderRadius: '60px',
                backdropFilter: 'blur(6px)',
                // backgroundColor: (theme) => alpha(theme.palette.mode == 'dark' ? theme.palette.background.default : theme.palette.primary.main , 0.8),
                backgroundColor: (theme) => alpha('#ffffff'),
                border: 'solid 1px rgba(0,0,0,0.1)',
                // backgroundColor: ,
                position: 'sticky',
                margin: '10px',
                marginTop: '20px',
                marginRight: '20px',

                left: {
                    lg: `${SIDE_NAV_WIDTH + 20}px`
                },
                top: '20px',
                // boxShadow: theme.palette.mode == 'dark' ? '0px 0px 10px 0px ' + theme.palette.primary.main : '',
                boxShadow: theme.palette.mode == 'dark' ? '0px 0px 10px 0px #ffbe4e3d' : '',
                width: {
                    lg: `calc(100% - ${SIDE_NAV_WIDTH + 20}px)`
                },
                zIndex: (theme) => theme.zIndex.appBar
            }}
            {...other}>
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{
                    minHeight: TOP_NAV_HEIGHT,
                    px: 2
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                >
                    {!lgUp && (
                        <IconButton onClick={onMobileNavOpen}>
                            <SvgIcon>
                                <Menu01Icon/>
                            </SvgIcon>
                        </IconButton>
                    )}
                    <ManagerContent>
                        <SearchButton/>
                    </ManagerContent>
                </Stack>
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                >
                    {/*<LanguageSwitch/>*/}
                    <ThemeSwitcher/>
                    <NotificationsButton/>
                    <ManagerContent>
                        <TasksButton/>
                    </ManagerContent>
                    {/*<ContactsButton/>*/}

                    <AccountButton/>
                </Stack>
            </Stack>
        </Box>
    );
};

TopNav.propTypes = {
    onMobileNavOpen: PropTypes.func
};
