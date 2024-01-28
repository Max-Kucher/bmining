import {KeyboardArrowDownRounded} from "@mui/icons-material";

export function TitledBlockTrans({title, text}) {
    return (
        <div className="titled-block">
            <div className="titled-block__title">{title}</div>
            <div className="titled-block__text">{text}</div>
        </div>
    );
}
