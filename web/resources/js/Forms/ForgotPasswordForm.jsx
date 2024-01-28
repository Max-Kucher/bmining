import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {Box, Button, Link, Stack, SvgIcon, TextField, Typography} from '@mui/material';
import {Seo} from '@/Components/seo';
import {mainRoutes} from "@/routes/main";
import {RouterLink} from "@/Components/router-link";
import {useForm} from "@/api/helpers/general";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
    const {data, setData, post, processing, errors, recentlySuccessful} = useForm({
        email: '',
    });
    const [status, setStatus] = useState(false);

    const onHandleChange = (event) => {
        setData({
            [event.target.name]: event.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('api.password.email'));
    };

    useEffect(() => {
        if (recentlySuccessful) {
            setStatus(true);
        }
    }, [recentlySuccessful]);


    return (<>
        <Seo title="Forgot Password"/>
        <Box>
            <Box sx={{mb: 4}}>

                <Link
                    color="text.primary"
                    component={RouterLink}
                    href={mainRoutes.login}
                    sx={{
                        alignItems: 'center', display: 'inline-flex'
                    }}
                    underline="hover"
                >
                    <SvgIcon sx={{mr: 1}}>
                        <ArrowLeftIcon/>
                    </SvgIcon>
                    <Typography variant="subtitle2">
                        Back
                    </Typography>
                </Link>
            </Box>
            <Stack
                sx={{mb: 4}}
                spacing={1}
            >
                <Typography variant="h5">
                    Forgot password
                </Typography>
                <Typography variant={'body1'}>
                    Forgot your password? No problem. Just let us know your email address and we will email you a
                    password
                    reset link that will allow you to choose a new one.
                </Typography>

            </Stack>
            <form
                noValidate
                onSubmit={submit}
            >
                <Stack spacing={1}>
                    <TextField
                        autoFocus
                        error={!!(errors.email)}
                        fullWidth
                        helperText={errors.email}
                        label="Email Address"
                        name="email"
                        onChange={onHandleChange}
                        type="email"
                        value={data.email}
                    />
                    {recentlySuccessful == true &&
                        <Typography color={'success.main'}>We have sent an email with a password reset link to your
                            email.</Typography>}
                </Stack>
                <Button
                    disabled={processing}
                    fullWidth
                    size="large"
                    sx={{mt: 3}}
                    type="submit"
                    variant="contained"
                >
                    Send reset link
                </Button>
            </form>
        </Box>
    </>);
};

export default ForgotPasswordForm;
