import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: any;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
  console.log("🔥 Full error raw object:", error);
  console.log("🔥 Full errorInfo:", errorInfo);
  alert("App crashed. Check the browser console for raw error logs.");
  this.setState({ error, errorInfo });
}


  render() {
    const { error, errorInfo } = this.state;

    if (error) {
      return (
        <div style={{ padding: "2rem", color: "red", fontFamily: "monospace" }}>
          <h1>App crashed.</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
          <pre>{error?.message}</pre>
          <pre>{error?.stack}</pre>
          <pre>{errorInfo?.componentStack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
