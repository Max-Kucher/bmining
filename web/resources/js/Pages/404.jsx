import {Box, Button, Container, Typography, useMediaQuery} from '@mui/material';
import {RouterLink} from '@/Components/router-link';
import {Seo} from '@/Components/seo';
import {usePageView} from '@/hooks/use-page-view';
import {mainRoutes} from "@/routes/main";

const NotFoundPage = () => {
    const mdUp = useMediaQuery((theme) => theme.breakpoints.down('md'));

    usePageView();

    return (
        <>
            <Seo title="Error: Not Found"/>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    py: '80px'
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 6
                        }}
                    >
                        <Box
                            alt="Not found"
                            component="img"
                            src="/assets/errors/error-404.png"
                            sx={{
                                height: 'auto',
                                maxWidth: '100%',
                                width: 400
                            }}
                        />
                    </Box>
                    <div style={{fontSize: '4rem', textAlign: 'center'}}>
                        404
                    </div>
                    <Typography
                        align="center"
                        variant={mdUp ? 'h1' : 'h4'}
                    >
                        The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        sx={{mt: 0.5}}
                    >
                        You either tried some shady route or you came here by mistake. Whichever it is, try using the
                        navigation.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 6
                        }}
                    >
                        <Button
                            component={RouterLink}
                            href={mainRoutes.main}
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default NotFoundPage;
