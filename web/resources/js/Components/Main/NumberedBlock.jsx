import {ArrowDown} from "@untitled-ui/icons-react";
import {KeyboardArrowDownRounded} from "@mui/icons-material";

export function NumberedBlock({number, text, showArrow = false}) {
    return (<>
        <div className="numbered-block">
            <div className="numbered-block__number">{number}</div>
            <div className="numbered-block__text">{text}</div>
            {showArrow ?
                <div className="numbered-block__bottom-arrow"><KeyboardArrowDownRounded
                    sx={{
                        width: '100%',
                        height: '100%',
                        fontSize: '1.4375rem',
                        color: '#FFA200'
                    }}/>
                </div> : null}
        </div>
    </>);
}
