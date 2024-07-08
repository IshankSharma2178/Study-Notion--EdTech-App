import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import toast from 'react-hot-toast';

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token != null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
