const SelectBox = ({initialValue, options, handleOptionChange, division}) => {
    const handleChange = (e) => handleOptionChange(e.target.value)
    return (
            <select required className="form-control form-control-sm" onChange={handleChange} value={initialValue}>
                <option disabled value=''>Select {division}</option>
                <option value=''>None</option>
                {options.length > 0 ? options.map((option, i) => (
                    <option value={option.name} key={i}>{option.name}</option>
                )) : <option disabled value=''>No {division}</option>}
            </select>
    );
}
 
export default SelectBox;