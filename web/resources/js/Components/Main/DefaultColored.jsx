import {Typography} from "@mui/material";

export function DefaultColored({children, sx, ...props}) {
    return (<Typography
        sx={{
            color: "#2C2C2C",
            ...sx,
        }} fontWeight={'medium'} letterSpacing={0}
        {...props}
    >
        {children}
    </Typography>);
}
