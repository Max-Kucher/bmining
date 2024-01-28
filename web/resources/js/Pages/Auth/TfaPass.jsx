import {useEffect} from "react";
import {Layout} from "@/layouts/auth/modern-layout";
import {Seo} from "@/Components/Wrappers/Seo";
import {RouterLink} from "@/components/router-link";
import {Button, FormLabel, SvgIcon, Typography, Stack, FormControl, FormHelperText, Link} from "@mui/material";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {MuiOtpInput} from "mui-one-time-password-input";
import {useForm} from "@/helpers/general";
import {dashboardRoutes, mainRoutes} from "@/routes/main";
import {useDispatch} from "react-redux";
import {passTfa} from "@/slices/userSlice";
import toast from "react-hot-toast";
import {useRouter} from "@/hooks/use-router";

export default function TfaPass({}) {
    const {data, setData, patch, errors, processing, recentlySuccessful, responseData} = useForm({
        code: '',
    });

    const dispatch = useDispatch();

    const handleInput = (val) => {
        if (val.length >= 1) {
            setData({
                ...data,
                code: val
            });
        } else {
            setData({
                ...data,
                code: '',
            });
        }
    };

    useEffect(() => {
        if (data.code.length >= 6) {
            patch(route('api.tfa.pass'));
        }
    }, [data.code])


    const submit = (e) => {
        e.preventDefault();

        // post(route('verification.send'));
    };
    const router = useRouter();
    useEffect(() => {
        if (recentlySuccessful === true) {
            dispatch(passTfa({
                token: responseData.token,
            }));
            router.replace(dashboardRoutes.dashboard);
        }
    }, [recentlySuccessful])

    return (<Layout>
        <Seo title="Verify Code"/>
        <div>
            <div style={{marginBottom: '1rem'}}>
                <Link
                    color="text.primary"
                    component={RouterLink}
                    to={mainRoutes.main}
                    sx={{
                        alignItems: 'center', display: 'inline-flex'
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
            </div>
            <Stack
                sx={{mb: 4}}
                spacing={1}
            >
                <Typography variant="h5">
                    Verify code
                </Typography>
            </Stack>
            <form
                noValidate
                onSubmit={submit}
            >
                <FormControl error={!!(errors.code)}>
                    <FormLabel
                        sx={{
                            display: 'block', mb: 2
                        }}
                    >
                        Code
                    </FormLabel>
                    <MuiOtpInput
                        length={6}
                        onChange={handleInput}
                        name={'code'}
                        sx={{
                            '& .MuiFilledInput-input': {
                                p: '14px'
                            }
                        }}
                        value={data.code}
                    />
                    {!!(errors.code) && (<FormHelperText>
                        {errors.code}
                    </FormHelperText>)}
                </FormControl>
                <Button
                    fullWidth
                    size="large"
                    sx={{mt: 3}}
                    type="submit"
                    variant="contained"
                    disabled={processing}
                >
                    Verify
                </Button>
            </form>
        </div>
    </Layout>);
}
