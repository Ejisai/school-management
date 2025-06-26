import { Button } from "@/components/ui/button";import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"

const formSchema = z.object({
    firstname: z.string().max(50),
    lastname: z.string().max(50),
    date_of_birth: z.string(),
    gender: z.string().max(1),
    blood_type: z.string(),
    address: z.string().max(255),
    phone: z.string().max(255),
    email: z.string().email().min(2).max(30),
    password: z.string().min(3).max(30),
});

const ParentUpsertForm = ({handleSubmit, values}) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {}
    });
    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;
    const isUpdate = values !== undefined;
    async function onSubmit(values) {
        const loaderMsg = isUpdate ? "Updating in progress" : 'Adding parent'
        const loader = toast.loading(loaderMsg);
        await handleSubmit(values).then(
            ({ status, data }) => {
                if (status === 200) {
                   toast.success(data.message)
                    reset();
                }
            })
            .catch(({ response }) => {
                Object.entries(response.data.errors).forEach((error) => {
                    const [fieldName, errorMessages] = error;
                    setError(fieldName, {
                        message: errorMessages.join(),
                    });
                })
            }).finally(() => {
    toast.dismiss(loader);
  });
    }
    return (
        <div className="mt-7">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="First name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date_of_birth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of birth</FormLabel>
                                <FormControl>
                                    <Input
                                        type={"date"}
                                        placeholder="Date of birth"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col"
                                    >
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="m" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Male
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="f" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Female
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="blood_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Blood Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="cursor-pointer">
                                            <SelectValue placeholder="Select a Blood Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {[
                                            "O+",
                                            "O-",
                                            "A+",
                                            "A-",
                                            "B+",
                                            "B-",
                                            "AB+",
                                            "AB-",
                                        ].map((bloodType, key) => (
                                            <SelectItem
                                                key={key}
                                                value={bloodType}
                                            >
                                                {bloodType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Address"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Phone number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input
                                        type={"password"}
                                        placeholder="Password..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="cursor-pointer"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {isSubmitting && (
                            <Loader className="animate-spin me-1" />
                        )}{" "}
                        {isUpdate ? 'Update' : 'Create'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ParentUpsertForm;
