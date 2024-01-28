import {Box, Button, Stack, SvgIcon, Typography, useMediaQuery} from "@mui/material";
import {Link as MuiLink} from "@mui/material";
import WidthWrapper from "@/Components/Main/WidthWrapper";
import {LogIn01} from "@untitled-ui/icons-react";
import {LogoTrans} from "@/Components/Main/LogoTrans";
import {useTheme} from "@mui/material/styles";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {MenuOutlined} from "@mui/icons-material";
import {useState} from "react";
import {selectAuth, selectUser} from "@/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {RouterLink} from "@/Components/router-link";
import {Link} from "react-router-dom";
import {mainRoutes} from "@/routes/main";

export function HeaderLink({href, children}) {
    return (<MuiLink component={RouterLink} sx={{
        color: '#4B4B4B', fontSize: '14px',
    }} to={href}>{children}</MuiLink>);
}

export function Header() {

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return <>
        {isMdScreen ? <HeaderMob/> : <HeaderFull/>}
    </>
};

export function LanguageSwitcher() {
    return (<Stack direction={'row'} spacing={'5px'} alignItems={'center'}>
        <Box width={'25px'} height={'25px'} sx={{borderRadius: '100px'}}>
            <img src="/assets/uk.svg"/>
        </Box>
        <Typography sx={{color: '#393939',}} fontSize={13} fontWeight={'bold'}>
            EN
        </Typography>
    </Stack>);
}

export function HeaderMob() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuth = useSelector(selectAuth);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (<>
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '3.75rem',
            borderBottom: 'solid 0.0625rem #D9D9D9',
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            backgroundColor: 'white',
            width: '100vw',
            padding: '0.625rem 1.25rem',
            zIndex: '1000',
        }}>
            <LogoTrans/>
            <MenuOutlined sx={{marginLeft: 'auto', marginRight: '0'}} onClick={() => {
                setSidebarOpen(true);
            }}/>
        </Box>
        <SwipeableDrawer anchor={'right'}
                         fullwidth
                         open={sidebarOpen}

            // onClose={toggleDrawer(anchor, false)}
            // onOpen={toggleDrawer(anchor, true)}
        >
            <Box sx={{width: '90vw'}}>
                <Box sx={{
                    width: '100%',
                    height: '3.75rem',
                    padding: '0.625rem 1.25rem',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottom: 'solid 0.0625rem #D9D9D9',
                }}>
                    <MenuOutlined onClick={() => {
                        setSidebarOpen(false);
                    }}/>
                </Box>
                <Stack mx={'1rem'} spacing={'1rem'} mb={'2rem'} mt={'3rem'}>
                    <HeaderLink href={mainRoutes.main}>Home</HeaderLink>
                    <HeaderLink href={mainRoutes.faq}>Questions & Answers</HeaderLink>
                    <HeaderLink href={mainRoutes.howItWorks}>How it works?</HeaderLink>
                </Stack>
                <Stack direction={'column'} justifyContent={'center'} spacing={'1.875rem'} p={1}

                >
                    {isAuth === false ? <>
                        <Button sx={{}} variant={'contained'} component={Link} to={'/login'}>
                            Log in
                        </Button>
                        <Button sx={{
                            color: '#393939',
                        }} variant={'outlined'} component={Link} to={'/register'}>
                            Register
                        </Button>
                    </> : <Button sx={{
                        color: '#393939',
                    }} variant={'outlined'} component={Link} to={'/dashboard'}>
                        Dashboard
                    </Button>}
                </Stack>
            </Box>
        </SwipeableDrawer>
    </>);
}

export function HeaderFull() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuth = useSelector(selectAuth);
    return (<Box sx={{

        height: '6.3125rem',
        borderBottom: 'solid 0.0625rem #D9D9D9',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
    }}>
        <WidthWrapper sx={{flex: 1, width: '100%'}}>
            <Stack direction={'row'} sx={{height: '100%'}} alignItems={'center'}>
                <Stack direction={'row'} alignItems={'center'} spacing={'56px'} height={'100%'}

                >
                    <LogoTrans/>
                    <HeaderLink href={'/'}>Home</HeaderLink>
                    <HeaderLink href={'/faq'}>Questions & Answers</HeaderLink>
                    <HeaderLink href={'/how-it-works'}>How it works?</HeaderLink>
                </Stack>
                <Stack direction={'row'} spacing={'3.125rem'} sx={{marginLeft: 'auto', marginRight: '0'}}>
                    <Stack direction={'row'} alignItems={'flex-end'} spacing={'1.875rem'} ml={'3.125rem'}
                           mr={'3.375rem'}
                    >
                        {isAuth === false ? <>
                            <Button sx={{}} variant={'contained'} component={Link} to={'/login'}
                                    startIcon={<LogIn01/>}>Log
                                in</Button>
                            <Button sx={{
                                color: '#393939',
                            }} variant={'outlined'} component={Link} to={'/register'}>
                                Register
                            </Button>
                        </> : <Button sx={{
                            color: '#393939',
                        }} variant={'outlined'} component={Link} to={'/dashboard'}>
                            Dashboard
                        </Button>}

                    </Stack>
                </Stack>
            </Stack>
        </WidthWrapper>
    </Box>);
}
