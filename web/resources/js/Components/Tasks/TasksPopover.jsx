import {format, parseISO} from 'date-fns';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Popover,
    Stack,
    SvgIcon,
    Tooltip,
    Typography
} from '@mui/material';
import {Scrollbar} from '@/Components/scrollbar';
import {Check, FileDownloadDoneRounded} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice";
import {RouterLink} from "@/Components/router-link";

export function TaskItem({event, createdAt}) {
    const user = useSelector(selectUser)
    return (
        <>
            {/*<ListItemAvatar sx={{mt: 0.5}}>*/}
            {/*    <Avatar src={notificationContent.user.avatar}>*/}
            {/*        <SvgIcon>*/}
            {/*            <Person2/>*/}
            {/*        </SvgIcon>*/}
            {/*    </Avatar>*/}
            {/*</ListItemAvatar>*/}
            <ListItemText
                primary={(<Box
                    sx={{
                        alignItems: 'center', display: 'flex', flexWrap: 'wrap'
                    }}
                >
                    <Stack>

                        <Typography
                            variant="h6"
                            sx={{mr: 0.5}}
                        >
                            {event.title}
                        </Typography>
                        <Typography variant="body2" py={1}>
                            {event.description}
                        </Typography>
                        <Stack direction={'row'} py={1} alignItems={"flex-end"}>
                            {event.user_id !== user.id ? <RouterLink
                                to={route('manage.users.show', {id: event.user.id})}>
                                <Typography variant={'caption'}>
                                    {event.user.name}
                                </Typography>
                            </RouterLink> : null}
                        </Stack>

                    </Stack>
                </Box>)}
                secondary={(<Typography
                    color="text.secondary"
                    variant="caption"
                >
                    {createdAt}
                </Typography>)}
                sx={{my: 0}}
            />
        </>
    );
}


const renderContent = (notification) => {
    const createdAt = format(parseISO(notification.created_at), 'MMM dd, h:mm a');
    return (<TaskItem key={notification.id} createdAt={createdAt} event={notification}/>);
};

export const TasksPopover = (props) => {
    const {
        anchorEl, notifications, onClose, onRemoveOne, onMarkDoneOne, open = false, ...other
    } = props;

    const isEmpty = notifications.length === 0;

    return (<Popover
        anchorEl={anchorEl}
        anchorOrigin={{
            horizontal: 'left', vertical: 'bottom'
        }}
        disableScrollLock
        onClose={onClose}
        open={open}
        PaperProps={{sx: {width: 380}}}
        {...other}>
        <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
                px: 3, py: 2
            }}
        >
            <Typography
                color="inherit"
                variant="h6"
            >
                Tasks
            </Typography>
        </Stack>
        {isEmpty ? (<Box sx={{p: 2}}>
            <Typography variant="subtitle2">
                There are no tasks.
            </Typography>
        </Box>) : (<Scrollbar sx={{maxHeight: 400}}>
            <List disablePadding>
                {notifications.map((notification) => (<ListItem
                    divider
                    key={notification.id}
                    sx={{
                        alignItems: 'flex-start', '&:hover': {
                            backgroundColor: 'action.hover'
                        }, '& .MuiListItemSecondaryAction-root': {
                            top: '24%'
                        }
                    }}
                    secondaryAction={(<Tooltip title="Mark as done">
                        <IconButton
                            sx={{
                                background: notification.state == 'new' ? '' : 'sucess.main',
                                '&:hover': {
                                    backgroundColor: 'success.main',
                                    color: 'white',
                                    transition: '0.3s'

                                },
                            }}
                            edge="end"
                            onClick={() => onMarkDoneOne?.(notification.id)}
                            size="small"
                        >
                            <SvgIcon>
                                {
                                    notification.state == 'new' ? <FileDownloadDoneRounded/> : <Check/>
                                }
                                {/*<FileDownloadDoneRounded/>*/}
                            </SvgIcon>
                        </IconButton>
                    </Tooltip>)}
                >
                    {renderContent(notification)}
                </ListItem>))}
            </List>
        </Scrollbar>)}
    </Popover>);
};
