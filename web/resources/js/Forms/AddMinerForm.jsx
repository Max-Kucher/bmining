import {
    Button, FormControl, FormHelperText, InputLabel, Select, Stack, Switch, TextField, Typography
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {useForm} from "@/api/helpers/general";

export default function AddMinerForm({tariffs, user, editMode = false, miner = null}) {
    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm({
        tariff_id: miner?.tariff_id ?? null,
        days: miner?.days ?? '365',
        run: miner?.run ?? true,
        deposit: miner?.deposit ?? 0,
        profit: miner?.profit ?? 0,
    });

    useEffect(() => {
        setData({
            tariff_id: miner?.tariff_id ?? null,
            days: miner?.days ?? '365',
            run: miner?.run ?? true,
            deposit: miner?.deposit ?? 0,
            profit: miner?.profit ?? 0,
        });
    }, [miner, tariffs, user]);

    const changeInput = (e) => {
        let name = e.target.name;
        if (name == 'tariff') {
            setData({
                ...data, [name]: {
                    id: e.target.value,
                }, tariff_id: e.target.value,
            });
        } else if (name == 'run') {
            setData({
                ...data, [name]: e.target.checked ? true : false,
            })
        } else {
            setData({
                ...data, [name]: e.target.value,
            })
        }
    };
    const submit = (e) => {
        e.preventDefault();
        if (editMode === true) {
            patch(route('api.manage.miners.update', {id: miner.id}), {});
        } else {
            patch(route('api.manage.miners.store', {id: user.id}), {});
        }
    };

    useEffect(() => {
        if (recentlySuccessful === false) {
            return;
        }
        if (editMode === true) {
            toast.success('Miner updated!');
        } else {
            toast.success('Miner added!');
        }
    }, [recentlySuccessful]);


    return (<form onSubmit={submit}>
        <Stack spacing={3}>
            <TextField
                error={!!(errors.days)}
                fullWidth
                helperText={errors.days}
                label="Days"
                name="days"
                type={'number'}
                onChange={changeInput}
                required
                value={data.days}
            />

            <TextField
                error={!!(errors.deposit)}
                fullWidth
                type={'number'}
                helperText={errors.deposit}
                label="Deposit"
                name="deposit"
                onChange={changeInput}
                required
                value={data.deposit}
            />

            <TextField
                error={!!(errors.profit)}
                fullWidth
                helperText={errors.profit ?? 'Miner profit sum, default 0'}
                type={'number'}
                label="Profit"
                name="profit"
                onChange={changeInput}
                required
                value={data.profit}
            />

            <FormControl>
                <InputLabel id="demo-simple-select-helper-label">Mining plane</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    value={data.tariff_id ?? ''}
                    label="Plan"
                    name={'tariff'}
                    onChange={changeInput}
                    error={errors.tariff_id}
                >
                    <MenuItem value={''}>
                        <em>None</em>
                    </MenuItem>
                    {tariffs.map((item) => {
                        return <MenuItem value={item.id}>
                            <em>{item.name} - {item.percent}%</em>
                        </MenuItem>;
                    })}
                </Select>
                <FormHelperText>{errors.tariff_id ?? 'Select mining plan'}</FormHelperText>
                <FormHelperText>{errors.error ?? ''}</FormHelperText>
            </FormControl>

            <Stack spacing={1}>
                <Stack direction={'row'} spacing={3} alignItems={'center'}>
                    <Switch
                        checked={data.run === null || data.run === false || data.run == 0 ? false : true}
                        color="primary"
                        edge="start"
                        name="run"
                        onChange={changeInput}
                        value={data.run}
                        inputProps={{'aria-label': 'controlled'}}
                        error={errors.run ?? false}
                    />
                    <Typography>Run miner</Typography>
                </Stack>

                <FormHelperText
                    error={errors.run}>{errors.run ?? ''}</FormHelperText>
            </Stack>


            <Button type={'submit'} disabled={processing} variant={'contained'}>{editMode ? 'Update' : 'Add'}</Button>
        </Stack>
    </form>);
}
