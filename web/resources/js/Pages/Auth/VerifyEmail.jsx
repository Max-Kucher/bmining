import {Seo} from "@/Components/Wrappers/Seo";
import {StatusPaper} from "@/Pages/OrderProcessing/Modals/StatusPaper";
import {Email} from "@mui/icons-material";
import {Button, Container, Grid, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import PageWrapper from "@/Components/Wrappers/PageWrapper";
import {useForm} from "@/helpers/general";
import {useDispatch} from "react-redux";
import {logout} from "@/slices/userSlice";
import toast from "react-hot-toast";

export default function VerifyEmail({status}) {
    const {post, processing} = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('api.verification-mail.send'), {
            onSuccess: () => {
                toast.success('The mail with verification link has been sent.');
            },
        });
    };


    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const theme = useTheme();

    return (<>
        <Seo title="Email Verification"/>
        <Container maxWidth={'sm'}>
            <StatusPaper title={'Verify email'} icon={null} button={null}>
                <>
                    <Stack spacing={3} justifyContent={'center'} alignItems={'center'}>
                        <Email color={theme.palette.primary.main} sx={{fontSize: '100px'}}/>

                        <Typography textAlign={'center'} variant={'body2'}>
                            Thanks for signing up! Before getting started, could you verify your email address
                            by clicking on the
                            link we just emailed to you? If you didn't receive the email, we will gladly send
                            you another.
                        </Typography>

                        <Button
                            onClick={submit}
                            color={'success'} variant={'contained'} disabled={processing}>
                            Resend Verification Email
                        </Button>
                        {status === 'verification-link-sent' && (<Typography>
                            A new verification link has been sent to the email address you provided during
                            registration.
                        </Typography>)}

                        <Button
                            sx={{cursor: 'pointer'}}
                            variant={'contained'}
                            onClick={logoutHandler}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Button>
                    </Stack>
                </>
            </StatusPaper>
        </Container>
    </>);
}
