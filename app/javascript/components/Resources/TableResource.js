import { useTable } from "react-table";
import { TableListingStyled } from "../ComponentLibrary/TableStyles";
import React from "react";
import { PropTypes } from "prop-types";


export const dateFormat = (strDate) => {
    if (strDate == null || strDate.length == 0) {
        return "";
    }
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour12: true,
        hour: 'numeric', minute: 'numeric', second: 'numeric',
    }).format(new Date(strDate));
};


const TableResource = ({data}) => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Heading 1',
                accessor: 'heading1',
            },
            {
                Header: 'Data 1',
                accessor: 'data1',
            },
            {
                Header: 'Heading 2',
                accessor: 'heading2',
            },
            {
                Header: 'Data 2',
                accessor: 'data2',
            },
        ],
        []
    );

    const {
        rows,
        prepareRow
    } = useTable({
        columns,
        data,
    });

    const getColSpan = (row, idx) => {
        let cspanCount = 1;
        let current = idx + 1;
        while (current < row.cells.length && row.cells[current].value == null) {
            cspanCount += 1;
            current += 1;
        }
        return cspanCount;
    };

    // Render the UI for your table
    return (
        <TableListingStyled >
            <tbody>
            {rows.map(
                (row, idx) => {
                    prepareRow(row);
                    return (
                        <tr key={idx} {...row.getRowProps()}>
                            {row.cells.map((cell, i) => {
                                const cspanCount = getColSpan(row, i);
                                return (cell.value !=null) ? <td key={i} colSpan={cspanCount} {...cell.getCellProps()}>{cell.render('Cell')}</td> : null;
                            })}
                        </tr>
                    );}
            )}
            </tbody>
        </TableListingStyled>
    );
};

TableResource.propTypes = {
    data: PropTypes.array
};

export default TableResource;