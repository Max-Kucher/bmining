import {useEffect, useState} from "react";
import splitObject from "@/api/helpers/general";

export default function InputList({
                                      defaultValues, setValues = () => {
    }
                                  }) {
    const [inputs, setInputs] = useState(splitObject(defaultValues));
    const [inputsView, setInputsView] = useState(null);
    const handleChange = (event, itemIdx, inputIndex) => {
        const value = event.target.value;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [itemIdx]: {
                ...prevInputs[itemIdx],
                [inputIndex]: value,
            },
        }));
    };

    const handleAddInput = () => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            '': '',
        }));
    };

    useEffect(() => {
        setValues(inputs);

        let tempView = [];
        inputs.forEach((item) => {
            tempView.push();
        });
        setView();
    }, [inputs])

    return (
        <div>
            <div className='text-white'>
                {JSON.stringify(inputs)}

            </div>
            {inputsView}
            <button onClick={handleAddInput}>Add input</button>
        </div>
    );
}
