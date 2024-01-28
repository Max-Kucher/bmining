import {Alert, Snackbar} from "@mui/material";

export default function SuccessSavedAlert({open, text = null, vertical = 'top', horizontal = 'center'}) {
    return (<Snackbar open={open} autoHideDuration={0} anchorOrigin={{vertical, horizontal}}>
        <Alert variant="standard" severity="success">
            {text ?? 'Changes saved'}
        </Alert>
    </Snackbar>);
}
