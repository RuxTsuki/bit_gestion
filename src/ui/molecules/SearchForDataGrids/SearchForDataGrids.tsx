
import { Autocomplete, OutlinedInput, TextField, FormControl, InputAdornment, IconButton, Box } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { MeterItemResponse } from '@/models';
import { useDebounce } from '@/customHooks/useDebounce';

import { filterListByInclude } from '@/utils/filterListByInclude';
import './search_for_data_grids.css';

type Props = {
    gridData: MeterItemResponse[],
    valueToFilter: string,
    onSearch: (dataFiltered: MeterItemResponse[]) => void
}

export const SearchForDataGrids = ({ gridData, valueToFilter, onSearch }: Props) => {
    const [searchWord, setSearchWord] = useState('');
    const debouncedValue = useDebounce({ value: searchWord, delay: 430 });

    useEffect(() => {
        const lengthOfQuery = debouncedValue.trim().length;

        if (lengthOfQuery > 0) {
            const listFiltered = filterListByInclude(gridData, valueToFilter, debouncedValue);
            onSearch(listFiltered);
        }

        if (lengthOfQuery === 0)
            onSearch(gridData);

    }, [debouncedValue]);

    const onChangeSearchValue = (ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault(); // Prevent
        setSearchWord(ev.target.value);
    }

    return (
        <div className="search-data-grid-container">

            <FormControl className='search-container' fullWidth variant="outlined">
                <OutlinedInput
                    size="small"
                    id="outlined-adornment-search"
                    type='text'
                    onChange={onChangeSearchValue}
                    placeholder="Search item"
                    startAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="start"
                            >
                                <SearchOutlined />
                            </IconButton>
                        </InputAdornment>
                    }

                />
            </FormControl>

            {/* <Autocomplete
                size="small"
                disablePortal
                className='search-filter'
                id="combo-box-filter"
                onChange={(_: any, newValue: string | null) => {
                    if (newValue)
                        setFilterSearch(newValue);
                }}
                inputValue={filterSearch}
                options={autoCompleteOpts.map(({ title }) => title)}
                renderInput={(params) => <TextField {...params} placeholder="Buscar por" />}
            /> */}
        </div>
    )
}
