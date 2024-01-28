import {useEffect, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";
import {useForm} from "@/helpers/general";
import {useRouter} from "@/hooks/use-router";
import toast from "react-hot-toast";
import {dashboardRoutes} from "@/routes/main";
import {useDispatch} from "react-redux";
import {updateTfa} from "@/slices/userSlice";

export default function DisableTFA({status, showDisableForm}) {

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm({
        code: '',
    });
    const handleInput = (e) => {
        setData({
            code: e.target.value
        });
    };

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (data.code.length >= 6) {
            patch(route('api.tfa.disable'), {
                onSuccess: () => {
                    dispatch(updateTfa({
                        tfa: false,
                    }))
                    toast.success('Tfa disabled');
                    router.replace(dashboardRoutes.settings);
                },
            });
        }
    }, [data.code])


    return (<>
        <Stack spacing={3}>
            <Typography>
                To disable tfa, you must enter the code from the authenticator application.
            </Typography>

            <form className='flex' action="">
                <TextField error={errors.code} helperText={errors.code ?? ''} value={data.code} onChange={handleInput}
                           type='text'/>
                <br/>
            </form>
        </Stack>
    </>);
}
