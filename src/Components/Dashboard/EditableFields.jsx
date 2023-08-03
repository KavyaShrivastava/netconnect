import { useState, useEffect } from "react"
const EditableField = ({labelName, labelText, defaultValue, onUpdate}) => {

    const [isEditable, setIsEditable] = useState(false);
    const [value, setValue] = useState(null);

    useEffect(() => {
        setValue(defaultValue);
      }, [defaultValue]);
    

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handleInputClick =() => {
        setIsEditable(true)
    }

    const handleInputBlur = () => {
        setIsEditable(false);
        onUpdate(value);
    };

    return(
        <div>
            <label htmlFor= {labelName} className="block text-gray-700 font-bold mb-2">{labelText}</label>
            {isEditable? (
            <input
            type="text"
            id={labelName}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="border border-gray-400 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black"/>
            )
            :
            (<div
                onClick={handleInputClick}
                className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight cursor-pointer"
              >
                {value}
              </div>)}
        </div>
    )



}
export default EditableField