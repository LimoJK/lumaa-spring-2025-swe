import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/login.module.css'
import logo from '../assets/todo-.png'
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Link } from 'react-router-dom';


const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError]=useState('')
      const { setToken } = useContext(AuthContext)!;
      const navigate = useNavigate();

      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const result = await loginUser(email, password);
      
        if (result.success && result.token) {
          setToken(result.token);
          alert('Login successful!');
          navigate('/tasks');
        } else {
          setError(result.message); 
        }
      };
      
      
  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <div className={styles.logoCont}>
          <img src={logo} alt='logo' className={styles.logo}/>
          <h2>ToDo</h2>
        </div>
        <div className={styles.loginContainer}>
          <h1>Log In</h1>
          <form className={styles.form} onSubmit={handleLogin}>
            <Stack spacing={2}>
              <Input size="lg" 
                     required
                     value={email}
                     placeholder="Email"
                     onChange={(e) => setEmail(e.target.value)}
              />    
              <Input size="lg" 
                      placeholder="Password" 
                      required
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
              />          
            </Stack>
            <button type='submit' className={styles.loginButton}>Log In</button>
            <p className={styles.pText}>Forgot Password?</p>
          </form>
          <div className={styles.regHolder}>
            <p>Don't have an account?</p>
            <Link className={styles.regLink} to='/Register'>Register</Link>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Login
