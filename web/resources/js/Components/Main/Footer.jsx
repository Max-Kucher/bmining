import WidthWrapper from "@/Components/Main/WidthWrapper";
import {Box, Button, Divider, Grid, Link, Stack, Typography, useMediaQuery} from "@mui/material";
import {Logo} from "@/components/logo";
import {LogoTrans} from "@/Components/Main/LogoTrans";
import {CommonLink} from "@/Components/Main/CommonLink";
import {LanguageSwitch} from "@/layouts/dashboard/language-switch";
import {LanguageSwitcher} from "@/Components/Main/Header";
import {useTheme} from "@mui/material/styles";
import {padding} from "@mui/system";
import {mainRoutes} from "@/routes/main";


export function FooterMob() {
    return (
        <Stack direction={'column'} justifyContent={"space-between"}
               sx={{
                   padding: '1rem',
               }}
        >
            <Stack direction={'row'} sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <LogoTrans/>
                <Typography sx={{
                    fontWeight: 900,
                    fontSize: '20px',
                }}>
                    BMINING
                </Typography>
            </Stack>
            <div style={{
                color: '#4B4B4B',
                fontSize: '1rem',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-end',
            }}>
                © 2023 All Rights Reserved
            </div>
        </Stack>
    );
}

export function FooterFull() {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <Box sx={{
            backgroundColor: '#ffffff',
            paddingTop: '1.875rem',
            paddingBottom: '2.375rem',
            borderTop: 'solid 1px rgba(0,0,0,0.1)',
            width: '100%',
        }}>
            <WidthWrapper>
                <Grid container spacing={'40px'} direction="row"
                      justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={'40px'}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={'1.875rem'}>
                                    <LogoTrans/>
                                    <Typography sx={{color: '#4B4B4B'}}>
                                        © 2023<br/>
                                        All Rights Reserved
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack sx={{
                                    paddingTop: '1.25rem'
                                }} spacing={'1.25rem'}>
                                    <CommonLink href={mainRoutes.main}>Home</CommonLink>
                                    <CommonLink href={mainRoutes.howItWorks}>How it works</CommonLink>
                                    <CommonLink href={mainRoutes.about}>About us</CommonLink>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} lg={8}>
                        <Grid spacing={'0.5rem'} container direction="row"
                              justifyContent="space-between">
                            <Grid item xs={12} lg={4} sx={{height: '100%'}}>
                                <Stack sx={{
                                    alignItems: 'flex-start',
                                    paddingTop: '1.25rem'
                                }} spacing={'1.25rem'}>
                                    <CommonLink href={mainRoutes.terms}>Terms</CommonLink>
                                    <CommonLink href={mainRoutes.privacy}>Privacy policy</CommonLink>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} lg={5} sx={{height: '100%'}}>
                                <Stack sx={{
                                    alignItems: 'flex-end',
                                    paddingTop: '1.25rem'
                                }} spacing={'1.25rem'}>
                                    {/*<span>71-75 Shelton Street, London,<br/> Greater London, UK</span>*/}
                                    Certificate Number: 2909018
                                    Company Name: Miningway Limited
                                    Company Type: Private company | limited by shares<br/>
                                    Date of Incorporation: O6-JAN-2020
                                </Stack>
                            </Grid>
                            <Grid item xs={12} lg={3} sx={{height: '100%'}}>
                                <Stack alignItems={'flex-end'} spacing={'1.4375rem'}>
                                    <LanguageSwitcher/>
                                    <Button component={'a'} href={'#miner-calc'} variant={'outlined'}
                                            sx={{color: '#2c2c2c'}}>
                                        Get started
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </WidthWrapper>
        </Box>
    );
}


export function Footer() {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (<>
            {isMdScreen ? <FooterMob/> : <FooterFull/>}
        </>
    );
}


