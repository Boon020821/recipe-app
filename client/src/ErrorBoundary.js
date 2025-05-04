// client/src/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error Boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>系统异常，请刷新页面</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;