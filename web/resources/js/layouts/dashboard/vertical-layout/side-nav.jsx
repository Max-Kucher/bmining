import {useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import File04Icon from '@untitled-ui/icons-react/build/esm/File04';
import {Box, Button, Drawer, Stack, SvgIcon, Typography} from '@mui/material';
import {alpha, useTheme} from '@mui/material/styles';
import {Logo} from '@/components/logo';
import {SideNavSection} from './side-nav-section';
import {Link, usePage} from "@inertiajs/react";
import {useSettings} from "@/hooks/use-settings";
import {permissionCheck} from "@/utils/permissions";
import {AdminContent} from "@/Components/AdminContent";
import Users03Icon from "@/icons/untitled-ui/duocolor/users-03";
import {
    AbcOutlined, AppBlockingOutlined,
    DashboardSharp,
    HowToReg,
    HowToVoteSharp,
    HowToVoteTwoTone,
    Info,
    WorkHistory
} from "@mui/icons-material";
import {ManagerContent} from "@/Components/Wrappers/Permissions/ManagerContent";
import {CustomerContent} from "@/Components/Wrappers/Permissions/CustomerContent";
import {useSelector} from "react-redux";
import {selectAuth, selectPermissions, selectUser} from "@/slices/userSlice";

const SIDE_NAV_WIDTH = 280;

const useCssVars = (color) => {
    const theme = useTheme();
    const settings = useSettings();
    return useMemo(() => {
        switch (color) {
            case 'blend-in':
                if (theme.palette.mode === 'dark') {
                    return {
                        '--nav-bg': theme.palette.background.default,
                        '--nav-color': theme.palette.neutral[100],
                        '--nav-border-color': theme.palette.neutral[700],
                        '--nav-logo-border': theme.palette.neutral[700],
                        '--nav-section-title-color': theme.palette.neutral[400],
                        '--nav-item-color': theme.palette.neutral[400],
                        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-color': theme.palette.text.primary,
                        '--nav-item-disabled-color': theme.palette.neutral[600],
                        '--nav-item-icon-color': theme.palette.neutral[500],
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[700],
                        '--nav-item-chevron-color': theme.palette.neutral[700],
                        '--nav-scrollbar-color': theme.palette.neutral[400]
                    };
                } else {
                    return {
                        '--nav-bg': theme.palette.background.default,
                        '--nav-color': theme.palette.text.primary,
                        '--nav-border-color': theme.palette.neutral[100],
                        '--nav-logo-border': theme.palette.neutral[100],
                        '--nav-section-title-color': theme.palette.neutral[400],
                        '--nav-item-color': theme.palette.text.secondary,
                        '--nav-item-hover-bg': theme.palette.action.hover,
                        '--nav-item-active-bg': theme.palette.action.selected,
                        '--nav-item-active-color': theme.palette.text.primary,
                        '--nav-item-disabled-color': theme.palette.neutral[400],
                        '--nav-item-icon-color': theme.palette.neutral[400],
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[400],
                        '--nav-item-chevron-color': theme.palette.neutral[400],
                        '--nav-scrollbar-color': theme.palette.neutral[900]
                    };
                }

            case 'discreet':
                if (theme.palette.mode === 'dark') {
                    return {
                        '--nav-bg': theme.palette.neutral[900],
                        '--nav-color': theme.palette.neutral[100],
                        '--nav-border-color': theme.palette.neutral[700],
                        '--nav-logo-border': theme.palette.neutral[700],
                        '--nav-section-title-color': theme.palette.neutral[400],
                        '--nav-item-color': theme.palette.neutral[400],
                        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-color': theme.palette.text.primary,
                        '--nav-item-disabled-color': theme.palette.neutral[600],
                        '--nav-item-icon-color': theme.palette.neutral[500],
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[700],
                        '--nav-item-chevron-color': theme.palette.neutral[700],
                        '--nav-scrollbar-color': theme.palette.neutral[400]
                    };
                } else {
                    return {
                        '--nav-bg': theme.palette.neutral[50],
                        '--nav-color': theme.palette.text.primary,
                        '--nav-border-color': theme.palette.divider,
                        '--nav-logo-border': theme.palette.neutral[200],
                        '--nav-section-title-color': theme.palette.neutral[500],
                        '--nav-item-color': theme.palette.neutral[500],
                        '--nav-item-hover-bg': theme.palette.action.hover,
                        '--nav-item-active-bg': theme.palette.action.selected,
                        '--nav-item-active-color': theme.palette.text.primary,
                        '--nav-item-disabled-color': theme.palette.neutral[400],
                        '--nav-item-icon-color': theme.palette.neutral[400],
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[400],
                        '--nav-item-chevron-color': theme.palette.neutral[400],
                        '--nav-scrollbar-color': theme.palette.neutral[900]
                    };
                }

            case 'evident':
                if (theme.palette.mode === 'dark') {
                    return {
                        '--nav-bg': theme.palette.neutral[800],
                        '--nav-color': theme.palette.common.white,
                        '--nav-border-color': 'transparent',
                        '--nav-logo-border': theme.palette.neutral[700],
                        '--nav-section-title-color': theme.palette.neutral[400],
                        '--nav-item-color': theme.palette.neutral[400],
                        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-color': theme.palette.common.white,
                        '--nav-item-disabled-color': theme.palette.neutral[500],
                        '--nav-item-icon-color': theme.palette.neutral[400],
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[500],
                        '--nav-item-chevron-color': theme.palette.neutral[600],
                        '--nav-scrollbar-color': theme.palette.neutral[400]
                    };
                } else {
                    return {
                        '--nav-bg': theme.palette.neutral[800],
                        '--nav-color': theme.palette.common.white,
                        '--nav-border-color': 'transparent',
                        '--nav-logo-border': theme.palette.neutral[700],
                        '--nav-section-title-color': theme.palette.neutral[400],
                        '--nav-item-color': theme.palette.neutral[400],
                        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-color': theme.palette.common.white,
                        '--nav-item-disabled-color': theme.palette.neutral[500],
                        '--nav-item-icon-color': theme.palette.neutral[400],
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[500],
                        '--nav-item-chevron-color': theme.palette.neutral[600],
                        '--nav-scrollbar-color': theme.palette.neutral[400]
                    };
                }
            case 'orange':
                if (theme.palette.mode === 'dark') {
                    return {
                        '--nav-bg': theme.palette.neutral[800],
                        '--nav-color': theme.palette.common.white,
                        '--nav-border-color': 'transparent',
                        '--nav-logo-border': theme.palette.neutral[700],
                        '--nav-section-title-color': theme.palette.neutral[400],
                        '--nav-item-color': theme.palette.neutral[400],
                        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-color': theme.palette.common.white,
                        '--nav-item-disabled-color': theme.palette.neutral[500],
                        '--nav-item-icon-color': theme.palette.neutral[400],
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[500],
                        '--nav-item-chevron-color': theme.palette.neutral[600],
                        '--nav-scrollbar-color': theme.palette.neutral[400]
                    };
                } else {
                    let commonBlack = '#3a3a3a';
                    return {
                        '--nav-bg': theme.palette.primary.main,
                        '--nav-color': commonBlack,
                        '--nav-border-color': 'transparent',
                        '--nav-logo-border': theme.palette.neutral[700],
                        '--nav-section-title-color': commonBlack,
                        '--nav-item-color': commonBlack,
                        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                        '--nav-item-active-color': theme.palette.common.white,
                        '--nav-item-disabled-color': theme.palette.neutral[500],
                        '--nav-item-icon-color': commonBlack,
                        '--nav-item-icon-active-color': theme.palette.primary.main,
                        '--nav-item-icon-disabled-color': theme.palette.neutral[500],
                        '--nav-item-chevron-color': commonBlack,
                        '--nav-scrollbar-color': '#ffa200'
                    };
                }

            default:
                return {};
        }
    }, [theme, color]);
};
export const SideNav = (props) => {
    const {color = 'evident', sections = []} = props;
    const pathname = '/';
    // TODO: fix routing
    const cssVars = useCssVars(color);
    const user = useSelector(selectUser);
    const isAuth = useSelector(selectAuth);

    const userPermissions = useSelector(selectPermissions);
    const theme = useTheme();

    const logoRef = useRef(null);
    const containerRef = useRef(null);

    return (<Box
        ref={containerRef}
        sx={{
            position: 'fixed',
            height: 'cacl(100vh - 2.5rem)',
            top: 0,
            ...cssVars,
            marginTop: '1.25rem',
            marginLeft: '1.25rem',

            borderRightWidth: 0,
            color: 'var(--nav-color)',
            width: SIDE_NAV_WIDTH, // background:'linear-gradient(315deg, #f39f86 0%, #f9d976 74%)'
        }}
        // containerStyle={{transform: 'none'}}
        // anchor="left"
        // open
        // PaperProps={{
        //     sx: {
        //         ...cssVars,
        //         borderRadius: '30px',
        //         margin: '20px',
        //         marginTop: '0',
        //         // height: 'calc(100vh - 40px)',
        //         backgroundColor: 'var(--nav-bg)',
        //         borderRightColor: 'var(--nav-border-color)',
        //         borderRightStyle: 'solid',
        //         borderRightWidth: 1,
        //         color: 'var(--nav-color)',
        //         width: SIDE_NAV_WIDTH,
        //         // background:'linear-gradient(315deg, #f39f86 0%, #f9d976 74%)'
        //     }
        // }}
        // variant="permanent"
    >
        <Box

            sx={{

                // position: 'sticky',
                top: '20px',
                backgroundColor: 'var(--nav-bg)',
                // backgroundColor: alpha(theme.palette.primary.main, 0.8),
                backdropFilter: 'blur(40px)',
                backgroundImage: 'url(/assets/sidebar-bg-3.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center 110%',
                borderRadius: '30px',
                height: 'calc(100vh - 40px)',
                overflowY: 'hidden',
                display: 'flex',
                flexFlow: 'column nowrap',
            }}>
            <Box

                sx={{
                    flex: '100%',
                    overflowY: 'hidden',
                    '& .simplebar-content': {
                        // height: '100%'
                    },
                    '& .simplebar-scrollbar:before': {
                        background: 'var(--nav-scrollbar-color)'
                    },
                    '.simplebar-placeholder': {display: 'none'},
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {display: 'none'},
                }}
            >
                <Stack sx={{paddingBottom: '10px', display: 'flex', flexFlow: 'column nowrap', flex: '100%'}}>
                    <Stack
                        ref={logoRef}
                        alignItems="center"
                        justifyContent={'center'}
                        direction="row"
                        spacing={2}
                        sx={{
                            p: 3,
                            flexGrow: 1,
                        }}
                    >
                        <Box
                            component={Link}
                            href={route('dashboard')}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 80,
                                p: '4px',
                            }}
                        >
                            <Logo sx={{boxShadow: 3}}/>
                        </Box>
                    </Stack>
                    <Box sx={{
                        height: (containerRef?.current?.offsetHeight - logoRef?.current?.offsetHeight - 10) + 'px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                    }}>
                        <Stack
                            component="nav"
                            spacing={2}
                            sx={{
                                px: 2,
                            }}

                        >

                            {sections.map((section, index) => {
                                return (<div key={index}>
                                    {permissionCheck(section.permissions, userPermissions) ? <SideNavSection
                                        items={section.items}
                                        // key={index}
                                        // pathname={pathname}
                                        pathname={''}
                                        subheader={section.subheader}
                                    /> : null}
                                </div>);
                            })}
                            <CustomerContent>

                                <SideNavSection
                                    pathname={''}
                                    subheader={'Information'} items={[
                                    {
                                        title: 'FAQ',
                                        path: '/faq',
                                        icon: (
                                            <SvgIcon fontSize="small">
                                                <Info/>
                                            </SvgIcon>
                                        )
                                    },
                                    {
                                        title: 'About as',
                                        path: '/about',
                                        icon: (
                                            <SvgIcon fontSize="small">
                                                <AppBlockingOutlined/>
                                            </SvgIcon>
                                        )
                                    },
                                    {
                                        title: 'How it works?',
                                        path: '/how-it-works',
                                        icon: (
                                            <SvgIcon fontSize="small">
                                                <WorkHistory/>
                                            </SvgIcon>
                                        )
                                    },
                                ]}>
                                </SideNavSection>
                            </CustomerContent>

                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    </Box>);
};

SideNav.propTypes = {
    color: PropTypes.oneOf(['blend-in', 'discreet', 'evident', 'orange']), sections: PropTypes.array
};
