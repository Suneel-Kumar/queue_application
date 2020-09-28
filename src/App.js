import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import authMiddleware from './redux/Middleware/authMiddleware';
import AppRoutes from './AppRoutes'

const App = () => {

  const dispatch = useDispatch();
  // const [isLoggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    dispatch(authMiddleware.routGuard());
  }, [])

  const user = useSelector(({ authReducer }) => authReducer.user);

  // setLoggedIn(user ? { email: user.email, uid: user.uid } : false);
  const signOut = () => {
    dispatch(authMiddleware.signOut());
  }

  return (
    <div>
      <div>
        {user && user.displayName && <button onClick={() => signOut()} className="btn btn-primary" style={{ margin: "20px" }}>Logout</button>}
        <AppRoutes user={user} />
      </div>
    </div>
  );
}

export default App;