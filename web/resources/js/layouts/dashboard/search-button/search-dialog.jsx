import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import {
    Avatar,
    Badge,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    SvgIcon,
    TextField,
    Typography
} from '@mui/material';
import {Tip} from '@/components/tip';
import {manageUserApi} from "@/api/apiMain/manageUsersApi";
import {getInitials} from "@/utils/get-initials";
import {format, parseISO} from "date-fns";
import {OnlyManagerContent} from "@/Components/Wrappers/Permissions/ManagerContent";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import {RouterLink} from "@/components/router-link";

export const SearchDialog = (props) => {
    const {onClose, open = false, ...other} = props;
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [displayUsers, setDisplayUsers] = useState(false);

    const [users, setUsers] = useState([]);
    const token = useSelector(selectToken);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        try {
            let searchState = {
                filters: {
                    query: value,
                }, page: 0, rowsPerPage: 5, sortBy: "updated_at", sortDir: "desc",
            };
            setIsLoading(true);
            const response = await manageUserApi.getUsers({token, searchState});
            setIsLoading(false);
            setDisplayUsers(true);
            setUsers(response.data.users);
        } catch (err) {
            console.error(err);
        }
    }, [value]);

    return (<Dialog
        fullWidth
        maxWidth="sm"
        onClose={onClose}
        open={open}
        {...other}>
        <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={3}
            sx={{
                px: 3, py: 2
            }}
        >
            <Typography variant="h6">
                Search
            </Typography>
            <IconButton
                color="inherit"
                onClick={onClose}
            >
                <SvgIcon>
                    <XIcon/>
                </SvgIcon>
            </IconButton>
        </Stack>
        <DialogContent>
            <Tip message="Search user by email or phone."/>
            <OnlyManagerContent>
                <div style={{
                    padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#ffc145'
                }}>
                    Warning: Only users with exactly the same email or phone number will be displayed!
                </div>
            </OnlyManagerContent>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{mt: 3}}
            >
                <TextField
                    fullWidth
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <SvgIcon>
                                <SearchMdIcon/>
                            </SvgIcon>
                        </InputAdornment>)
                    }}
                    label="Search"
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Search..."
                    value={value}
                />
            </Box>
            {isLoading && (<Box
                sx={{
                    display: 'flex', justifyContent: 'center', mt: 3
                }}
            >
                <CircularProgress/>
            </Box>)}
            {displayUsers && (<Stack
                spacing={2}
                sx={{mt: 3}}
            >
                {users.length === 0 ? <div style={{textAlign: 'center'}}>
                    Users not found
                </div> : null}
                {users.map((user, index) => {
                    const userId = user.id;
                    const lastVisitDate = format(parseISO(user.last_visit), 'dd MMM, yyyy HH:mm:ss');
                    return (<Stack
                        key={index}
                        spacing={2}
                    >
                        <div>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                sx={{
                                    // justifyContent: 'space-between',
                                }}
                            >
                                {user.isOnline ? <Badge
                                    anchorOrigin={{
                                        horizontal: 'right', vertical: 'bottom'
                                    }}
                                    color="success"
                                    variant="dot"
                                >
                                    <Avatar
                                        title={lastVisitDate}
                                        src={user.avatar}
                                        sx={{
                                            height: 42, width: 42
                                        }}
                                    >
                                        {getInitials(user.name)}
                                    </Avatar>
                                </Badge> : <Avatar
                                    title={lastVisitDate}
                                    src={user.avatar}
                                    sx={{
                                        height: 42, width: 42
                                    }}
                                >
                                    {getInitials(user.name)}
                                </Avatar>}
                                <div>
                                    <Box
                                        color="inherit"
                                        sx={{textDecoration: 'none'}}
                                        component={RouterLink}
                                        to={route('manage.users.show', {id: userId})}
                                        variant="subtitle2"
                                    >
                                        {user.name}
                                    </Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {user.email}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Phone: {user.phone}
                                    </Typography>
                                </div>
                                <div style={{
                                    marginLeft: 'auto', marginRight: '0',
                                }}>
                                    <Button variant={'contained'} component={RouterLink}
                                            to={route('manage.users.show', {id: user.id})}>Show</Button>
                                </div>
                            </Stack>
                        </div>
                    </Stack>);
                })}
            </Stack>)}
        </DialogContent>
    </Dialog>);
};

SearchDialog.propTypes = {
    onClose: PropTypes.func, open: PropTypes.bool
};
