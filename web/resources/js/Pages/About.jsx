import {Header} from "@/Components/Main/Header";
import WidthWrapper from "@/Components/Main/WidthWrapper";
import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import WidthWrapperXl from "@/Components/Main/WidthWrapperXl";
import {Footer} from "@/Components/Main/Footer";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import * as stylesMain from "../../scss/main.scss";
import {FmdGoodOutlined, MailOutline, WbIncandescentOutlined} from "@mui/icons-material";
import {useSettings} from "@/hooks/use-settings";
import {Seo} from "@/Components/Wrappers/Seo";
import LightWrapper from "@/Components/Wrappers/LIghtWrapper";
import {convertTZ} from "@/api/helpers/general";
import {useEffect, useState} from "react";

const iconedPaperStyle = {
    background: '', backdropFilter: '', boxShadow: '', // maxWidth: '16.875rem',
    padding: '', borderRadius: '',
};
export default function About(props) {
    return (
        <Page/>
    );
}

export function Page() {
    const theme = useTheme();
    const settingsDefault = useSettings();
    const NorwayDate = convertTZ(new Date(), "Europe/Oslo");
    const IcelandDate = convertTZ(new Date(), "Atlantic/Reykjavik");
    const CanadaDate = convertTZ(new Date(), "America/Halifax");
    const SwedenDate = convertTZ(new Date(), "Europe/Stockholm");
    const [time, setTime] = useState({
        Norway: NorwayDate,
        Sweden: SwedenDate,
        Canada: CanadaDate,
        Iceland: IcelandDate,
    });

    useEffect(() => {

        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
            let NorwayDate1 = convertTZ(new Date(), "Europe/Oslo");
            let IcelandDate1 = convertTZ(new Date(), "Atlantic/Reykjavik");
            let CanadaDate1 = convertTZ(new Date(), "America/Halifax");
            let SwedenDate1 = convertTZ(new Date(), "Europe/Stockholm");
            setTime(
                {
                    Norway: NorwayDate1,
                    Sweden: SwedenDate1,
                    Canada: CanadaDate1,
                    Iceland: IcelandDate1,
                }
            );
        }, 60 * 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    }, []);

    const timeFormatter = (timeVar) => {
        let hours = ("0" + timeVar.getUTCHours()).slice(-2);
        let minutes = ("0" + NorwayDate.getUTCMinutes()).slice(-2);
        return hours + ":" + minutes;
    };

    return (<>
        <WidthWrapperXl sx={{}}>
            <Header/>
            <Seo title={'About'}/>

            <Box sx={{
                paddingTop: '6.4375rem', background: 'url(/assets/mountains-light-bg.svg)', paddingBottom: '5.125rem',
            }}>
                <WidthWrapper>
                    <Stack direction={'row'} spacing={'89px'} sx={{marginBottom: '43px'}}>
                        <Typography sx={{
                            fontWeight: 800, fontSize: '5rem', lineHeight: '6.125rem', marginBottom: '3.25rem',
                        }}>
                            About us
                        </Typography>
                    </Stack>
                    <Grid container spacing={'6.25rem'} sx={{}}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{display: 'flex'}} justifyContent={'center'} justifyItems={'center'}>

                                <div style={{
                                    fontSize: '1.0625rem', lineHeight: '170%', color: '#686868', paddingTop: '2.875rem'
                                }}>

                                    <p>
                                        BMining is a cloud computing service committed to effecting global impact as
                                        far
                                        as
                                        the application of cryptocurrencies as a modern financial and technological
                                        solution
                                        goes. We aim to leverage the increasing accessibility of technological
                                        devices
                                        by
                                        people
                                        worldwide<span
                                        style={{color: theme.palette.primary.dark, fontWeight: 'bold'}}> to ensure that the full potential of cryptocurrencies as a tool is harnessed.</span>
                                    </p>
                                    <p>
                                        Our team is made up of experts from various fields including crypto,
                                        engineering,
                                        and
                                        other scientific domains. <span
                                        style={{color: theme.palette.primary.dark, fontWeight: 'bold'}}>Working together, we develop products and services targeted at
                                both crypto native users and prospective participants.</span>
                                    </p>
                                </div>
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{display: 'flex'}} justifyContent={'center'} justifyItems={'center'}>

                                <Box sx={{
                                    padding: '3.125rem 2.5rem',
                                    backgroundColor: theme.palette.primary.dark,
                                    borderRadius: 3,
                                    width: '29.375rem',
                                    height: '29.375rem',
                                }}>
                                    <div style={{
                                        marginTop: 0,
                                        fontWeight: 700,
                                        fontSize: '1.5625rem',
                                        lineHeight: '150%',
                                        color: '#503301',
                                        marginBottom: '1.5625rem'
                                    }}>A collective of innovative<br/>
                                        individuals committed to<br/>
                                        creating effective product <br/>
                                        solutions for people.
                                    </div>
                                    <Stack spacing={'1.25rem'}>
                                        <Button
                                            variant={'outelined'}
                                            fullWidth
                                            sx={{
                                                background: theme.palette.primary.dark,
                                                border: 'solid 2px #CC8303',
                                                borderRadius: '0',
                                                color: '#966002',
                                            }}
                                            startIcon={<InfoOutlinedIcon/>}
                                        >
                                            Incorporation Certificate
                                        </Button>
                                        <Button
                                            variant={'outelined'}
                                            fullWidth
                                            sx={{
                                                background: theme.palette.primary.dark,
                                                border: 'solid 2px #CC8303',
                                                borderRadius: '0',
                                                color: '#966002',
                                            }}
                                            startIcon={<InfoOutlinedIcon/>}
                                        >
                                            Register Office Certificate
                                        </Button>
                                        <Button
                                            variant={'outelined'}
                                            fullWidth
                                            sx={{
                                                background: theme.palette.primary.dark,
                                                border: 'solid 2px #CC8303',
                                                borderRadius: '0',
                                                color: '#966002',
                                            }}
                                            startIcon={<InfoOutlinedIcon/>}
                                        >
                                            M&A-Newstack Industries
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </Box>
        </WidthWrapperXl>

        <WidthWrapperXl>
            <WidthWrapper>
                <Grid container
                    // alignItems={'center'}
                      spacing={'70px'}
                      sx={{
                          paddingTop: '50px',
                      }}
                >
                    <Grid item xs={12} md={5}>
                        <Stack spacing={'30px'} sx={{
                            fontWeight: 500,
                            fontSize: '1.0625rem',
                            lineHeight: '170%',
                        }}>
                            <div>
                                Cryptocurrency has the potential to completely revolutionize modern finance as we know
                                it and effectively replace fiat currency as a store of value and medium of poyment. As
                                such, <b>we remain at the forefront of ensuring that our users can access an
                                efficient,</b>
                                easy-to-use, and affordable cloud mining service.
                            </div>
                            <div>
                                Do not miss the opportunity of a lifetime! Grab your chance today and begin securing
                                your future by investing in the promising field of cryptocurrency. Once your initial
                                stake starts accruing exponential returns, <b>you will be glad you did!</b>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Stack spacing={'30px'} sx={{
                            fontWeight: 500,
                            fontSize: '17px',
                            lineHeight: '170%',
                        }}>
                            <div>
                                Like all other impactful inventors and innovators in history, Bmining aims to make
                                life easier by leveraging the unique capabilities of technology. What the team of
                                experts at Bmining <b>aims to do is expand the accessibility of Cryptocurrencies to
                                everyone</b> and use cryptocurrencies as a solution to many of the challenges that fiat
                                and
                                other types of conventional currencies have been unable to address.
                            </div>
                            <div>
                                One of the many challenges associated with emerging technological solutions that have
                                not yet been exploited on a large scale is high costs. However, in our pursuit of the
                                most innovative and effective but affordable solution, we at Bmining <b>offer our
                                clients the most pocket-friendly prices</b> for Bitcoin mining contracts to ensure
                                inclusivity and cost-effectiveness.
                            </div>
                        </Stack>
                    </Grid>
                </Grid>
            </WidthWrapper>


            <Container sx={{padding: '2.5rem 2.5rem 2rem 2.5rem', maxWidth: '60.625rem', maxHeight: '50rem'}}
                       mx={'auto'}>
                <Box
                    sx={{
                        position: 'relative', height: '568px',
                    }}
                >
                    <div style={{
                        position: 'absolute', left: '52%', top: '50%', transform: 'translate(-50%, -50%)'
                    }}>
                        <img style={{
                            display: 'block', paddingTop: '5.4375rem', width: '45.8125rem', height: '30.0625rem'
                        }} src="/assets/images/asic.png" alt="Safe"/>
                    </div>
                    <Typography sx={{
                        position: 'relative',
                        fontWeight: 800,
                        fontSize: '11.1224375rem',
                        lineHeight: '13.5625rem',
                        zIndex: 3,
                    }}>Data</Typography>
                    <Typography sx={{
                        fontWeight: 800,
                        fontSize: '11.875rem',
                        lineHeight: '14.5rem',
                        position: 'absolute',
                        top: '3.65rem',
                        left: '30.8rem',
                        zIndex: 3,
                    }}>
                        center
                    </Typography>
                </Box>
                <Box className='top-table' maxWidth={'60.625rem'} mx={'auto'}
                     sx={{
                         position: 'relative', top: '-13.9rem', zIndex: '10',
                     }}
                >
                    <Grid container spacing={'30px'}>
                        <Grid item xs={12} md={3}>
                            <Stack spacing={'1.25rem'} sx={{
                                fontWeight: "700", fontSize: "14px", lineHeight: "150%",
                            }}>
                                <Box sx={{
                                    padding: '40px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: 'solid 2px #D3D3D3',
                                    color: '#989898',

                                }}>
                                    Norway ({timeFormatter(time.Norway)} GMT)
                                </Box>
                                <Box sx={{
                                    padding: '40px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: 'solid 2px #D3D3D3',
                                    color: '#989898',

                                }}>
                                    Iceland ({timeFormatter(time.Iceland)} GMT)
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack sx={{
                                padding: '1.375rem 1.875rem 1.625rem 1.875rem',
                                background: theme.palette.primary.dark,
                                fontWeight: '700',
                                fontSize: '17px',
                                lineHeight: '150%',
                            }}
                                   spacing={'1.7rem'}
                            >
                                <div>
                                    Regardless of which Bmining miner contract you choose, you con rely on our
                                    state-of-the-art and
                                </div>
                                <div>
                                    Qur four dota center parks in Canada, Iceland, Norway and Sweden provide you
                                    with safe and stable services.
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack spacing={'1.25rem'} sx={{
                                fontWeight: "700", fontSize: "14px", lineHeight: "150%",
                            }}>
                                <Box sx={{
                                    padding: '40px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: 'solid 2px #D3D3D3',
                                    color: '#989898',

                                }}>
                                    Sweden ({timeFormatter(time.Sweden)} GMT)
                                </Box>
                                <Box sx={{
                                    padding: '40px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: 'solid 2px #D3D3D3',
                                    color: '#989898',

                                }}>
                                    Canada ({timeFormatter(time.Canada)} GMT)
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}>
                        <Stack direction={'row'} spacing={'0.5625rem'} sx={{
                            maxWidth: '22.1875rem', marginTop: '1.25rem'
                        }}>
                            <WbIncandescentOutlined sx={{transform: 'rotate(180deg)'}}/>
                            <div style={{
                                fontWeight: 600, fontSize: '0.875rem', lineHeight: '150%',
                            }}>
                                Our mining farms are located only in the sunniest regions and mostly use green energy
                                from wind and solar power plants.
                            </div>
                        </Stack>
                    </Box>
                </Box>
            </Container>


            <WidthWrapper sx={{
                paddingTop: '5.0625rem',
                paddingBottom: '4.375rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexFlow: 'column nowrap'
            }}>
                <div style={{
                    fontWeight: 800,
                    fontSize: '70px',
                    lineHeight: '85px',
                    color: theme.palette.primary.dark,
                    marginBottom: '1.25rem'
                }}>
                    BMINING LIMITED
                </div>
                <Stack direction={'row'} spacing={'54px'} justifyContent={'center'}>

                    {/*<Grid container*/}
                    {/*      alignItems={'center'}*/}
                    {/*      spacing={'54px'}*/}
                    {/*>*/}
                    {/*    <Grid item xs={12} md={6}>*/}
                    <Stack spacing={"1.25rem"} direction={'row'}>
                        <Box sx={{
                            width: '4.375rem',
                            height: '4.375rem',
                            border: 'solid 1px #DBDBDB',
                            borderRadius: '200px',
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        >
                            <FmdGoodOutlined sx={{color: theme.palette.primary.dark}}/>
                        </Box>
                        <div style={{padding: '0.875rem'}}>
                            Certificate Number: 2909018<br/>
                            Company Name: Miningway Limited<br/>
                            Company Type: Private company | limited by shares<br/>
                            Date of Incorporation: O6-JAN-2020<br/>
                            Location: Hong-kong
                        </div>
                    </Stack>
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} md={6}>*/}
                    <Stack spacing={"1.25rem"} direction={'row'}>
                        <Box sx={{
                            width: '4.375rem',
                            height: '4.375rem',
                            border: 'solid 1px #DBDBDB',
                            borderRadius: '200px',
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        >
                            <MailOutline sx={{color: theme.palette.primary.dark}}/>
                        </Box>
                        <div style={{padding: '0.875rem'}}>
                            support@bmining.com
                        </div>
                    </Stack>
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Stack>
            </WidthWrapper>


            <Footer/>
        </WidthWrapperXl>
    </>);
}
