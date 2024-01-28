import {Button} from "@mui/material";
import {Save} from "@mui/icons-material";

export function SaveBtn({children, ...props}) {
    return <Button type={'submit'} color={'success'} size={'large'} startIcon={<Save/>}
                   variant={'contained'} {...props}>{children ?? 'Save'}</Button>
}
