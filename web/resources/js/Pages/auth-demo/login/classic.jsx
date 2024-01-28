import * as Yup from 'yup';
import {useFormik} from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Link,
    Stack,
    SvgIcon,
    TextField,
    Typography
} from '@mui/material';
import {RouterLink} from '@/Components/router-link';
import {Seo} from '@/Components/seo';
import {paths} from '@/paths';
import {useForm} from "@inertiajs/react";
import {useEffect} from "react";

const initialValues = {
    email: 'demo@devias.io',
    password: 'Password123!',
    submit: null
};

const validationSchema = Yup.object({
    email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    password: Yup
        .string()
        .max(255)
        .required('Password is required')
});

const Page = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: () => {
        }
    });



    return (
        <>
            <Seo title="Login"/>
            <div>
                <Box sx={{mb: 4}}>
                    <Link
                        color="text.primary"
                        component={RouterLink}
                        href={'/'}
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
                            Main
                        </Typography>
                    </Link>
                </Box>
                <Card elevation={16}>
                    <CardHeader
                        subheader={(
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Don&apos;t have an account?
                                &nbsp;
                                <Link
                                    href="#"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Register
                                </Link>
                            </Typography>
                        )}
                        sx={{pb: 0}}
                        title="Log in"
                    />
                    <CardContent>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    autoFocus
                                    error={errors.email}
                                    fullWidth
                                    helperText={errors.email}
                                    label="Email Address"
                                    name="email"
                                    onChange={handleOnChange}
                                    type="email"
                                    value={data.email}
                                />
                                <TextField
                                    error={errors.password}
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
                                size="large"
                                sx={{mt: 2}}
                                type="submit"
                                variant="contained"
                            >
                                Log In
                            </Button>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 3
                                }}
                            >
                                <Link
                                    href="#"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Forgot password?
                                </Link>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Page;
