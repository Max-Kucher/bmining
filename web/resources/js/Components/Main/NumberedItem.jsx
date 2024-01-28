import {Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export function NumberedItem({number = '01', title, text, dashed = false}) {
    const theme = useTheme();
    return (<>
        <div className={'numbered-item' + (dashed ? ' dashed' : '')}>
            <div className={"numbered-item__label number-circle"}
                 style={{color: theme.palette.primary.dark}}>
                {number}
            </div>
            <div className="numbered-item__title">
                {title}
            </div>
            <div className="numbered-item__text">
                {text}
            </div>
        </div>
    </>);
}
