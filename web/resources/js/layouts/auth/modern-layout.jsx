import PropTypes from 'prop-types';
import {Box, Stack} from '@mui/material';
import {Logo} from '@/Components/logo';
import {alpha, useTheme} from "@mui/material/styles";
import {RouterLink} from "@/Components/router-link";
import {mainRoutes} from "@/routes/main";

export const Layout = (props) => {
    const {children} = props;
    const theme = useTheme();
    return (
        <Box
            sx={{
                // backgroundColor: 'background.default',
                backgroundColor: theme.palette.mode == 'dark' ? 'neurtal.800' : 'neutral.200',
                backgroundImage: theme.palette.mode == 'dark' ? 'url("/assets/gradient-bg.svg"), url("/assets/bg-dark-2.svg")' : 'url("/assets/bg.svg")',
                backgroundPosition: 'bottom right, bottom right',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: {
                    xs: 'column-reverse',
                    md: 'row'
                }
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    color: 'common.white',
                    display: 'flex',
                    flex: {
                        xs: '0 0 auto',
                        md: '1 1 auto'
                    },
                    justifyContent: 'center',
                    p: {
                        xs: 4,
                        md: 8
                    }
                }}
            >

            </Box>
            <Box
                sx={{
                    // backgroundColor: 'background.paper',
                    backgroundColor: theme.palette.mode == 'dark' ? alpha(theme.palette.background.default, 0.3) : alpha('#ffffff', 0.7),
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flex: {
                        xs: '1 1 auto',
                        md: '0 0 auto'
                    },
                    flexDirection: 'column',
                    justifyContent: {
                        md: 'center'
                    },
                    maxWidth: '100%',
                    p: {
                        xs: 4,
                        md: 8
                    },
                    width: {
                        md: 600
                    }
                }}
            >
                <div>
                    <Box sx={{mb: 4}}>
                        <Stack
                            alignItems="center"
                            component={RouterLink}
                            direction="row"
                            display="inline-flex"
                            href={mainRoutes.main}
                            spacing={1}
                            sx={{textDecoration: 'none'}}
                        >
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    height: 60,
                                }}
                            >
                                <Logo/>
                            </Box>
                        </Stack>
                    </Box>
                    {children}
                </div>
            </Box>
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};
