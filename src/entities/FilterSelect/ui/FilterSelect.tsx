import Select, { StylesConfig } from 'react-select';

const mockOptions = [
    { label: 'User1', value: 'User1' },
    { label: 'User2', value: 'User2' },
    { label: 'User3', value: 'User3' },
    { label: 'User4', value: 'User4' },
];

const FilterSelect = () => {
    const customStyles: StylesConfig = {
        container: (styles) => ({
            ...styles,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px',
        }),
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '700px',
            minWidth: '300px',
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '700px',
            minWidth: '300px',
        }),
        option: (styles) => ({ ...styles }),
        input: (styles) => ({ ...styles }),
        placeholder: (styles) => ({ ...styles }),
    };
    return (
        <Select
            isMulti
            name="users"
            options={mockOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
        />
    );
};

export default FilterSelect;
