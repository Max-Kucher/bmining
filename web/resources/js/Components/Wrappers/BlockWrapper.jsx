import {Card, CardContent, CardHeader} from "@mui/material";

export default function BlockWrapper({children, title = null, subtitle, sx, ...props}) {
    return (<Card
        sx={{
            boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px!important',
            marginBottom: 8,
            paddingTop: 1,
            ...sx,
        }}
        {...props}
    >
        {title === null ? null : <CardHeader
            title={title}
            subheader={subtitle}
        />}
        <CardContent sx={{pt: 0}}>
            {children}
        </CardContent>
    </Card>);
}
