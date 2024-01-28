import {Badge, IconButton, SvgIcon, Tooltip} from "@mui/material";
import {Moon01, Sun} from "@untitled-ui/icons-react";
import {useTheme} from "@mui/material/styles";
import {useSettings} from "@/hooks/use-settings";

export default function ThemeSwitcher() {
    const theme = useTheme();
    const settings = useSettings();

    const changeTheme = () => {
        settings.handleUpdate({paletteMode: theme.palette.mode === 'dark' ? 'light' : 'dark'});
        if (theme.palette.mode !== 'dark') {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    };

    return (<>
        <Tooltip title="Notifications">
            <IconButton onClick={changeTheme}>
                <SvgIcon>
                    {theme.palette.mode === 'dark' ? <Sun/> : <Moon01/>}
                </SvgIcon>
            </IconButton>
        </Tooltip>
    </>);
}
