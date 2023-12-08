import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

interface ITable {
  data: any;
  columns: ColumnDef<any, any>[];
  noDataMessage?: string | null;
  showAddButton?: boolean;
  buttonAction?:()=>void
}

export const Table = ({
  data,
  columns,
  noDataMessage,
  showAddButton = false,
  buttonAction
}: ITable) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className='border-b-[3px] border-neutral-100 pb-7'>
      <table className='min-w-full'>
        <thead className='bg-white '>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='border-y-[3px] border-x  border-neutral-100'
            >
              {headerGroup.headers.map((header) => (
                <th
                  scope='col'
                  key={header.id}
                  className=' px-6 py-4 text-left text-sm font-bold text-gray-800  tracking-wider'
                  style={{
                    position: "relative",
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "flex cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                      }[header.column.getIsSorted() as string] ?? null}
                     
                    </div>
                  )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    ></div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {noDataMessage ? (
            <tr>
              <td
                className='p-4 font-semibold text-center text-red-500'
                colSpan={columns.length}
              >
                {noDataMessage}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-neutral-50"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showAddButton &&
      <button className="text-gray-500 text-sm underline pt-7 pl-5" onClick={buttonAction}>
        Add code / product
      </button>
      }
    </div>
  );
};
