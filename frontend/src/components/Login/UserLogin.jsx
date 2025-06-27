"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUserContext } from "../../context/StudentContext";
import { ADMIN_DASHBOARD_ROUTE, PARENT_DASHBOARD_ROUTE, STUDENT_DASHBOARD_ROUTE, TEACHER_DASHBOARD_ROUTE } from "../../router";

const formSchema = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(5).max(30),
});
const UserLogin = () => {
    const { login, setAuthenticated, setToken } = useUserContext();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "test@gmail.com",
            password: "123456789",
        },
    });
    const {
        setError, formState: { isSubmitting },} = form;

    // 2. Define a submit handler.
    async function onSubmit(values) {
        await login(values.email, values.password)
            .then(({status, data}) => {
                if (status === 200) {
                    setToken(data.token)
                    setAuthenticated(true);
                    const {role} = data.user
                    // navigate(redirectToDashboard(role));
                    switch (role) {
                        case 'student':
                        navigate(STUDENT_DASHBOARD_ROUTE);
                            break;
                            case 'admin':
                        navigate(ADMIN_DASHBOARD_ROUTE);
                            break;
                            case 'teacher':
                        navigate(TEACHER_DASHBOARD_ROUTE);
                            break;
                            case 'parent':
                        navigate(PARENT_DASHBOARD_ROUTE);
                            break;
                    }
                }
            })
            .catch(({ response }) => {
                setError("email", {
                    message: response.data.errors.email.join(),
                });
                console.log(response);
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email..." {...field} />
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
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default UserLogin;
