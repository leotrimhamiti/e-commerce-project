import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { Navigate } from 'react-router-dom';

function Login({ loggedIn, setLoggedIn }) { // Receive the prop here
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  
  const navigate = useNavigate();

  if (loggedIn) {
    return <Navigate to="/"/>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError(""); // Clear previous errors

    // 1. Pull the "database" from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // 2. Find if a user matches BOTH email (or username) and password
    const validUser = existingUsers.find(
        (u) => (u.email === username || u.username === username) && u.password === password
    );

    if (validUser) {
        // 3. Create the session token
        localStorage.setItem('accessToken', "mock_jwt_" + Date.now());
        
        // 4. Store the logged-in user's data for the Profile page
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        
        // 5. Update global state in App.jsx
        setLoggedIn(true); 
        
        // 6. Redirect
        navigate('/');
    } else {
        setServerError("Invalid email or password.");
    }

    
  };

  

  return (
    <div className="login-content">
      <h1 className="login-h1">LOG IN</h1>
      {serverError && <p style={{ color: 'red', textAlign: 'center' }}>{serverError}</p>}
      
      <form onSubmit={handleSubmit}>
        <p>Email:</p>
        <input 
          placeholder='Type email'
          type="text" 
          value={username} 
          required 
          onChange={(e) => setUsername(e.target.value)} 
          autoComplete="username"
        />
        
        <p>Password:</p>
        <input 
          placeholder='Type password'
          type="password" 
          value={password} 
          required 
          onChange={(e) => setPassword(e.target.value)} 
          autoComplete="current-password"
        />

        <button className="log-in-btn" type='submit'>Log in</button>
        <p>Don't have an account? <Link to='/signup'><b>Sign up</b></Link></p>
      </form>
    </div>
  );
}

export default Login;