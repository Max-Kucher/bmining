import {useMemo} from 'react';
import PropTypes from 'prop-types';
import File04Icon from '@untitled-ui/icons-react/build/esm/File04';
import {Box, Button, Drawer, Stack, SvgIcon, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {Logo} from '@/components/logo';
import {RouterLink} from '@/components/router-link';
import {Scrollbar} from '@/components/scrollbar';
import {usePathname} from '@/hooks/use-pathname';
import {paths} from '@/paths';
import {MobileNavSection} from './mobile-nav-section';
import {useSettings} from "@/hooks/use-settings";
import {permissionCheck} from "@/utils/permissions";
import {SideNavSection} from "@/layouts/dashboard/vertical-layout/side-nav-section";
import {usePage} from "@inertiajs/react";
import {AppBlockingOutlined, Info, WorkHistory} from "@mui/icons-material";
import {CustomerContent} from "@/Components/Wrappers/Permissions/CustomerContent";
import {useSelector} from "react-redux";
import {selectPermissions} from "@/slices/userSlice";

const MOBILE_NAV_WIDTH = 280;

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

export const MobileNav = (props) => {
    const {color = 'evident', open, onClose, sections = []} = props;
    // const pathname = usePathname();
    const pathname = () => {
    };
    const userPermissions = useSelector(selectPermissions);
    const cssVars = useCssVars(color);
    const theme = useTheme();
    return (<Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    ...cssVars, backgroundColor: 'var(--nav-bg)', color: 'var(--nav-color)', width: MOBILE_NAV_WIDTH,
                }
            }}
            variant="temporary"
        >
            <Scrollbar
                sx={{
                    height: '100%', '& .simplebar-content': {
                        height: '100%'
                    }, '& .simplebar-scrollbar:before': {
                        background: 'var(--nav-scrollbar-color)'
                    }
                }}
            >
                <Stack sx={{height: '100%'}}>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{p: 3}}
                    >
                        <Logo/>
                    </Stack>
                    <Stack
                        component="nav"
                        spacing={2}
                        sx={{
                            flexGrow: 1, px: 2
                        }}
                    >
                        {sections.map((section, index) => {
                            return (<div key={index}>
                                {permissionCheck(section.permissions, userPermissions) ? <MobileNavSection
                                    items={section.items}
                                    key={index}
                                    pathname={pathname}
                                    subheader={section.subheader}
                                /> : null}
                            </div>);
                        })}
                        <CustomerContent>

                            <SideNavSection
                                pathname={''}
                                subheader={'Information'} items={[{
                                title: 'FAQ', path: '/faq', icon: (<SvgIcon fontSize="small">
                                        <Info/>
                                    </SvgIcon>)
                            }, {
                                title: 'About as', path: '/about', icon: (<SvgIcon fontSize="small">
                                        <AppBlockingOutlined/>
                                    </SvgIcon>)
                            }, {
                                title: 'How it works?', path: '/how-it-works', icon: (<SvgIcon fontSize="small">
                                        <WorkHistory/>
                                    </SvgIcon>)
                            },]}>
                            </SideNavSection>
                        </CustomerContent>
                    </Stack>
                </Stack>
            </Scrollbar>
        </Drawer>);
};

MobileNav.propTypes = {
    color: PropTypes.oneOf(['blend-in', 'discreet', 'evident', 'orange']),
    onClose: PropTypes.func,
    open: PropTypes.bool,
    sections: PropTypes.array
};
