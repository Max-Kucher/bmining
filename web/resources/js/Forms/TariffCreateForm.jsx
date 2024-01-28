import {Alert, Button, Stack, TextField} from "@mui/material";
import SuccessSavedAlert from "@/Components/SuccessSavedAlert";
import {SaveBtn} from "@/Components/SaveBtn";
import {useForm} from "@/helpers/general";

export default function TariffCreateForm({tariff}) {

    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm({
        name: '',
        description: '',
        percent: '',
        price: '',
        available: false,
    });

    const changeInput = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        })
    };
    const submit = (e) => {
        e.preventDefault();
        patch(route('api.tariff.store'));
    };

    return (<>
        <form action="" onSubmit={submit}>
            <Stack spacing={2}>

                <div>
                    <TextField helperText={errors.name} error={errors.name ?? false} onChange={changeInput}
                               name={'name'}
                               value={data.name || ''}
                               fullWidth label="Name"
                               variant="outlined"/>
                </div>
                <div>
                    <TextField helperText={errors.description} error={errors.description ?? false}
                               onChange={changeInput}
                               name={'description'}
                               value={data.description || ''} fullWidth
                               label="Description"
                               variant="outlined"/>
                </div>
                <div>
                    <TextField required helperText={errors.price} error={errors.price ?? false} onChange={changeInput}
                               name={'price'}
                               value={data.price || ''}
                               fullWidth label="Price"
                               variant="outlined"/>
                </div>
                <div>
                    <TextField required helperText={errors.percent} error={errors.percent ?? false}
                               onChange={changeInput}
                               name={'percent'}
                               value={data.percent || ''} fullWidth
                               label="Percentage of profit per year" variant="outlined"/>
                </div>
                <SaveBtn disabled={processing} type='submit'>Submit</SaveBtn>

            </Stack>
        </form>
        <SuccessSavedAlert open={recentlySuccessful} vertical={'bottom'}/>
    </>);
}
