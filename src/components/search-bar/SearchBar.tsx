import React, { FunctionComponent } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { styles } from "./SearchBarStyles";

interface SearchBarProps extends React.HTMLProps<{}> {
    searchTerm: string;
    onSubmitSearch(): void;
    onSearchValueChange(value: string): void;
}

const SearchBar: FunctionComponent<SearchBarProps> = (
    props: SearchBarProps
): JSX.Element => {
    const classes = styles();
    return (
        <div className={classes.searchBarContainer}>
            <SearchIcon className={classes.searchIcon} />
            <input
                className={classes.searchBarInput}
                placeholder="Search"
                value={props.searchTerm}
                spellCheck={false}
                onBlur={() => props.onSubmitSearch()}
                onChange={e => props.onSearchValueChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
