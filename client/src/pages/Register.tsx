import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import styles from '../styles/register.module.css'
import logo from '../assets/todo-.png'
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [error, setError]= useState('')

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    
      setError('');
      const result = await registerUser(email, password);
    
      if (result.success) {
        alert(result.message);
        navigate('/login');
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
        <div className={styles.regContainer}>
          <h1>Register</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <Stack spacing={2}>
              <Input size="lg" 
                     value={email}
                     required
                     placeholder="Email"
                     onChange={(e) => setEmail(e.target.value)}
              />    
              <Input size="lg" 
                      placeholder="Password" 
                      required
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
              /> 
              <Input size="lg" 
                      placeholder="Confirm Password" 
                      required
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
              />          
            </Stack>
            {error && <p style={{color:'red', fontSize:'12'}}>{error}</p>}
            <button type='submit' className={styles.RegButton}>Sign Up</button>
          </form>
          <div className={styles.LogHolder}>
            <p>Already have an account?</p>
            <Link className={styles.regLink} to='/Login'>Login</Link>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Register