import {Box, Stack, SvgIcon, Typography} from "@mui/material";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {RouterLink} from "@/components/router-link";
import {useRouter} from "@/hooks/use-router";

export function TitleNav({title, linkTitle, href = null}) {
    const router = useRouter();


    return (<Stack spacing={3} mb={3}>
        <Stack
            py={3}
            direction="row"
            justifyContent="space-between"
            spacing={4}
        >
            <Stack spacing={1}>
                <Typography variant="h4">
                    {title}
                </Typography>
            </Stack>
        </Stack>
        <Box
            color="text.primary"
            component={RouterLink}
            to={href !== null ? href : router.back()}
            onClick={(e) => {
                if (href === null) {
                    e.preventDefault();
                    router.back();
                }
            }}
            sx={{
                alignItems: 'center', display: 'inline-flex'
            }}
            underline="hover"
        >
            <SvgIcon sx={{mr: 1}}>
                <ArrowLeftIcon/>
            </SvgIcon>
            <Typography variant="subtitle2">
                {linkTitle ?? 'Back'}
            </Typography>
        </Box>
    </Stack>);
}
