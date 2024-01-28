import {Header} from "@/Components/Main/Header";
import WidthWrapper from "@/Components/Main/WidthWrapper";
import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import WidthWrapperXl from "@/Components/Main/WidthWrapperXl";
import {Footer} from "@/Components/Main/Footer";
import {useSettings} from "@/hooks/use-settings";
import {Seo} from "@/Components/Wrappers/Seo";
import LightWrapper from "@/Components/Wrappers/LIghtWrapper";

export function FaqBox({title, text, big = true}) {
    return (<Box
        sx={{
            display: 'flex',
            boxShadow: '0px 4px 100px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            backgroundColor: '#ffffff',
            padding: '3.125rem 2.5rem',
            height: '100%',
            minHeight: big ? '30rem' : '21.875rem',
        }}
    >

        <Stack spacing={'1.25rem'} sx={{height: '100%'}}>
            <div style={{
                fontWeight: "700", fontSize: "1.25rem", lineHeight: "136.3%",
            }}>
                {title}
            </div>
            <div style={{
                fontWeight: "500", fontSize: "1rem", lineHeight: "170%", textAlign: "justify"
            }}>
                {text}
            </div>
        </Stack>
    </Box>);
}

export default function Faq(props) {
    return (
            <Page/>
    );
}


export function Page() {
    const theme = useTheme();
    const settingsDefault = useSettings();

    return (<>
        <WidthWrapperXl sx={{}}>
            <Seo title={'FAQ'}/>
            <Header/>

            <Box sx={{
                paddingTop: '10.4375rem', background: 'url(/assets/mountains-light-bg.svg)',
            }}>
                <WidthWrapper>
                    <Stack direction={'row'} spacing={'89px'} sx={{marginBottom: '43px'}}>
                        <Typography sx={{
                            fontWeight: 800, fontSize: '5rem', lineHeight: '6.125rem', marginBottom: '3.25rem',
                        }}>
                            FAQ
                        </Typography>
                    </Stack>
                    <Grid container alignItems={'stretch'} spacing={'1.875rem'} sx={{}}>
                        <Grid item xs={12} md={6}>
                            <FaqBox big={true} title={'1. How do I benefit?'} text={<span>
                                    Bmining owns several data centers, and each of them has new special equipment for Bitcoin mining. It is this equipment that you rent from our company for a period of 1 year, and it will mine Bitcoin for you 24/7 for a whole year. Bitcoin, which will be mined by you with the help of our equipment, will be instantly credited to your personal wallet. Keep in mind that you can withdraw your Bitcoin absolutely at any time, sell it or save it to resell later at a higher price.
                                </span>}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FaqBox big={true} title={<span>
                                    2. What is cryptocurrency in<br/> general?
                                </span>} text={<span>
                                        Cryptocurrency is a digital currency that is not controlled by states or central banks. It makes transaction processing independent, transparent to all participants of the network of computers included in the blockchain, and at the same time anonymous.
                                    </span>}/>
                        </Grid>
                    </Grid>

                </WidthWrapper>
            </Box>
        </WidthWrapperXl>
        <WidthWrapperXl sx={{
            background: '#eef1f6',
        }}>
            <WidthWrapper sx={{
                paddingBottom: '70px',
            }}>
                <Grid container alignItems={'stretch'} spacing={'1.875rem'} sx={{paddingTop: '1.875rem'}}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={'1.875rem'}>
                            <FaqBox big={false} title={<span>3. What is GH/s in simple<br/> words?</span>}
                                    text={<Stack spacing={'1.25rem'}>
                                    <span>
                                    GH/s (gigahash per second) is an indicator of the speed of Bitcoin mining equipment.
                                    The higher the GH/s, the more Bitcoins you can get.
                                    </span>
                                        <span>
                                    For example, if the network has 5 GH/s, it means that the network can perform 5
                                    trillion calculations per second.
                                    </span>
                                    </Stack>}/>
                            <FaqBox big={true}
                                    title={'5. How to understand what exactly depends the profitability of investing in cryptocurrencies?'}
                                    text={<Stack spacing={'1.25rem'}>
                                        <span>
                                        Profitability depends on the rate that is valid at the time of purchase of the cryptocurrency, the rate at the time of sale of the cryptocurrency, as well as the power of the equipment with which you mine Bitcoin.
                                        </span>
                                        <span>
                                        We offer you the most efficient high-quality equipment.
                                        </span>
                                    </Stack>}/>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={'1.875rem'}>
                            <FaqBox big={true}
                                    title={<span>4. Do Mining contracts have a provision for filing taxes?</span>}
                                    text={<div>
                                        Yes, indeed, at the end of the contract, we can provide you with an official
                                        document indicating the amount of investment and profit. This will help you
                                        prepare a tax return statement.
                                    </div>}/>
                            <FaqBox big={false} title={<span>6. Can I get my initial deposit back?</span>} text={<span>
                                Yes, you can certainly get back the entire amount of your deposit when your contract expires.<br/>
                                Thus, if you invest $1. 000, then in a year you will receive $1. 440 net profit. That is, you will receive the entire amount of your initial deposit + $440 income.
                                </span>}/>
                        </Stack>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <Stack spacing={'1.875rem'}>
                            <FaqBox big={false}
                                    title={<span>7. In which countries are Bmining services available?</span>}
                                    text={<span>
                                        Bmining is available to residents of the UK and also all European countries. If you are a customer of a country that is not included in the above list of countries, you need to contact our support service via our online chat or simply write to us by email.
                                </span>}/>

                            <FaqBox big={true}
                                    title={'9. How to understand what exactly depends the profitability of investing in cryptocurrencies?'}
                                    text={<Stack spacing={'1.25rem'}>
                                        <span>
                                        In fact, the answer to this question is extremely simple. Unlike you, most people do not even know about the existence of this method of passive earnings, which is provided by our company Bmining.
                                        </span>
                                        <span>
                                            That is why you are already one step ahead of many people. Therefore, there is no reasonable reason to delay taking advantage of this essentially unique opportunity.
                                        </span>
                                    </Stack>}/>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={'1.875rem'}>
                            <FaqBox big={true} title={<span>
                                8. Am I putting myself at risk by investing in Bitcoin mining via Bmining?
                            </span>}
                                    text={<Stack spacing={'1.25rem'}>
                                        <span>
                                        Definitely not. Investing in Bitcoin cloud mining is not associated with any risks.
                                        </span>
                                        <span>
                                                There remains only the possibility that one or another country may ban crypto mining. But even in this case, you absolutely do not risk anything, since we have several mining farms in different countries.
                                        </span>
                                    </Stack>}/>
                            <FaqBox
                                big={false}
                                title={<span>10. What exactly is the advantage of Bitcoin mining?</span>}
                                text={<span>
                                        You can really earn a high income from Bitcoin mining if you have the opportunity to use powerful high-quality mining equipment. And you have such an opportunity, because this is the kind of equipment that Bmining provides to you. All you have to do is start mining Bitcoins right now.
                                </span>}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </WidthWrapper>
            <Footer/>
        </WidthWrapperXl>
    </>);
}
