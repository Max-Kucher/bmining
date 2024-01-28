import {Alert, Button, FormControlLabel, Stack, Switch, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import SuccessSavedAlert from "@/Components/SuccessSavedAlert";
import {SaveBtn} from "@/Components/SaveBtn";
import {useForm} from "@/api/helpers/general";

export default function TariffEditForm({tariff}) {

    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm(tariff);

    useEffect(() => {
        setData(tariff);
    }, [tariff]);

    const changeInput = (e) => {
        if (e.target.type == 'checkbox') {
            setData({
                ...data,
                [e.target.name]: !data[e.target.name],
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value,
            });
        }
    };
    const submit = (e) => {
        e.preventDefault();
        patch(route('api.tariff.update', {id: tariff.id}));
    };

    return (<>
        <form action="" onSubmit={submit}>
            <Stack spacing={3}>
                <TextField helperText={errors.name} error={errors.name ?? false} onChange={changeInput}
                           name={'name'}
                           value={data.name || ''}
                           fullWidth label="Name"
                           variant="outlined"/>
                <TextField helperText={errors.description} error={errors.description ?? false}
                           onChange={changeInput}
                           name={'description'}
                           value={data.description || ''} fullWidth
                           label="Description"
                           variant="outlined"/>
                <TextField helperText={errors.price} error={errors.price ?? false} onChange={changeInput}
                           name={'price'}
                           value={data.price || ''}
                           fullWidth label="Price"
                           variant="outlined"/>
                <TextField helperText={errors.percent} error={errors.percent ?? false} onChange={changeInput}
                           name={'percent'}
                           value={data.percent || ''} fullWidth
                           label="Percentage of profit per year" variant="outlined"/>

                <Stack spacing={3}>
                    <FormControlLabel
                        control={
                            <Switch
                                data-type={'checkbox'}
                                checked={data.available}
                                inputProps={{'aria-label': 'controlled'}}
                                name={'available'}
                                onChange={changeInput}
                            />
                        }
                        label="Available to user in dashboard"
                    />
                </Stack>

                <SaveBtn disabled={processing} type='submit'>Submit</SaveBtn>
            </Stack>
        </form>
        <SuccessSavedAlert open={recentlySuccessful} vertical={'bottom'}/>
    </>);
}
