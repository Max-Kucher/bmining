import Slider from 'react-slick';
import PropTypes from 'prop-types';
import {Box, Button, Card, CardContent, Divider, Stack, Typography} from '@mui/material';

const sliderSettings = {
    autoplay: true,
    speed: 500,
    ccsEase: 'ease-in',
    autoplaySpeed: 9000,
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
};

export const OverviewTips = (props) => {
    const {sx, tips} = props;

    return (
        <Card sx={sx}>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <Box sx={{mb: 6}}>
                    <img src="/assets/next-tip.svg"/>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        '& .slick-slider': {
                            cursor: 'grab'
                        },
                        '& .slick-slider, & .slick-list, & .slick-track': {
                            height: '100%'
                        },
                        '& .slick-dots': {
                            top: -50,
                            bottom: 'unset',
                            left: -10,
                            textAlign: 'left'
                        }
                    }}
                >
                    <Slider {...sliderSettings}>
                        {tips.map((tip) => (
                            <Stack key={tip.title} spacing={3}>
                                <Typography variant="h6"
                                    // textAlign={'center'}
                                >
                                    {tip.title}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{mt: 1}}
                                    variant="body1"
                                    // textAlign={'center'}
                                >
                                    {tip.content}
                                </Typography>
                                {/*<Divider color={'#000'} sx={{marginTop: 'auto'}}/>*/}
                                {/*<Box justifyContent={'flex-end'}>*/}
                                {/*    <Button variant={'contained'} sx={{marginTop: 'auto'}}>Next</Button>*/}
                                {/*</Box>*/}
                            </Stack>
                        ))}
                    </Slider>
                </Box>
            </CardContent>
        </Card>
    );
};

OverviewTips.propTypes = {
    sx: PropTypes.object,
    tips: PropTypes.array.isRequired
};
