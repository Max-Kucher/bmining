import {
    Alert,
    Button,
    InputLabel,
    TextField,
    FormControl,
    FormHelperText,
    Select,
    InputAdornment,
    Stack, FormControlLabel, Switch
} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "@inertiajs/react";
import SuccessSavedAlert from "@/Components/SuccessSavedAlert";
import {SaveBtn} from "@/Components/SaveBtn";
import SelectInput from "@mui/material/Select/SelectInput";
import MenuItem from "@mui/material/MenuItem";
import {Percent} from "@mui/icons-material";
import toast from "react-hot-toast";

export default function UserCreateForm({tariffs}) {

    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm({
        name: '', surname: '', password: '', balance: 0, custom_bonus: 0, phone: '', email: '',
        is_manager: false,
        manager_percent: 0,
    });

    const changeInput = (e) => {
        if (e.target.name == 'tariff') {
            setData({
                ...data, [e.target.name]: {
                    id: e.target.value,
                }, tariff_id: e.target.value,
            });
        } else if (e.target.type == 'checkbox') {
            setData({
                ...data,
                [e.target.name]: !data[e.target.name],
            });
        } else {
            setData({
                ...data, [e.target.name]: e.target.value,
            })
        }
    };
    const submit = (e) => {
        e.preventDefault();

        patch(route('admin.users.store'), {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (recentlySuccessful === true) {
            toast.success('User added');
        }
    }, [recentlySuccessful])

    return (<>
        <form onSubmit={submit}>
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
                    <TextField helperText={errors.password ?? ''} error={errors.password ?? false}
                               onChange={changeInput}
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

                <div>
                    <FormControlLabel
                        control={<Switch
                            checked={data.is_manager === null || data.is_manager === false ? false : true}
                            inputProps={{'aria-label': 'controlled'}}
                            onChange={changeInput}
                            error={errors.is_manager ?? false}
                            name={'is_manager'}
                        />}
                        label="Is manager"
                    />
                    <FormHelperText
                        error={errors.is_manager}>{errors.is_manager ?? ''}</FormHelperText>
                </div>

                {data.is_manager ? <div>
                    <TextField helperText={errors.manager_percent} error={errors.manager_percent ?? false}
                               onChange={changeInput}
                               name={'manager_percent'}
                               value={data.manager_percent ?? '0'}
                               fullWidth
                               label="Manager percent profit for sale"
                               variant="outlined"/>
                </div> : null}

                <SaveBtn disabled={processing} type='submit'>Submit</SaveBtn>
            </Stack>

        </form>
    </>);
}
