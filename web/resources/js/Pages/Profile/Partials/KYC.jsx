import InputError from "@/Components/InputError";
import {Box, Button, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import React, {useContext, useEffect, useState} from "react";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {useSelector} from "react-redux";
import {selectToken, selectUser} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {toast} from "react-toastify";

export function KYC() {
    const user = useSelector(selectUser);
    const [kyc, setKyc] = useState(null);
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        name: user?.name ?? kyc?.name,
        surname: user?.surname ?? kyc?.surname,
        photo: kyc?.photo ? kyc?.photo : '',
        middlename: '',
    });

    const token = useSelector(selectToken);

    useEffect(() => {
        apiRequest(token).get('/api/kyc').then((response) => {
            if (response.status == 200) {
                setKyc(response.data.kyc);
                if (kyc?.name) {
                    setData(response.data.kyc);
                }
            } else {
                toast.error('Cant load KYC data.');
            }
        });
    }, []);

    const changeInput = (e) => {
        // console.log(e.target.files ?? []);
        setData({
            ...data, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value,
        });
    };
    const submit = (e) => {
        e.preventDefault();
        apiRequest(token).postForm('/api/kyc/store', data)
            .then((response) => {
                if (response.status == 200) {
                    toast.success('Success send');
                } else if (response.status == 422) {
                    setErrors(response.data.errors);
                } else {
                    toast.error('Cant store KYC data.');
                }
            });
    };
    return (<>
        <BlockWrapper>
            <form encType='multipart/form-data' onSubmit={submit}>
                <Grid container>
                    <Grid xs={12} md={6}>
                        <Stack spacing={3} sx={{display: 'flex', height: '100%'}} justifyContent={'center'}
                               alignItems={'center'}>
                            <Box
                                component="img"
                                src={typeof data.photo === 'object' ? URL.createObjectURL(data.photo) : (data.photo ? data.photo : '')}
                                sx={{
                                    border: 0,
                                    width: 300,
                                    height: 300,
                                    backgroundColor: 'primary.dark',
                                    opacity: 0.9,
                                    objectFit: 'cover'
                                }}
                            >
                            </Box>
                            <Button variant="contained" component="label" endIcon={<PhotoCamera/>}>
                                Upload
                                <input name={'photo'}
                                       disabled={kyc?.id ? true : false}
                                    // value={data.photo}
                                       onChange={changeInput} hidden accept="image/*" multiple
                                       type="file"/>
                            </Button>

                            <div className='py-3'>
                                <InputError message={errors.photo}/>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={6}>

                        <Stack spacing={3}>
                            <Stack spacing={3}>
                                <TextField
                                    helperText={errors.name} error={errors.name ?? false} onChange={changeInput}
                                    name={'name'}
                                    value={data.name ?? ''}
                                    label="First name"
                                    className='mr-4'
                                    disabled={kyc?.id ? true : false}
                                    variant="outlined"/>
                                <TextField helperText={errors.surname} error={errors.surname ?? false}
                                           onChange={changeInput}
                                           name={'surname'}
                                           value={data.surname ?? ''}
                                           label="Last name"
                                           className='ml-4'
                                           disabled={kyc?.id ? true : false}
                                           variant="outlined"/>
                            </Stack>
                            <TextField helperText={errors.middlename} error={errors.middlename ?? false}
                                       onChange={changeInput}
                                       name={'middlename'}
                                       value={data.middlename ?? ''}
                                       label="Middle name"
                                       className='ml-4'
                                       disabled={kyc?.id ? true : false}
                                       variant="outlined"/>

                            <Stack spacing={3}>

                                <div>
                                    {(kyc?.verified) ? <div className='text-green-400'>Verified</div> :
                                        <Typography color={'warning'}>Verification pending</Typography>}
                                </div>
                            </Stack>
                            <Button variant={"contained"} type={'submit'}>Send</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </BlockWrapper>
    </>);
}
