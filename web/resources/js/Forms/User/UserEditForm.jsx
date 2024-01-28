import {
    TextField,
    FormHelperText,
    InputAdornment,
    Switch,
    FormControlLabel,
    Stack,
} from "@mui/material";
import SuccessSavedAlert from "@/Components/SuccessSavedAlert";
import {SaveBtn} from "@/Components/SaveBtn";
import {Percent} from "@mui/icons-material";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {useForm} from "@/helpers/general";
import {useEffect} from "react";

export default function UserEditForm({user, roles}) {

    const userRolesMap = {
        is_admin: roles.includes('admin'),
        is_manager: roles.includes('manager'),
    };

    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm({
        ...user,
        password: '',
        email_verified_at: typeof user.email_verified_at == 'string' ? true : false,
        is_admin: userRolesMap.is_admin,
        is_manager: userRolesMap.is_manager,
    });

    useEffect(() => {
        setData({
            ...user,
            password: '',
            email_verified_at: typeof user.email_verified_at == 'string' ? true : false,
            is_admin: userRolesMap.is_admin,
            is_manager: userRolesMap.is_manager,
        });
    }, [user])

    const changeInput = (e) => {
        if (e.target.name == 'tariff') {
            setData({
                ...data, [e.target.name]: {
                    id: e.target.value,
                }, tariff_id: e.target.value,
            });
        } else if (e.target.name == 'email_verified_at') {
            setData({
                ...data, [e.target.name]: e.target.checked ? true : false,
            })
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
        patch(route('admin.users.update', {id: user.id}));
    };

    return (<>
        <BlockWrapper>
            <form onSubmit={submit}>
                <Stack spacing={3}>
                    <Stack direction={'row'} spacing={3}>
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
                    <div>
                        <TextField helperText={errors.password} error={errors.password ?? false} onChange={changeInput}
                                   name={'password'}
                                   value={data.password} fullWidth
                                   label="Password"
                                   variant="outlined"/>
                    </div>
                    <div>
                        <TextField helperText={errors.email} error={errors.email ?? false}
                                   onChange={changeInput}
                                   name={'email'}
                                   value={data.email ?? ''}
                                   fullWidth
                                   label="E-mail"
                                   variant="outlined"/>
                    </div>
                    <div>
                        <FormControlLabel
                            control={<Switch
                                checked={data.email_verified_at}
                                inputProps={{'aria-label': 'controlled'}}
                                onChange={changeInput}
                                error={errors.email_verified_at ?? false}
                                name={'email_verified_at'}
                            />}
                            label="Email verified"
                        />
                        <FormHelperText
                            error={errors.email_verified_at}>{errors.email_verified_at ?? ''}</FormHelperText>
                    </div>
                    <div className='mb-4'>
                        <TextField helperText={errors.phone} error={errors.phone ?? false} onChange={changeInput}
                                   name={'phone'}
                                   value={data.phone ?? ''}
                                   fullWidth
                                   label="Phone number"
                                   variant="outlined"/>
                    </div>

                    <div className='mb-4'>
                        <TextField helperText={errors.custom_bonus} error={errors.custom_bonus ?? false}
                                   onChange={changeInput}
                                   name={'custom_bonus'}
                                   value={data.custom_bonus ?? ''}
                                   label="Additional bonus for year profit"
                                   InputProps={{
                                       endAdornment: <InputAdornment position="end">
                                           <Percent/>
                                       </InputAdornment>,
                                   }}
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

                    <div>
                        <FormControlLabel
                            control={<Switch
                                checked={data.is_admin === null || data.is_admin === false ? false : true}
                                inputProps={{'aria-label': 'controlled'}}
                                onChange={changeInput}
                                error={errors.is_admin ?? false}
                                name={'is_admin'}
                            />}
                            label="Is admin"
                        />
                        <FormHelperText
                            error={errors.is_admin}>{errors.is_admin ?? ''}</FormHelperText>
                    </div>


                    <SaveBtn disabled={processing} type='submit'>Submit</SaveBtn>

                </Stack>
            </form>
            <SuccessSavedAlert open={recentlySuccessful} vertical={'bottom'}/>
        </BlockWrapper>
    </>);
}
