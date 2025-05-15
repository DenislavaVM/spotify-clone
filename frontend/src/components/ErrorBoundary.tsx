import { Component, ReactNode } from "react";

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};

type State = {
    hasError: boolean;
    error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        error: undefined,
    };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="p-4 bg-red-100 text-red-700 rounded-md">
                        <h2 className="text-lg font-semibold">Something went wrong</h2>
                        <p>{this.state.error?.message}</p>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;