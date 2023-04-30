/* eslint-disable react/jsx-key */
import { observer } from 'mobx-react-lite';
import { useSortBy, useTable } from 'react-table';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import styles from './Table.module.scss';
import { ReactComponent as SortIcon } from '../../Icons/sort.svg';

export const CustomTable = observer(({ columns, data = [], sortBy = [], maxHeight }) => {
  const { t } = useTranslation();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setSortBy } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy,
      },
    },
    useSortBy,
  );

  const handleSortBy = (column) => {
    const desc = column.isSortedDesc === true ? undefined : column.isSortedDesc === false;

    setSortBy([
      {
        id: column.id,
        desc,
      },
    ]);
  };

  return (
    <div className={styles.container} style={{ maxHeight }}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={`${styles.table__row} ${styles.table__headerRow}`}>
              {headerGroup.headers.map((column) => {
                let sort = '';
                let toolTipText = '';
                if (column.canSort && column.isSortedDesc === true) {
                  sort = styles.desc;
                  toolTipText = t('sorting.clickToCancelSorting');
                }
                if (column.canSort && column.isSortedDesc === false) {
                  sort = styles.asc;
                  toolTipText = t('sorting.clickToSortDesc');
                }

                if (column.isSortedDesc === undefined) {
                  toolTipText = t('sorting.clickToSortAsc');
                }

                return (
                  <Tooltip title={toolTipText}>
                    <th
                      {...column.getHeaderProps({
                        style: {
                          minWidth: column.minWidth,
                          width: column.width,
                        },
                      })}
                      className={`${styles.table__header} ${styles.table__cell}`}
                      onClick={() => handleSortBy(column)}
                    >
                      <span>{column.render('Header')}</span>
                      <span className={styles.sortOrder}>
                        {/* <span className={`${styles.triangle} ${sort}`} /> */}
                        <SortIcon />
                      </span>
                    </th>
                  </Tooltip>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={styles.table__row}>
                {row.cells.map((cell) => {
                  return (
                    <td className={styles.table__cell} {...cell.getCellProps()}>
                      <div className={styles.table__cellContent}>{cell.render('Cell')}</div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
