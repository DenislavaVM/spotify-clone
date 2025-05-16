import { useRoutes } from "react-router-dom";
import { appRoutes } from "@/routes/routes";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  const element = useRoutes(appRoutes);

  return (
    <>
      <ErrorBoundary>{element}</ErrorBoundary>
      <Toaster />
    </>
  );
}

export default App;