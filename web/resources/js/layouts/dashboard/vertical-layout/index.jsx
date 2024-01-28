import PropTypes from 'prop-types';
import {Box, useMediaQuery} from '@mui/material';
import {styled} from '@mui/material/styles';
import {MobileNav} from '../mobile-nav';
import {SideNav} from './side-nav';
import {TopNav} from './top-nav';
import {useMobileNav} from './use-mobile-nav';
import {useSelector} from "react-redux";
import {selectAuth, selectUser} from "@/slices/userSlice";

const SIDE_NAV_WIDTH = 320;

const VerticalLayoutRoot = styled('div')(({theme}) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const VerticalLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
});

export const VerticalLayout = (props) => {
    const {children, sections, navColor} = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const mobileNav = useMobileNav();

    const user = useSelector(selectUser);
    const isAuth = useSelector(selectAuth);
    return (
        <>
            {/*<Box sx={{position: 'absolute', top: 0, height: '100%'}}>*/}
            {/*    <Box sx={{position: 'sticky', top: 0,}}>asdsad</Box>*/}
            {/*</Box>*/}
            {isAuth && (<TopNav onMobileNavOpen={mobileNav.handleOpen}/>)}
            {lgUp && isAuth && (
                <SideNav
                    color={navColor}
                    sections={sections}
                />
            )}
            {!lgUp && isAuth && (
                <MobileNav
                    color={navColor}
                    onClose={mobileNav.handleClose}
                    open={mobileNav.open}
                    sections={sections}
                />
            )}
            <VerticalLayoutRoot>
                <VerticalLayoutContainer>
                    {children}
                </VerticalLayoutContainer>
            </VerticalLayoutRoot>
        </>
    );
};

VerticalLayout.propTypes = {
    children: PropTypes.node,
    navColor: PropTypes.oneOf(['blend-in', 'discreet', 'evident', 'orange']),
    sections: PropTypes.array
};
