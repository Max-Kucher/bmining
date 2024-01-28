import {useEffect} from 'react';
import {Seo} from "@/Components/Wrappers/Seo";
import {Box, Button, FormHelperText, Link, Stack, SvgIcon, TextField, Typography} from "@mui/material";
import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {Layout} from "@/layouts/auth/modern-layout";
import {useForm} from "@/helpers/general";
import {useParams} from "react-router";
import toast from "react-hot-toast";
import {useRouter} from "@/hooks/use-router";
import {mainRoutes} from "@/routes/main";

export default function ResetPassword({}) {
    const {hash, email} = useParams();
    const router = useRouter();
    const {data, setData, post, processing, errors, reset, recentlySuccessful} = useForm({
        token: hash,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('api.password.store'));
    };

    useEffect(() => {
        if (recentlySuccessful === true) {
            toast.success("Password successfuly changed.");
            router.replace(mainRoutes.login);
        }
    }, [recentlySuccessful]);


    return (
        <>
            <Layout>
                <Seo title="Reset Password"/>
                <div>
                    <Box sx={{mb: 4}}>
                        <Link
                            color="text.primary"
                            component={RouterLink}
                            href={paths.dashboard.index}
                            sx={{
                                alignItems: 'center',
                                display: 'inline-flex'
                            }}
                            underline="hover"
                        >
                            <SvgIcon sx={{mr: 1}}>
                                <ArrowLeftIcon/>
                            </SvgIcon>
                            <Typography variant="subtitle2">
                                Dashboard
                            </Typography>
                        </Link>
                    </Box>
                    <Stack
                        sx={{mb: 4}}
                        spacing={1}
                    >
                        <Typography variant="h5">
                            Reset password
                        </Typography>
                    </Stack>
                    <form
                        noValidate
                        onSubmit={submit}
                    >
                        <Stack spacing={3}>
                            <input hidden={true} name={'email'} value={data.email}/>
                            <TextField
                                error={!!(errors.password)}
                                fullWidth
                                helperText={errors.password}
                                label="Password"
                                name="password"
                                onChange={onHandleChange}
                                type="password"
                                value={data.password}
                            />
                            <TextField
                                error={!!(errors.password_confirmation)}
                                fullWidth
                                helperText={errors.password_confirmation}
                                label="Password (Confirm)"
                                name="password_confirmation"
                                onChange={onHandleChange}
                                type="password"
                                value={data.password_confirmation}
                            />

                            <FormHelperText error={errors?.email ?? false}>{errors.email}</FormHelperText>

                        </Stack>

                        <Button
                            fullWidth
                            size="large"
                            sx={{mt: 3}}
                            type="submit"
                            variant="contained"
                        >
                            Reset
                        </Button>
                    </form>
                </div>
            </Layout>
        </>
    );
}
