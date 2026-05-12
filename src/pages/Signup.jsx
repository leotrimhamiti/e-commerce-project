import { useState } from 'react';
import '../css/Signup.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'


function Signup({loggedIn, setLoggedIn}) {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;


    

    const handleSignUp = (e) => {
       e.preventDefault();
    if (usernameError || emailError || passwordError || confirmPasswordError) return;

    const newUser = { username, email, password };
    
    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    

    if (existingUsers.some(u => u.email === email || u.username === username)) {
        alert("User already exists!");
        return;
    }

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert("Signup Success!");
    navigate('/login');
    }



    const handleUsername = (e) => {
        setUsername(e.target.value)
         if(e.target.value.length < 8) {
            setUsernameError("Username too short")
        } else {
            setUsernameError("");
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        if(!e.target.value.includes('@')) {
            setEmailError("Email is invalid")
        } else {
            setEmailError("");
        }
    }

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value)
           if(value.length < 8) {
            setPasswordError("Password too short")
        } else if(!symbolRegex.test(value)) {
            setPasswordError("Password doesn't have a symbol")
        } else {
            setPasswordError("");
        }

        if (confirmPassword && value !== confirmPassword) {
        setConfirmPasswordError("Passwords doesn't match");
    } else {
        setConfirmPasswordError("");
    }
       
    }

    const handleConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value)
        if(password !== value) {
            setConfirmPasswordError("Passwords doesn't match")
          } 
            else {
                setConfirmPasswordError("")
            }
        }

        if(loggedIn) {
            return <Navigate to="/"/>
        }
    

    return(
        <div className="signup-content">
            <h1>SIGN UP</h1>
            <form onSubmit={handleSignUp}>
                <p>Username:</p>
                <input type="text" value={username} required placeholder="Type username" onChange={handleUsername}></input>
                {usernameError && <p style={{fontSize:'14px', color: 'red'}}>{usernameError}</p>}
                <p>Email:</p>
                <input type="text" value={email} required placeholder="Type email" onChange={handleEmail}></input>
                {emailError && <p style={{fontSize: '14px', color: 'red'}}>{emailError}</p>}
                <p>Password</p>
                <input type="password" value={password} required placeholder="Type password" onChange={handlePassword}></input>
                {passwordError && <p style={{fontSize: '14px', color:'red'}}>{passwordError}</p>}
                <p>Confirm Password</p>
                <input type="password" value={confirmPassword} required placeholder="Re-type password" onChange={handleConfirmPassword}></input>
                {confirmPasswordError && <p style={{fontSize: '14px', color: 'red'}}>{confirmPasswordError}</p>}
                <button type='submit' className="sign-up-btn">Sign up</button>
                <p>Already have an account? <Link to='/login'><b>Log in</b></Link></p>
                
            </form>
        </div>
    )
} export default Signup;