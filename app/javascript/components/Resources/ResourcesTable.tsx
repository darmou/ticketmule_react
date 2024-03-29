import { useTable } from "react-table";
import {
    StyledBodyTableRow,
    TableHeaderStyled,
    TableListingStyled,
    TableWithPagination,
    TRHeaderStyled
} from "../ComponentLibrary/TableStyles";
import Pagination from "../Pagination";
import React from "react";
import { RESOURCE_TYPES } from "../../types/types";

interface Props {
    columns: any,
    data: any,
    isPagination: boolean,
    resourceType: RESOURCE_TYPES;
}

const ResourcesTable = ({columns, data, isPagination, resourceType}: Props) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        autoResetHiddenColumns: false,
        data
    });

    // Render the UI for your table
    return (
        <TableWithPagination>
            <TableListingStyled {...getTableProps()}>
                <TableHeaderStyled>
                    {headerGroups.map((headerGroup, index) => (
                        <TRHeaderStyled key={index} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, idx) => (
                                <th key={idx} {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </TRHeaderStyled>
                    ))}
                </TableHeaderStyled>
                <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, idx) => {
                        prepareRow(row);
                        return (
                            <StyledBodyTableRow key={idx} {...row.getRowProps()}>
                                {row.cells.map((cell, i) => {
                                    return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </StyledBodyTableRow>
                        );}
                )}
                </tbody>
            </TableListingStyled>
            {(isPagination) &&
                <Pagination previousText="<" nextText=">" resourceType={resourceType}/>
            }
        </TableWithPagination>
    );
};

export default ResourcesTable;