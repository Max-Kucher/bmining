import PropTypes from 'prop-types';
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Stack,
    SvgIcon,
    Switch,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import {alpha} from '@mui/material/styles';
import {useForm, usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
import Lightning01Icon from "@untitled-ui/icons-react/build/esm/Lightning01";
import {Save02, Save03} from "@untitled-ui/icons-react";
import {UpdateAvatarForm} from "@/Forms/Profile/UpdateAvatarForm";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {selectToken, selectUser, updateUser, updateUserProp} from "@/slices/userSlice";
import apiRequest from "@/api/helper";

export const AccountGeneralSettings = (props) => {
    const user = useSelector(selectUser);

    const [errors, setErrors] = useState({});

    const {data: userData, setData: setUserData, patch, processing, recentlySuccessful} = useForm({
        'name': user.name, 'surname': user.surname, 'email': user.email, 'phone': user.phone,
    });
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const submit = (e) => {
        e.preventDefault();
        apiRequest(token).patch('/api/profile', userData)
            .then((response) => {
                if (response.status == 200) {
                    setErrors({});
                    if (response?.data?.user) {
                        dispatch(updateUserProp({
                            user: response.data.user,
                        }));
                    }
                    toast.success('Saved');
                } else if (response.status == 422) {
                    setErrors(response.data.errors);
                } else {
                    toast.error('Cant save user data.');
                }
            });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Profile updated.');
        }
    }, [recentlySuccessful])

    const [emailEditable, setEmailEditable] = useState(true);


    return (<Stack
        spacing={4}
        {...props}>
        <Card>
            <CardContent>


                <Grid container spacing={3}>
                    <Grid xs={12} md={4}>
                        <Typography variant="h6">
                            Basic details
                        </Typography>
                    </Grid>
                    <Grid
                        xs={12}
                        md={8}
                    >
                        <Stack sx={{marginBottom: 4}} spacing={3}>
                            <UpdateAvatarForm avatar={user.avatar}/>
                        </Stack>
                        <form onSubmit={submit}>
                            <Stack spacing={3}>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <TextField
                                        error={errors.name}
                                        helperText={errors.name ?? ''}
                                        defaultValue={userData.name}
                                        name={'name'}
                                        onChange={(e) => setUserData('name', e.target.value)}
                                        label="First Name"
                                        sx={{flexGrow: 1}}
                                    />

                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <TextField
                                        error={errors.surname}
                                        helperText={errors.surname ?? ''}
                                        defaultValue={userData.surname}
                                        label="Last name"
                                        name={'surname'}
                                        onChange={(e) => setUserData('surname', e.target.value)}
                                        sx={{flexGrow: 1}}
                                    />
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <TextField
                                        error={errors.phone}
                                        helperText={errors.phone ?? ''}
                                        defaultValue={userData.phone}
                                        label="Phone number"
                                        name={'phone'}
                                        onChange={(e) => setUserData('phone', e.target.value)}
                                        sx={{flexGrow: 1}}
                                    />
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <TextField
                                        onChange={(e) => setUserData('email', e.target.value)}
                                        defaultValue={userData.email}
                                        disabled={emailEditable}
                                        label="Email Address"
                                        required
                                        sx={{
                                            flexGrow: 1, '& .MuiOutlinedInput-notchedOutline': {
                                                borderStyle: 'dashed'
                                            }
                                        }}
                                    />
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setEmailEditable(!emailEditable);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </Stack>
                            </Stack>
                            <CardActions sx={{justifyContent: 'flex-end', marginTop: 4}}>
                                <Button

                                    type={'submit'}
                                    onChange={submit}
                                    endIcon={(<SvgIcon fontSize="small">
                                        <Save02/>
                                    </SvgIcon>)}
                                    size="large"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </form>

                    </Grid>
                </Grid>

            </CardContent>
        </Card>

        {/*<Card>*/}
        {/*    <CardContent>*/}
        {/*        <Grid*/}
        {/*            container*/}
        {/*            spacing={3}*/}
        {/*        >*/}
        {/*            <Grid*/}
        {/*                xs={12}*/}
        {/*                md={4}*/}
        {/*            >*/}
        {/*                <Typography variant="h6">*/}
        {/*                    Delete Account*/}
        {/*                </Typography>*/}
        {/*            </Grid>*/}
        {/*            <Grid*/}
        {/*                xs={12}*/}
        {/*                md={8}*/}
        {/*            >*/}
        {/*                <Stack*/}
        {/*                    alignItems="flex-start"*/}
        {/*                    spacing={3}*/}
        {/*                >*/}
        {/*                    <Typography variant="subtitle1">*/}
        {/*                        Delete your account and all of your source data. This is irreversible.*/}
        {/*                    </Typography>*/}
        {/*                    <Button*/}
        {/*                        color="error"*/}
        {/*                        variant="outlined"*/}
        {/*                    >*/}
        {/*                        Delete account*/}
        {/*                    </Button>*/}
        {/*                </Stack>*/}
        {/*            </Grid>*/}
        {/*        </Grid>*/}
        {/*    </CardContent>*/}
        {/*</Card>*/}
    </Stack>);
};

AccountGeneralSettings.propTypes = {
    avatar: PropTypes.string.isRequired, email: PropTypes.string.isRequired, name: PropTypes.string.isRequired
};
