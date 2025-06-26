import { Input } from "@/components/ui/input";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
      getPaginationRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { DataTablePagination } from "./DataTablePagination ";
import { DataTableViewOptions } from "./DataTableViewOptions ";

export function DataTable({ columns, data }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
            getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="rounded-md border">
            <div className="flex items-center justify-between py-4 px-4">
                {/* Filter Input - stays on the left */}
                <Input
                    placeholder="Filter emails..."
                    value={table.getColumn("email")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                {/* Columns Dropdown */}
                    <DataTableViewOptions table={table} />
            </div>

            {/* table */}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                <div className="inline-flex items-center justify-center gap-2">
                                    Loading
                                    <Loader2 className="animate-spin" />
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination table={table} />

        </div>
        // filter
        // <div className="rounded-md border">
        //     <div className="flex items-center py-4">
        //         <Input
        //             placeholder="Filter emails..."
        //             value={table.getColumn("email")?.getFilterValue() ?? ""}
        //             onChange={(event) =>
        //                 table
        //                     .getColumn("email")
        //                     ?.setFilterValue(event.target.value)
        //             }
        //             className="max-w-sm"
        //         />
        //     </div>
        //     {/* dropdown menu */}
        //     <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="outline" className="ml-auto">
        //       Columns
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     {table
        //       .getAllColumns()
        //       .filter(
        //         (column) => column.getCanHide()
        //       )
        //       .map((column) => {
        //         return (
        //           <DropdownMenuCheckboxItem
        //             key={column.id}
        //             className="capitalize"
        //             checked={column.getIsVisible()}
        //             onCheckedChange={(value) =>
        //               column.toggleVisibility(!!value)
        //             }
        //           >
        //             {column.id}
        //           </DropdownMenuCheckboxItem>
        //         )
        //       })}
        //   </DropdownMenuContent>
        // </DropdownMenu>
        // {/* table */}
        //     <Table>
        //         <TableHeader>
        //             {table.getHeaderGroups().map((headerGroup) => (
        //                 <TableRow key={headerGroup.id}>
        //                     {headerGroup.headers.map((header) => {
        //                         return (
        //                             <TableHead key={header.id}>
        //                                 {header.isPlaceholder
        //                                     ? null
        //                                     : flexRender(
        //                                           header.column.columnDef
        //                                               .header,
        //                                           header.getContext()
        //                                       )}
        //                             </TableHead>
        //                         );
        //                     })}
        //                 </TableRow>
        //             ))}
        //         </TableHeader>
        //         <TableBody>
        //             {table.getRowModel().rows?.length ? (
        //                 table.getRowModel().rows.map((row) => (
        //                     <TableRow
        //                         key={row.id}
        //                         data-state={row.getIsSelected() && "selected"}
        //                     >
        //                         {row.getVisibleCells().map((cell) => (
        //                             <TableCell key={cell.id}>
        //                                 {flexRender(
        //                                     cell.column.columnDef.cell,
        //                                     cell.getContext()
        //                                 )}
        //                             </TableCell>
        //                         ))}
        //                     </TableRow>
        //                 ))
        //             ) : (
        //                 <TableRow>
        //                     <TableCell
        //                         colSpan={columns.length}
        //                         className="h-24 text-center"
        //                     >
        //                         <div className="inline-flex items-center justify-center gap-2">
        //                             Loading
        //                             <Loader2 className="animate-spin" />
        //                         </div>
        //                     </TableCell>
        //                 </TableRow>
        //             )}
        //         </TableBody>
        //     </Table>
        // </div>
    );
}
