
import { Autocomplete, OutlinedInput, TextField, FormControl, InputAdornment, IconButton, Box } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { FormEvent } from 'react';
import './search_for_data_grids.css';

export const SearchForDataGrids = ({ gridData, autoCompleteOpts }: { gridData: [], autoCompleteOpts: string[] }) => {

    const onSubmitSearch = (ev: FormEvent) => {
        ev.preventDefault(); // Prevent
        console.log('vaa')
    }

    return (
        <div className="search-data-grid-container">

            <FormControl className='search-container' fullWidth variant="outlined">
                <OutlinedInput
                    size="small"
                    id="outlined-adornment-search"
                    type='text'
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

            <Autocomplete
                size="small"
                disablePortal
                className='search-filter'
                id="combo-box-filter"
                options={autoCompleteOpts}
                renderInput={(params) => <TextField {...params} placeholder="Buscar por" />}
            />
        </div>
    )
}
