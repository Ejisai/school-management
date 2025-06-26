import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUserContext } from "../../context/StudentContext";
const StudentDashboard = () => {
    const { user}= useUserContext()

  return (
    <Table className="caption-top">
                    <TableCaption className="text-left mb-4">
                        A list of your informations.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">
                                Creation date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                {user?.id}
                            </TableCell>
                            <TableCell>{user?.name}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell className="text-right">
                                {user?.created_at
                                    ? new Date(user.created_at).toLocaleString()
                                    : "Loading..."}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
  )
}

export default StudentDashboard
