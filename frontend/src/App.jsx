import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import StudentContext from "./context/StudentContext";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

function App() {
    return (
        <>
            <StudentContext>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <RouterProvider router={router} />
                </ThemeProvider>
                <Toaster />
            </StudentContext>
        </>
    );
}

export default App;
