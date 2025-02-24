import { useAuthContext } from '@asgardeo/auth-react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const {
    signIn,
    state: { isAuthenticated }
  } = useAuthContext();

  const [showAlert, setShowAlert] = useState(false);

  // Show the alert only if the user is not authenticated
  if (!isAuthenticated && !showAlert) {
    setShowAlert(true);
  }

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  if (!isAuthenticated) {
    return (
      <section>
        {showAlert && (
          <Alert
            severity="warning"
            onClose={handleAlertClose} // Close alert on click
          >
            Please sign in to access this page
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      </section>
    );
  }

  return children;
};

export default ProtectedRoute;
