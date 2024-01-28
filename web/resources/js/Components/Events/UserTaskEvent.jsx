import {Avatar, Box, ListItemAvatar, ListItemText, Stack, SvgIcon, Typography} from "@mui/material";
import {Person2} from "@mui/icons-material";
import {RouterLink} from "@/components/router-link";

export function UserTaskEvent({event, createdAt}) {
    const notificationContent = JSON.parse(event.content);
    return (
        <>
            <ListItemAvatar sx={{mt: 0.5}}>
                <Avatar src={notificationContent.user.avatar}>
                    <SvgIcon>
                        <Person2/>
                    </SvgIcon>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={(<Box
                    sx={{
                        alignItems: 'center', display: 'flex', flexWrap: 'wrap'
                    }}
                >
                    <Stack>

                        <Typography
                            variant="subtitle2"
                            sx={{mr: 0.5}}
                        >
                            {notificationContent.title}
                        </Typography>
                        <Typography variant="body2" py={1}>
                            {notificationContent.text}
                        </Typography>
                        <Stack direction={'row'} py={1} alignItems={"flex-end"}>
                            <RouterLink
                                to={route('manage.users.show', {id: notificationContent.user.id})}>
                                <Typography variant={'caption'}>
                                    {notificationContent.user.username}
                                </Typography>
                            </RouterLink>
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
