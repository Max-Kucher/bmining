import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
    Box, Button, Checkbox, FormHelperText, Link, Stack, SvgIcon, TextField, Typography
} from '@mui/material';
import {Seo} from '@/components/seo';
import {useEffect} from "react";
import {dashboardRoutes, mainRoutes} from "@/routes/main";
import {RouterLink} from "@/components/router-link";
import {useForm} from "@/helpers/general";
import {useDispatch} from "react-redux";
import {login} from "@/slices/userSlice";
import {useRouter} from "@/hooks/use-router";

const Page = () => {
    const {data, setData, post, processing, errors, reset, responseData, recentlySuccessful} = useForm({
        name: '', surname: '', email: '', password: '', password_confirmation: '', phone: '',
    });
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('api.register'));
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(login({
                user: responseData.user,
                token: responseData.token,
                emailVerified: responseData.user.email_verified_at === null ? false : true,
                tfaPassed: true,
                permissions: ['customer'],
            }));
            router.replace(dashboardRoutes.dashboard);
        }, 10);
    }, [recentlySuccessful])

    return (<>
        <Seo title="Register"/>
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
                    Register
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Already have an account?
                    &nbsp;
                    <Link
                        component={RouterLink}
                        to={mainRoutes.login}
                        underline="hover"
                        variant="subtitle2"
                    >
                        Log in
                    </Link>
                </Typography>
            </Stack>
            <form
                noValidate
                onSubmit={submit}
            >
                <Stack spacing={3}>
                    <TextField
                        error={!!(errors.name)}
                        fullWidth
                        helperText={errors.name}
                        label="First name"
                        name="name"
                        onChange={handleOnChange}
                        value={data.name}
                    />
                    <TextField
                        error={!!(errors.surname)}
                        fullWidth
                        helperText={errors.surname}
                        label="Last name"
                        name="surname"
                        onChange={handleOnChange}
                        value={data.surname}
                    />
                    <TextField
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
                        error={!!(errors.phone)}
                        fullWidth
                        helperText={errors.phone}
                        label="Phone"
                        name="phone"
                        onChange={handleOnChange}
                        type="text"
                        value={data.phone}
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
                    <TextField
                        error={!!(errors.password_confirmation)}
                        fullWidth
                        helperText={errors.password_confirmation}
                        label="Password"
                        name="password_confirmation"
                        onChange={handleOnChange}
                        type="password"
                        value={data.password_confirmation}
                    />
                </Stack>
                <Box
                    sx={{
                        alignItems: 'center', display: 'flex', ml: -1, mt: 1
                    }}
                >
                    <Checkbox
                        checked={data.policy}
                        name="policy"
                        onChange={handleOnChange}
                    />
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        I have read the
                        {' '}
                        <Link
                            component={'a'}
                            href={mainRoutes.terms}
                            target={"_blank"}
                        >
                            Terms and Conditions
                        </Link>
                    </Typography>
                </Box>
                {!!(errors.policy) && (<FormHelperText error>
                    {errors.policy}
                </FormHelperText>)}
                <Button
                    disabled={processing}
                    fullWidth
                    size="large"
                    sx={{mt: 3}}
                    type="submit"
                    variant="contained"
                >
                    Register
                </Button>
            </form>
        </div>
    </>);
};

export default Page;
