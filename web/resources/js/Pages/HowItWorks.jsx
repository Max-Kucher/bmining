import {Header} from "@/Components/Main/Header";
import WidthWrapper from "@/Components/Main/WidthWrapper";
import {Box, Container, Grid, Stack, Typography, useMediaQuery} from "@mui/material";
import { useTheme} from "@mui/material/styles";
import IconedPaper from "@/Components/Main/IconedPaper";
import {BigHeader} from "@/Components/Main/BigHeader";
import WidthWrapperXl from "@/Components/Main/WidthWrapperXl";
import {Footer} from "@/Components/Main/Footer";
import {NumberedItem} from "@/Components/Main/NumberedItem";
import * as stylesMain from "../../scss/main.scss";
import {neutral} from "@/theme/colors";
import {useSettings} from "@/hooks/use-settings";
import {Seo} from "@/Components/Wrappers/Seo";
import {AttachMoney, CurrencyExchange, Domain, Storage, TipsAndUpdates, TrendingUp} from "@mui/icons-material";

const iconedPaperStyle = {
    background: '', backdropFilter: '', boxShadow: '', // maxWidth: '16.875rem',
    padding: '', borderRadius: '',
};
export default function HowItWorks(props) {
    return (
        <Page/>
    );
}


export function Page() {

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const settingsDefault = useSettings();

    // settingsDefault.handleUpdate({
    //     paletteMode: 'light',
    //     colorPreset: 'orange',
    //     isFictive: true,
    // });

    return <>
        <WidthWrapperXl sx={{
            backgroundColor: '#FAFAFA'
        }}>
            <Header/>
            <Seo title={'How it works'}/>
            <Box sx={{
                background: 'url(/assets/pale-bg.svg)',
                backgroundColor: '#ffffff',
                paddingTop: '6.4375rem',
                paddingBottom: '7.125rem',
            }}>
                <WidthWrapper>
                    <Stack direction={'row'} spacing={'89px'} sx={{marginBottom: '43px'}}>
                        <Typography sx={{
                            fontWeight: 800, fontSize: '80px', lineHeight: '98px',
                        }}>
                            How it works?
                        </Typography>
                        <Box sx={{
                            backgroundColor: '#F0F0F0', borderRadius: '5px', padding: '13px 20px',
                        }}>
                            <span style={{
                                fontWeight: 500, fontSize: '13px', lineHeight: '170%',
                            }}>
                                Cloud mining is a fairly simple process. If you use the right<br/> equipment, you can work very smoothly and without problems.
                            </span>
                        </Box>
                    </Stack>
                    <Grid container spacing={'3rem'} sx={{
                        paddingBottom: '60px'
                    }}>
                        <Grid item xs={12} md={6}>
                            Thanks to Cloud mining, you no longer need to mine Bitcoin using your own equipment. Now you
                            can use high-power and high-quality equipment provided by Bmining. The client only needs to
                            sign a contract that is right for him.
                        </Grid>
                        <Grid item xs={12} md={6}>
                            It must be remembered that the reward from Bitcoin cloud mining directly depends on the
                            hashrate that the client acquires in accordance with the selected contract. If a client
                            wants to get the highest profit from Bitcoin mining, he needs to use the highest hashrate.
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </Box>
        </WidthWrapperXl>
        <WidthWrapperXl sx={{backgroundColor: '#FAFAFA'}}>
            <WidthWrapper>
                <Box sx={{
                    paddingTop: '53px', backgroundColor: '#FAFAFA', marginBottom: '120px',
                }}>
                    <BigHeader sx={{marginBottom: '1.875rem'}}>
                        How to start?
                    </BigHeader>
                    <Grid container>
                        <Grid xs={12} md={3} item>
                            <NumberedItem
                                number={'01'}
                                title={'Set up an account'}
                                text={"Set up an account. So you can have full access to our platform's services"}
                            ></NumberedItem>
                        </Grid>
                        <Grid xs={12} md={3} item>
                            <NumberedItem
                                dashed={true}
                                number={'02'}
                                title={'Pick a contract'}
                                text={'We offer you several contracts of your choice'}
                            ></NumberedItem>
                        </Grid>
                        <Grid xs={12} md={3} item>

                            <NumberedItem
                                dashed={true}
                                number={'03'}
                                title={'Invest'}
                                text={'Invest in a contract that is right for you'}
                            ></NumberedItem>
                        </Grid>

                        <Grid xs={12} md={3} item>

                            <NumberedItem
                                dashed={true}
                                number={'04'}
                                title={'Get paid'}
                                text={'Earn income immediately after the start of Bitcoin mining'}
                            ></NumberedItem>
                        </Grid>
                    </Grid>
                </Box>
            </WidthWrapper>
        </WidthWrapperXl>
        <WidthWrapperXl sx={{backgroundColor: '#ffffff'}}>
            <WidthWrapper sx={{
                paddingTop: '0', marginTop: '-3.125rem', paddingBottom: '4.375rem', backgroundColor: '#ffffff'
            }}>
                <Container maxWidth={'970px'} mx={'auto'}
                           sx={{
                               paddingLeft: '0!important',
                               paddingRight: '0!important',
                               backgroundColor: '#ffffff',
                               boxShadow: '0px 0px 100px rgba(0, 0, 0, 0.1)',
                           }}>
                    <Stack direction={'row'} padding={0}>
                        <Box sx={{
                            background: ' linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0.69) 55.73%, rgba(255, 255, 255, 0) 100%),url(/assets/images/mining.png)',
                            minHeight: '23.125rem',
                            minWidth: '23.125rem',
                            display: isMdScreen ? 'none' : 'block'
                        }}></Box>

                        <Stack spacing={'1.875rem'} sx={{padding: '3.3125rem 2.5rem'}}>
                            <Typography>
                                Now right in front of you there is an opportunity to earn<br/>
                                money with the help of cloud
                                mining. At the same time,<br/>
                                you do not need to buy expensive mining equipment, pay<br/>
                                a lot
                                of money for electricity. All you need is just <b>to choose<br/>
                                the contract that suits you for investing.</b>
                            </Typography>
                            <Typography>
                                We use ASIC for Bitcoin mining. ASIC mining is the<br/>
                                process of Bitcoin mining using special equipment. ASIC<br/>
                                is created <b>specifically for mining.</b>
                            </Typography>
                        </Stack>
                    </Stack>

                </Container>
            </WidthWrapper>


            <WidthWrapper sx={{paddingBottom: '4.375rem'}}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <BigHeader>
                            Having created your<br/>
                            own ASIC farm you<br/>
                            may encounter<br/>
                            <span style={{color: theme.palette.primary.dark}}>problems</span>
                        </BigHeader>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={'12px'}>
                            <Typography sx={{
                                fontWeight: 500, fontSize: '15px', lineHeight: '170%',
                            }}>
                                Owning your own mining farm means an undoubted advantage. But until<br/>
                                you receive a huge bill for electricity, rental of premises or your mining<br/>
                                equipment has broken down and needs to be repaired.
                            </Typography>

                            <Typography sx={{
                                fontWeight: 500, fontSize: '15px', lineHeight: '170%',
                            }}>
                                    <span style={{color: theme.palette.primary.dark, fontWeight: 'bold'}}>
                                        That is why Bmining offers you mining equipment that works for you<br/>
                                        24/7. No more headaches and additional costs!
                                    </span>
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </WidthWrapper>

            <Box sx={{
                background: 'url("/assets/orange-bottom-placeholder.svg") no-repeat',
                backgroundPosition: 'bottom center',
                backgroundColor: theme.palette.primary.dark,
                paddingTop: '4.375rem',
                paddingBottom: '7.4375rem',
            }}>
                <WidthWrapper sx={{}}>
                    <Grid container spacing={3} alignContent={'center'} justifyContent={'center'}>
                        <Grid item xs={8} md={4} spacing={'30px'}>
                            <IconedPaper
                                icon={<TrendingUp/>}
                                sx={{iconedPaperStyle}}
                                title={'High electricity bills'}
                                subtitle={"Yes, owning your own mining farm is quite expensive. Therefore, you should be prepared for high spending."}/>
                        </Grid>
                        <Grid item xs={8} md={4} spacing={'30px'}>
                            <IconedPaper
                                icon={<Storage/>}
                                sx={{iconedPaperStyle}}
                                title={'Expensive mining equipment'}
                                subtitle={"When the price of Bitcoin rises, the price of mining equipment also rises. If you have your own equipment, you will have to look for extra money."}/>
                        </Grid>
                        <Grid item xs={8} md={4} spacing={'30px'}>
                            <IconedPaper
                                icon={<TipsAndUpdates/>}
                                sx={{iconedPaperStyle}}
                                title={'Too little experience'}
                                subtitle={"If you have little knowledge and experience in the field of mining, you risk your time and money."}/>
                        </Grid>
                        <Grid item xs={8} md={4} spacing={'30px'}>
                            <IconedPaper
                                icon={<CurrencyExchange/>}
                                sx={{iconedPaperStyle}}
                                title={'Exchange rate risks'}
                                subtitle={"The cryptocurrency market has high volatility. Sharp jumps in Bitcoin exchange rates can reduce your income. Keep that in mind."}/>
                        </Grid>
                        <Grid item xs={8} md={4} spacing={'30px'}>
                            <IconedPaper
                                icon={<AttachMoney/>}
                                sx={{iconedPaperStyle}}
                                title={'Costly maintenance'}
                                subtitle={"When you have your own mining farm, you need it to work constantly. Downtime leads to additional unnecessary expenses."}/>
                        </Grid>
                        <Grid item xs={8} md={4} spacing={'30px'}>
                            <IconedPaper
                                icon={<Domain/>}
                                sx={{iconedPaperStyle}}
                                title={'Premises for mining'}
                                subtitle={"To place your Bitcoin mining equipment, you will need a special premise. Will you have such an opportunity?"}/>
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </Box>

            <WidthWrapper>
                <Grid container sx={{paddingTop: '4.75rem', paddingBottom: '50px'}}>
                    {isMdScreen ? <Grid item xs={12} md={12}>
                        <h1 style={{
                            textAlign: 'center',
                            fontWeight: 800,
                            fontSize: '2.1875rem',
                            lineHeight: '2.6875rem',
                            marginBottom: '1.25rem',
                        }}>Cloud mining</h1>
                    </Grid> : <>
                        <Grid item xs={12} md={6}>

                            <Typography sx={{
                                fontWeight: 800, fontSize: '130px', lineHeight: '158px',
                            }}>Cloud</Typography>
                            <Typography sx={{
                                fontWeight: 800,
                                fontSize: '130px',
                                lineHeight: '158px',
                                position: 'relative',
                                top: '-65px',
                                left: '312px',
                                zIndex: 3,
                            }}>
                                mining
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className={'block-with-miner'}
                                 style={{
                                     padding: '30px', position: 'relative', backgroundColor: '#F0F0F0'
                                 }}
                            >
                            </div>
                        </Grid>
                    </>}

                </Grid>
            </WidthWrapper>
        </WidthWrapperXl>
        <WidthWrapperXl sx={{
            background: 'url(/assets/grey-bottom-placeholder.svg) no-repeat',
            backgroundPosition: 'bottom center',
            backgroundColor: 'white',
        }}>
            <WidthWrapper>
                <Grid container sx={{
                    paddingTop: '4.75rem', paddingBottom: '7.625rem',
                }} spacing={'30px'}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            padding: '31px 40px', border: 'solid 2px #F0F0F0', textAlign: 'center',
                        }}>
                            To get started, create your account and purchase your first contract.
                            You can easily do this by using all the features to create and configure your account and
                            purchase your first contract.
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            padding: '31px 40px', border: 'solid 2px #F0F0F0', textAlign: 'center',
                        }}>
                            Choose the hashrate that is right for you.
                            <br/>
                            <br/>
                            Remember, the higher the hashrate, the greater your income.
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            padding: '31px 40px', border: 'solid 2px #F0F0F0', textAlign: 'center',
                        }}>
                            Bmining has a referral program. This means that if you attract new clients to invest in
                            Bitcoin cloud mining, you will receive an additional reward for each new client.
                        </Box>
                    </Grid>
                </Grid>
            </WidthWrapper>
        </WidthWrapperXl>
        <WidthWrapperXl sx={{
            backgroundColor: '#F6F6F6', paddingBottom: '5rem',
        }}>
            {/*<WidthWrapper>*/}
            {/*    <Stack>*/}
            {/*        <Grid container spacing={'30px'}>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*            <Grid item md={3}>*/}
            {/*                <Stack spacing={'10px'}>*/}
            {/*                    <b>Set up an account</b>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet consectetur. Volutpat dolor tellus malesuada quis*/}
            {/*                    </p>*/}
            {/*                </Stack>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </Stack>*/}
            {/*</WidthWrapper>*/}
        </WidthWrapperXl>
        <WidthWrapperXl>
            <Container sx={{
                // paddingBottom: '4.375rem',
                maxWidth: '970px'
            }} mx={'auto'}>
                {isMdScreen ? <h2>
                    Start mining
                </h2> : <>
                    <Box
                        sx={{
                            position: 'relative',
                        }}
                    >

                        <div style={{
                            position: 'absolute', left: '45%', top: '55%', transform: 'translate(-50%, -50%)',
                        }}>
                            <img sx={{
                                width: '27.5625rem', height: '27.5625rem'
                            }} src="/assets/images/safe.png" alt="Safe"/>
                        </div>
                        <Typography sx={{
                            fontWeight: 800, fontSize: '190px', lineHeight: '232px',
                        }}>Start</Typography>
                        <Typography sx={{
                            color: theme.palette.primary.dark,
                            fontWeight: 800,
                            fontSize: '11.875rem',
                            lineHeight: '14.5rem',
                            position: 'relative',
                            top: '-5rem',
                            left: '42%',
                            zIndex: 3,
                        }}>
                            <div style={{
                                position: 'absolute',
                                fontWeight: "700",
                                fontSize: "1.375rem",
                                lineHeight: "170%",
                                textAlign: "right",
                                top: 0,
                                right: '40%',
                                display: "inline-block",
                                color: neutral["1000"],
                            }}
                            >
                                Withdraw the earned money at any time
                            </div>
                            Money
                        </Typography>
                    </Box>
                </>}

                <Box className='top-table' maxWidth={'60.625rem'} mx={'auto'}
                     sx={{
                         position: 'relative', top: '-7.5rem', zIndex: '10',
                     }}
                >
                    <BigHeader sx={{
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '2.1875rem',
                        lineHeight: '2.6875rem',
                        marginBottom: '1.25rem',
                    }}>Start Earning Right Now</BigHeader>
                    <Typography sx={{
                        fontWeight: 500,
                        fontSize: '1.0625rem',
                        lineHeight: '170%',
                        textAlign: 'center',
                        marginBottom: '10px',
                    }}>
                        Do not miss the opportunity to invest in Bitcoin mining now, so as not to regret the lost
                        profits later. All you need to do is act right now.
                    </Typography>
                    <Grid container spacing={3} alignContent={'stretch'} justifyContent={'center'}>
                        <Grid item>
                            <div className="micro-card">
                                <div className="micro-card__label">
                                    163 PH/s
                                </div>
                                <div className='micro-card__text'>
                                    our total power<br/> in management
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className="micro-card">
                                <div className="micro-card__label">
                                    0%
                                </div>
                                <div className='micro-card__text'>
                                    of any commissions<br/> or hidden payments
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className="micro-card">
                                <div className="micro-card__label">
                                    1000+
                                </div>
                                <div className='micro-card__text'>
                                    customers
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer/>
        </WidthWrapperXl>
    </>;
}
