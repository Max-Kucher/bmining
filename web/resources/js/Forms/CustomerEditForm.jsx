import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormHelperText,
    Stack,
    Switch,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import {wait} from '@/utils/wait';
import {Link, useForm} from "@inertiajs/react";
import SuccessSavedAlert from "@/Components/SuccessSavedAlert";
import AutocompleteInputAdd from "@/Components/Inputs/AutocompleteInputAdd";
import {useEffect} from "react";

export const CustomerEditForm = ({customer, availableStatuses = []}) => {

    const {data, setData, patch, errors, processing, recentlySuccessful, nowSuccessful} = useForm({
        ...customer, password: '',
        email_verified_at: customer.email_verified_at ? true : false,
    });
    const mapStatuses = (items) => {
        return items.map((item) => {
            return {
                title: item
            };
        });
    };

    useEffect(() => {
        setData({
            ...customer, password: '',
            email_verified_at: customer.email_verified_at ? true : false,
        });
    }, [customer]);

    const changeInput = (e) => {
        if (e.target.name == 'tariff') {
            setData({
                ...data, [e.target.name]: {
                    id: e.target.value,
                }, tariff_id: e.target.value,
            });
        } else if (e.target.name == 'email_verified_at') {
            // console.log(e.target.checked);
            setData({
                ...data, [e.target.name]: e.target.checked ? true : false,
            })
        } else {
            setData({
                ...data, [e.target.name]: e.target.value,
            })
        }
    };
    const submit = (e) => {
        e.preventDefault();
        patch(route('manage.users.update', {id: customer.id}), {
            preserveScroll: true,
        });
    };


    return (<form
        onSubmit={submit}>
        <Card>
            <CardHeader title="Edit Customer"/>
            <CardContent sx={{pt: 0}}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        xs={12}
                        md={6}
                    >
                        <TextField
                            error={!!(errors.name)}
                            fullWidth
                            helperText={errors.name}
                            label="Fist name"
                            name="name"
                            onChange={changeInput}
                            required
                            value={data.name ?? ''}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                    >
                        <TextField
                            error={!!(errors.surname)}
                            fullWidth
                            helperText={errors.surname}
                            label="Last name"
                            name="surname"
                            onChange={changeInput}
                            required
                            value={data.name ?? ''}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                    >
                        <TextField
                            error={!!(errors.email)}
                            fullWidth
                            helperText={errors.email}
                            label="Email address"
                            name="email"
                            onChange={changeInput}
                            required
                            value={data.email ?? ''}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                    >
                        <TextField
                            error={!!(errors.phone)}
                            fullWidth
                            helperText={errors.phone}
                            label="Phone number"
                            name="phone"
                            onChange={changeInput}
                            value={data.phone ?? ''}
                        />
                    </Grid>
                </Grid>
                <Stack
                    divider={<Divider/>}
                    spacing={3}
                    sx={{mt: 3}}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Stack spacing={1}>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                            >
                                Email verified
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Verify customer's mail, or cancel verification
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Switch
                                checked={data.email_verified_at === null || data.email_verified_at === false ? false : true}
                                color="primary"
                                edge="start"
                                name="email_verified_at"
                                onChange={changeInput}
                                value={data.email_verified_at}
                                inputProps={{'aria-label': 'controlled'}}
                                error={errors.email_verified_at ?? false}
                            />
                            <FormHelperText
                                error={errors.email_verified_at}>{errors.email_verified_at ?? ''}</FormHelperText>
                        </Stack>
                    </Stack>
                    <AutocompleteInputAdd
                        label={'User status'} options={mapStatuses(availableStatuses)}
                        value={data.status}
                        setValue={(val) => {
                            let valToSave = val;
                            if (typeof val == 'string') {
                                valToSave = val;
                            } else {
                                valToSave = val.inputValue;
                            }
                            setData({
                                ...data, status: valToSave,
                            });
                        }}
                        name={'status'}
                    />
                </Stack>
            </CardContent>
            <Stack
                direction={{
                    xs: 'column', sm: 'row'
                }}
                flexWrap="wrap"
                spacing={3}
                sx={{p: 3}}
            >
                <Button
                    disabled={processing}
                    type="submit"
                    variant="contained"
                >
                    Update
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    disabled={processing}
                    href={route('manage.users')}
                >
                    Cancel
                </Button>
            </Stack>
        </Card>
        <SuccessSavedAlert open={recentlySuccessful} vertical={'bottom'}/>
    </form>);
};

CustomerEditForm.propTypes = {
    customer: PropTypes.object.isRequired
};
