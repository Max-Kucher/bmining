import {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Stack,
    SvgIcon,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import {Stop} from "@mui/icons-material";
import toast from "react-hot-toast";
import {Edit01} from "@untitled-ui/icons-react";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice";
import {RouterLink} from "@/components/router-link";
import {useForm} from "@/helpers/general";

export const AccountSecuritySettings = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const currentUser = useSelector(selectUser);
    const {data, setData, put, errors, processing, recentlySuccessful} = useForm({
        password: '',
        password_confirmation: '',
    });

    const user = useSelector(selectUser);

    const submit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        put(route('api.password.update'));
    };


    const handleEdit = useCallback(() => {
        setIsEditing((prevState) => !prevState);
    }, []);

    useEffect(() => {
        if (recentlySuccessful === true) {
            toast.success('Password changed');
        }
    }, [recentlySuccessful]);


    return (<Stack spacing={4}>
        <Card>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        xs={12}
                        md={4}
                    >
                        <Typography variant="h6">
                            Change password
                        </Typography>
                    </Grid>
                    <Grid
                        xs={12}
                        sm={12}
                        md={8}
                    >
                        <form onSubmit={submit}>

                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={3}
                            >
                                <input style={{display: 'none'}} type="text" name={'email'} value={user.email}/>
                                <TextField
                                    value={data.password ?? ''}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            password: e.target.value,
                                            password_confirmation: e.target.value,
                                        });
                                    }}
                                    disabled={!isEditing}
                                    label="Password"
                                    error={errors.password}
                                    helperText={errors.password}
                                    type="password"
                                    defaultValue="Thebestpasswordever123#"
                                    sx={{
                                        flexGrow: 1, ...(!isEditing && {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderStyle: 'dotted'
                                            }
                                        })
                                    }}
                                />
                                <Button type={'button'}
                                        onClick={handleEdit}>
                                    <Edit01/>
                                </Button>
                                <Button disabled={processing || !isEditing} type={'submit'}
                                >
                                    Save
                                </Button>
                            </Stack>
                        </form>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <Card>
            <CardHeader title="Multi Factor Authentication"/>
            <CardContent sx={{pt: 0}}>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        xs={12}
                        sm={6}
                    >
                        <Card
                            sx={{height: '100%'}}
                            variant="outlined"
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'block', position: 'relative'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            '&::before': {
                                                backgroundColor: currentUser.tfa_enabled ? 'success.main' : 'error.main',
                                                borderRadius: '50%',
                                                content: '""',
                                                display: 'block',
                                                height: 8,
                                                left: 4,
                                                position: 'absolute',
                                                top: 7,
                                                width: 8,
                                                zIndex: 1
                                            }
                                        }}
                                    >
                                        <Typography
                                            color={currentUser.tfa_enabled ? 'success' : 'error'}
                                            sx={{pl: 3}}
                                            variant="body2"
                                        >
                                            {currentUser.tfa_enabled ? 'On' : 'Off'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography
                                    sx={{mt: 1}}
                                    variant="subtitle2"
                                >
                                    Authenticator App
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{mt: 1}}
                                    variant="body2"
                                >
                                    Use an authenticator app to generate one time security codes.
                                </Typography>
                                <Box sx={{mt: 4}}>
                                    <Button
                                        component={RouterLink}
                                        to={'/settings/tfa'}
                                        endIcon={(<SvgIcon>
                                            {!currentUser.tfa_enabled ? <ArrowRightIcon/> : <Stop/>}
                                        </SvgIcon>)}
                                        variant="contained"
                                    >
                                        {!currentUser.tfa_enabled ? 'Set Up' : 'Disable'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        {/*<Card>*/}
        {/*  <CardHeader*/}
        {/*    title="Login history"*/}
        {/*    subheader="Your recent login activity"*/}
        {/*  />*/}
        {/*  <Scrollbar>*/}
        {/*    <Table sx={{ minWidth: 500 }}>*/}
        {/*      <TableHead>*/}
        {/*        <TableRow>*/}
        {/*          <TableCell>*/}
        {/*            Login type*/}
        {/*          </TableCell>*/}
        {/*          <TableCell>*/}
        {/*            IP Address*/}
        {/*          </TableCell>*/}
        {/*          <TableCell>*/}
        {/*            Client*/}
        {/*          </TableCell>*/}
        {/*        </TableRow>*/}
        {/*      </TableHead>*/}
        {/*      <TableBody>*/}
        {/*        {loginEvents.map((event) => {*/}
        {/*          const createdAt = format(event.createdAt, 'HH:mm a MM/dd/yyyy');*/}

        {/*          return (*/}
        {/*            <TableRow*/}
        {/*              key={event.id}*/}
        {/*              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
        {/*            >*/}
        {/*              <TableCell>*/}
        {/*                <Typography variant="subtitle2">*/}
        {/*                  {event.type}*/}
        {/*                </Typography>*/}
        {/*                <Typography*/}
        {/*                  variant="body2"*/}
        {/*                  color="body2"*/}
        {/*                >*/}
        {/*                  on {createdAt}*/}
        {/*                </Typography>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                {event.ip}*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                {event.userAgent}*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*          );*/}
        {/*        })}*/}
        {/*      </TableBody>*/}
        {/*    </Table>*/}
        {/*  </Scrollbar>*/}
        {/*</Card>*/}
    </Stack>);
};

AccountSecuritySettings.propTypes = {
    loginEvents: PropTypes.array.isRequired
};
