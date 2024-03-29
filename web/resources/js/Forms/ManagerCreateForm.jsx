import {
    Alert,
    Button,
    InputLabel,
    TextField,
    FormControl,
    FormHelperText,
    Select,
    InputAdornment,
    Stack
} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "@inertiajs/react";
import SuccessSavedAlert from "@/Components/SuccessSavedAlert";
import {SaveBtn} from "@/Components/SaveBtn";
import SelectInput from "@mui/material/Select/SelectInput";
import MenuItem from "@mui/material/MenuItem";
import {Percent} from "@mui/icons-material";

export default function UserCreateForm({tariffs}) {

    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm({
        name: '', surname: '', password: '', balance: 0, custom_bonus: 0, phone: '', email: '',
    });

    const changeInput = (e) => {
        if (e.target.name == 'tariff') {
            setData({
                ...data, [e.target.name]: {
                    id: e.target.value,
                }, tariff_id: e.target.value,
            });
        } else {
            setData({
                ...data, [e.target.name]: e.target.value,
            })
        }
    };
    const submit = (e) => {
        e.preventDefault();
        // patch(route('admin.managers.store'), {
        //     preserveScroll: true,
        // });
    };

    return (<>
        <form action="." onSubmit={submit}>
            <Stack spacing={2}>

                <Stack spacing={2} direction={'row'}>
                    <TextField helperText={errors.name} error={errors.name ?? false} onChange={changeInput}
                               name={'name'}
                               value={data.name ?? ''}
                               label="Name"
                               className='mr-4'
                               variant="outlined"/>
                    <TextField helperText={errors.surname} error={errors.surname ?? false} onChange={changeInput}
                               name={'surname'}
                               value={data.surname ?? ''}
                               label="Surname"
                               className='ml-4'
                               variant="outlined"/>
                </Stack>
                <div className='mb-2'>
                    <TextField helperText={errors.password} error={errors.password ?? false} onChange={changeInput}
                               name={'password'}
                               value={data.password} fullWidth
                               label="Password"
                               variant="outlined"/>
                </div>

                <div className='mb-2'>
                    <TextField helperText={errors.email} error={errors.email ?? false} onChange={changeInput}
                               name={'email'}
                               value={data.email ?? ''}
                               fullWidth
                               label="E-mail"
                               variant="outlined"/>
                </div>
                <div className='mb-4'>
                    <TextField helperText={errors.phone} error={errors.phone ?? false} onChange={changeInput}
                               name={'phone'}
                               value={data.phone ?? ''}
                               fullWidth
                               label="Phone number"
                               variant="outlined"/>
                </div>


                <SaveBtn disabled={processing} type='submit'>Submit</SaveBtn>
            </Stack>

        </form>
        <SuccessSavedAlert open={recentlySuccessful} vertical={'bottom'}/>
    </>);
}
