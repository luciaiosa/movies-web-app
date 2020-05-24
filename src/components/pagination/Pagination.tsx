import React, { FunctionComponent, useState } from "react";
import { styles } from "./PaginationStyles";
import { useDispatch } from "react-redux";
import { setPaginationEllipseUpperPagesNumber, setPaginationEllipseLowerPagesNumber, setPaginationSelectedPage } from "@stores/movies";

interface PaginationConfig {
    showPagesNumber: number;
}

interface PagerProps {
    pageNumbers: Array<number>;
    currentPage: number;
    ellipseUpperPagesNumber: number;
    ellipseLowerPagesNumber: number;
    config: PaginationConfig;
    pageSelected(value: number): void;
}

const Pagination: FunctionComponent<PagerProps> = (
    props: PagerProps
): JSX.Element => {
    const { showPagesNumber } = props.config;
    const classes = styles();
    const { currentPage, ellipseUpperPagesNumber, ellipseLowerPagesNumber } = props;
    const [prevButtonDisabled, setPrevButtonDisabled] = useState<string>(
        "disabled"
    );
    const [nextButtonDisabled, setNextButtonDisabled] = useState<string>("");

    const dispatch = useDispatch();

    const setPrevButtonClass = (selectedPage: number) => {
        if (selectedPage === 1) {
            setPrevButtonDisabled("disabled");
        } else {
            setPrevButtonDisabled("");
        }
    };
    const setNextButtonClass = (selectedPage: number) => {
        if (selectedPage === props.pageNumbers.length) {
            setNextButtonDisabled("disabled");
        } else {
            setNextButtonDisabled("");
        }
    };
    const changeSelectedPage = (indexSelected: number): void => {
        dispatch(setPaginationSelectedPage(indexSelected));
        props.pageSelected(indexSelected);
        setPrevButtonClass(indexSelected);
        setNextButtonClass(indexSelected);
    };
    const onUpperEllipseSelect = (): void => {
        dispatch(setPaginationEllipseUpperPagesNumber(ellipseUpperPagesNumber + showPagesNumber));
        dispatch(setPaginationEllipseLowerPagesNumber(ellipseLowerPagesNumber + showPagesNumber));
        changeSelectedPage(ellipseUpperPagesNumber + 1);
    };
    const onLowerEllipseSelect = (): void => {
        dispatch(setPaginationEllipseUpperPagesNumber(ellipseUpperPagesNumber - showPagesNumber));
        dispatch(setPaginationEllipseLowerPagesNumber(ellipseLowerPagesNumber - showPagesNumber));
        changeSelectedPage(
            ellipseUpperPagesNumber - showPagesNumber
        );
    };
    const goToNextPage = (): void => {
        console.log(currentPage);
        console.log(ellipseUpperPagesNumber);
        if (currentPage + 1 > ellipseUpperPagesNumber) {
            dispatch(setPaginationEllipseUpperPagesNumber(ellipseUpperPagesNumber + showPagesNumber));
            dispatch(setPaginationEllipseLowerPagesNumber(
                ellipseLowerPagesNumber + showPagesNumber));
        }
        changeSelectedPage(currentPage + 1);
    };
    const goToPrevPage = (): void => {
        if ((currentPage - 1) % showPagesNumber === 0) {
            dispatch(setPaginationEllipseUpperPagesNumber(ellipseUpperPagesNumber - showPagesNumber));
            dispatch(setPaginationEllipseLowerPagesNumber(
                ellipseLowerPagesNumber - showPagesNumber
            ));
        }
        changeSelectedPage(currentPage - 1);
    };
    const renderPageIncrementButton = () => {
        if (props.pageNumbers.length > ellipseUpperPagesNumber) {
            return (
                <li
                    className={classes.paginationListItem}
                    onClick={onUpperEllipseSelect}
                >
                    &hellip;{" "}
                </li>
            );
        }
    };
    const renderPageDecrementButton = () => {
        if (ellipseLowerPagesNumber >= 1) {
            return (
                <li
                    className={classes.paginationListItem}
                    onClick={onLowerEllipseSelect}
                >
                    &hellip;{" "}
                </li>
            );
        }
    };
    const renderPrevButton = () => {
        if (prevButtonDisabled === "disabled") {
            return (
                <li
                    className={`${classes.disabled} ${classes.paginationListItem}`}
                >
                    &laquo;
                </li>
            );
        } else {
            return (
                <li
                    className={classes.paginationListItem}
                    onClick={() => goToPrevPage()}
                >
                    &laquo;
                </li>
            );
        }
    };
    const renderNextButton = () => {
        if (nextButtonDisabled === "disabled") {
            return (
                <li
                    className={`${classes.disabled} ${classes.paginationListItem}`}
                >
                    &raquo;
                </li>
            );
        } else {
            return (
                <li
                    className={classes.paginationListItem}
                    onClick={() => goToNextPage()}
                >
                    &raquo;
                </li>
            );
        }
    };
    const renderPageNumbers = () => {
        return props.pageNumbers.map((number: number) => {
            if (
                number === currentPage
            ) {
                return (
                    <li
                        key={number}
                        value={number}
                        onClick={event =>
                            changeSelectedPage(
                                Number((event.target as HTMLLIElement).value)
                            )
                        }
                        className={`${classes.active} ${classes.paginationListItem}`}
                    >
                        {number}
                    </li>
                );
            } else if (
                number < ellipseUpperPagesNumber + 1 &&
                number > ellipseLowerPagesNumber
            ) {
                return (
                    <li
                        key={number}
                        value={number}
                        onClick={event =>
                            changeSelectedPage(
                                Number((event.target as HTMLLIElement).value)
                            )
                        }
                        className={classes.paginationListItem}
                    >
                        {number}
                    </li>
                );
            }
        });
    };
    return (
        <div className={classes.center}>
            <ul className={classes.paginationList}>
                {renderPrevButton()}
                {renderPageDecrementButton()}
                {renderPageNumbers()}
                {renderPageIncrementButton()}
                {renderNextButton()}
            </ul>
        </div>
    );
};
export default Pagination;
