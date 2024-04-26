import Select, { StylesConfig, OnChangeValue } from 'react-select';
import { useFilterByUsers } from '../../../features';

type OptionType = { label: string; value: string };

type Props = {
    setSelectedUsers: (options: OptionType[]) => void;
};

const FilterSelect = ({ setSelectedUsers }: Props) => {
    const { usersData } = useFilterByUsers();

    const handleChange = (selectedOption: OnChangeValue<OptionType, true>) => {
        const options = selectedOption as OptionType[];
        setSelectedUsers(options);
    };

    const customStyles: StylesConfig<OptionType> = {
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
            options={usersData}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;
