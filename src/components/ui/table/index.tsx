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

export function Table({
  data,
  columns,
  noDataMessage,
}: {
  data: any[];
  columns: ColumnDef<any, any>[];
  noDataMessage?: string | null;
}) {
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
    <div className="border-b-[3px] border-neutral-100 pb-7">
      <table className='min-w-full'>
        <thead className='bg-white '>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-y-[3px] border-x  border-neutral-100">
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
                        // asc: <ArrowUpIcon width={15} />,
                        // desc: <ArrowDownIcon width={15} />,
                      }[header.column.getIsSorted() as string] ?? null}
                      {/* {!header.column.getIsSorted() && (
                        <ChevronUpDownIcon width={15} />
                      )} */}
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
                className='p-4 font-semibold text-center'
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
    </div>
  );
}
