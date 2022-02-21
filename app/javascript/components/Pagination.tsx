import React, {useContext} from "react";
import usePrevious from "../hooks/usePrevious";
import styled from "styled-components";
import ResourceStore from "../actions/resourceStore";
import { TicketContext } from "../application";
import PageButton from "./ComponentLibrary/PageButton";
import { RESOURCE_TYPES } from "../types/types";
import { getResourcePageInfo } from "../utils/displayUtils";

const PaginationWrapper = styled.div`   
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    font-family: 'Verdana, sans-serif';
`;

const VisiblePagesWrapper = styled.div`
    display: flex;
    margin-bottom: 7px;
`;

const Seperator = styled.div`
    display: inline-flex;
`;

interface Props {
    previousText: string,
    nextText: string,
    resourceType: RESOURCE_TYPES
}

// eslint-disable-next-line react/display-name
const Pagination = React.memo(({previousText, nextText, resourceType}: Props) => {
    const { state, dispatch } = useContext(TicketContext);
    const { ticketPageInfo, contactPageInfo, userPageInfo } = state;
    const resourcePageInfo = getResourcePageInfo(resourceType, ticketPageInfo, contactPageInfo, userPageInfo);
    const { currentPage, lastPage, resourceCount } = resourcePageInfo;
    const prevLastPage = usePrevious(lastPage);

    const _currentPage = React.useRef();
    if (_currentPage.current == null) {
        _currentPage.current = currentPage;
    }

    React.useEffect(() => {
        if (currentPage !== _currentPage.current && _currentPage.current != null) {
            dispatch({action_fn: ResourceStore.setResourcePage, page: _currentPage.current, resourceType });
        }
    }, [_currentPage.current, currentPage]);

    const filterPages = (visiblePages, totalPages) => {
        return visiblePages.filter(page => page <= totalPages);
    };

    const  getVisiblePages = (page, total) => {
        if (total < 7) {
            return filterPages([1, 2, 3, 4, 5, 6], total);
        } else {
            if (page % 5 >= 0 && page > 4 && page + 2 < total) {
                return [1,2, page - 1, page, page + 1, total-1, total];
            } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
                return [1,2, total - 3, total - 2, total - 1, total];
            } else {
                return [1, 2, 3, 4, 5, total -1, total];
            }
        }
    };

    const [visiblePages, setVisiblePages] = React.useState(getVisiblePages(null, lastPage));

    const changePage = (page) => {
        const visiblePages = getVisiblePages(page, lastPage);
        setVisiblePages(filterPages(visiblePages, lastPage));
        _currentPage.current = page;
    };

    React.useEffect(() => {
        if (prevLastPage !== lastPage) {
            setVisiblePages(getVisiblePages(null, lastPage));
        }
    }, [lastPage, prevLastPage]);

    return (
        <PaginationWrapper>
            {(lastPage > 1) &&
                <VisiblePagesWrapper>
                    <PageButton
                        onClick={() => {
                            if (currentPage === 1) return;
                            changePage(currentPage - 1);
                        }}
                        key={previousText}
                        disabled={currentPage === 1}
                    >
                        {previousText}
                    </PageButton>
                    {visiblePages.map((page, index, array) => {

                        return (
                            <React.Fragment key={`${page}_o`}>
                                {(array[index - 1] + 2 < page) && <Seperator>...</Seperator>}

                                <PageButton
                                    key={page}
                                    isActive={(page === currentPage)}
                                    onClick={() => changePage(page)}
                                >
                                    {page}
                                </PageButton>
                            </React.Fragment>
                        );
                    })}
                    <PageButton
                        onClick={() => {
                            if (currentPage === lastPage) return;
                            changePage(currentPage + 1);
                        }}
                        key={nextText}
                        disabled={currentPage === lastPage}
                    >
                        {nextText}
                    </PageButton>
                </VisiblePagesWrapper>
            }
            <VisiblePagesWrapper>
                <i>{resourceCount} {resourceType}s found.</i>
            </VisiblePagesWrapper>
        </PaginationWrapper>
    );
});

export default Pagination;