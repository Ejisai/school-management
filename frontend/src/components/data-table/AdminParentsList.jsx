import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import ParentApi from "../../services/Api/ParentApi";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { DataTableColumnHeader } from "./DataTableColumnHeader ";
import { MoreHorizontal } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ParentUpsertForm from "../Forms/ParentUpsertForm";

const AdminParentsList = () => {
    const [data, setData] = useState([]);
    const AdminParentsColumns = [
        {
            accessorKey: "id",
            // header: "ID",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="ID" />;
            },
        },
        {
            accessorKey: "firstname",
            // header: "First name",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Firstname" />
                );
                // const isAsc = column.getIsSorted() === "asc";
                // return (
                //     <Button
                //         className={"cursor-pointer"}
                //         variant="ghost"
                //         onClick={() => column.toggleSorting(isAsc)}
                //     >
                //         First name
                //         {isAsc ? (
                //             <ArrowUp className="ml-2 h-4 w-4" />
                //         ) : (
                //             <ArrowDown className="ml-2 h-4 w-4" />
                //         )}
                //     </Button>
                // );
            },
        },
        {
            accessorKey: "lastname",
            // header: "Last name",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Last name" />
                );
            },
        },
        {
            accessorKey: "date_of_birth",
            // header: "Date of Birth",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Date of birth"
                    />
                );
            },
            cell: ({ row }) => {
                const dateString = row.getValue("date_of_birth");
                const formatted = new Date(dateString)
                    .toISOString()
                    .split("T")[0];
                return <span>{formatted}</span>;
            },
        },
        {
            accessorKey: "gender",
            // header: "Gender",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Gender" />;
            },
            cell: ({ row }) => {
                const value = row.getValue("gender");
                const gender = value === "m" ? "Male" : "Female";
                return <>{gender}</>;
            },
        },
        {
            accessorKey: "blood_type",
            // header: "Blood type",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Blood type" />
                );
            },
        },
        {
            accessorKey: "address",
            // header: "Address",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Address" />
                );
            },
        },
        {
            accessorKey: "phone",
            // header: "Phone",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Phone" />;
            },
            cell: ({ row }) => {
                let phone = row.getValue("phone");
                if (phone.startsWith("0")) {
                    phone = phone.slice(1);
                }
                return <>+212-{phone}</>;
            },
        },
        {
            accessorKey: "email",
            // header: "Email",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Email" />;
            },
        },
        {
            accessorKey: "updated_at",
            // header: "Updated at",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Updated at" />
                );
            },
            cell: ({ row }) => {
                const date = row.getValue("updated_at");
                const formattedDate = new Date(date).toLocaleString();
                return <>{formattedDate}</>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const { id, firstname, lastname } = row.original;
                const [openUpdateDialog, setopenUpdateDialog] = useState(false)
                return (
                    <>
                        {/* sheet for editing a parent */}
                        <Sheet open={openUpdateDialog} onOpenChange={setopenUpdateDialog}>
                            <SheetTrigger asChild>
                                <Button className={"cursor-pointer me-2"}
                                    size={"sm"}>Update</Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        Update parent {firstname} {lastname} ?
                                    </SheetTitle>
                                    <SheetDescription>
                                        Make changes to parent {firstname}{" "}
                                        {lastname} Click save when you're done.
                                    </SheetDescription>
                                    <ParentUpsertForm
                                            values={row.original}
                                            handleSubmit={(values) => {
                                        return ParentApi.update(id, values).then((res) => {
                                        setopenUpdateDialog(false);
                                        return res;
                                          });
                                        //   either code works
                                        // const promise = ParentApi.update(id, values)
                                        // promise.then(() => setopenUpdateDialog(false));
                                        // return promise
}}
                                        />
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                        {/* alert for deleting a parent */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className={"cursor-pointer"}
                                    size={"sm"}
                                    variant={"destructive"}
                                >
                                    <Trash />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure to delete{" "}
                                        <span className="font-bold">
                                            {firstname} {lastname}
                                        </span>{" "}
                                        ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className={"cursor-pointer"}
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            const deletingLoader =
                                                toast.loading(
                                                    "Deleting in progress"
                                                );
                                            const {
                                                data: deletedParent,
                                                status,
                                            } = await ParentApi.delete(id);
                                            toast.dismiss(deletingLoader);
                                            if (status === 200) {
                                                setData(
                                                    data.filter(
                                                        (parent) =>
                                                            parent.id !== id
                                                    )
                                                );
                                                toast("Success", {
                                                    description: `Parent ${deletedParent.data.firstname} Parent ${deletedParent.data.lastname} has been deleted successfuly`,
                                                    icon: (
                                                        <span className="text-red-500">
                                                            <Trash />
                                                        </span>
                                                    ),
                                                });
                                            }
                                        }}
                                        className={"cursor-pointer"}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                );
            },
        },
    ];
    useEffect(() => {
        ParentApi.all().then(({ data }) => setData(data.data));
    }, []);

    return (
        <>
            <DataTable columns={AdminParentsColumns} data={data} />
        </>
    );
};

export default AdminParentsList;
