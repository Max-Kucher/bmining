import {Avatar, Box, Button, Paper, SvgIcon, Typography} from "@mui/material";
import CheckIcon from "@untitled-ui/icons-react/build/esm/Check";
import {Link} from "@inertiajs/react";

export function StatusPaper({title, text, icon, color, children, button = null}) {
    return (<Paper
        elevation={12}
        sx={{
            p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}
    >
        {icon !== null ? <Avatar
            sx={{
                backgroundColor: color + '.lightest', color: color + '.main', mb: 2
            }}
        >
            <SvgIcon>
                {icon}
            </SvgIcon>
        </Avatar> : null}
        <Typography variant="h5">
            {title}
        </Typography>
        <Typography
            align="center"
            color="text.secondary"
            sx={{mt: 1}}
            variant="body2"
        >
            {text}
        </Typography>
        {children}
        {button !== null ? button : null}
    </Paper>);
}
