import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {Box, Button, Link, Stack, SvgIcon, TextField, Typography} from '@mui/material';
import {Seo} from '@/Components/seo';
import {useEffect, useState} from "react";
import {axiosErrorsCfg, useForm} from "@/api/helpers/general";
import {RouterLink} from "@/Components/router-link";
import {mainRoutes} from "@/routes/main";

import {login, selectAuth, selectUser} from "@/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useRouter} from "@/hooks/use-router";


const Page = () => {

    const [errors, setErrors] = useState({});
    const {data, setData, post, processing, reset} = useForm({
        email: '', password: '', remember: '',
    });

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectAuth);
    const router = useRouter();

    useEffect(() => {
        if (isAuth === true && user !== undefined) {
            router.replace('/dashboard');
        }
    }, [isAuth]);


    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);


    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(route('api.login'), data, axiosErrorsCfg).then((response) => {
            if (response.status == 200) {
                if (response.data?.token) {
                    dispatch(login({
                        permissions: response.data.roles,
                        user: response.data.user,
                        token: response.data.token,
                        emailVerified: response.data.user.email_verified_at != null,
                        tfaPassed: response.data.need_tfa === false,
                    }));

                }
            } else if (response.status == 422) {
                setErrors(response.data.errors);
            }
        });

        // post(route('login'));
    };

    return (<>
        <Seo title="Login"/>
        <div>
            <Box sx={{mb: 4}}>
                <Link
                    color="text.primary"
                    component={RouterLink}
                    href={mainRoutes.main}
                    style={{
                        alignItems: 'center', display: 'flex', flexFlow: 'row'
                    }}
                    underline="hover"
                >
                    <SvgIcon sx={{mr: 1}}>
                        <ArrowLeftIcon/>
                    </SvgIcon>
                    <div variant="subtitle2" display={'inline'}>
                        Back
                    </div>
                </Link>
            </Box>
            <Stack
                sx={{mb: 4}}
                spacing={1}
            >
                <Typography variant="h5">
                    Log in
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Don&apos;t have an account?
                    &nbsp;
                    <Link
                        component={RouterLink}
                        href={mainRoutes.register}
                        underline="hover"
                        variant="subtitle2"
                    >
                        Register
                    </Link>
                </Typography>
            </Stack>
            <form
                noValidate
                onSubmit={submit}
            >
                <Stack spacing={3}>
                    <TextField
                        autoFocus
                        error={!!(errors.email)}
                        fullWidth
                        helperText={errors.email}
                        label="Email Address"
                        name="email"
                        onChange={handleOnChange}
                        type="email"
                        value={data.email}
                    />
                    <TextField
                        error={!!(errors.password)}
                        fullWidth
                        helperText={errors.password}
                        label="Password"
                        name="password"
                        onChange={handleOnChange}
                        type="password"
                        value={data.password}
                    />
                </Stack>
                <Button
                    fullWidth
                    sx={{mt: 3}}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Continue
                </Button>
                <Box sx={{mt: 3}}>
                    <Link
                        component={RouterLink}
                        href={mainRoutes.forgotPassword}
                        underline="hover"
                        variant="subtitle2"
                    >
                        Forgot password?
                    </Link>
                </Box>
            </form>
        </div>
    </>);
};

export default Page;
