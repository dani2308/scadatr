import React, {useEffect} from "react";
import './LoginForm.css';
import { FaUser, FaLock} from "react-icons/fa";
import scadatr_logo from '../../assets/scadatr_logo.png';

const LoginForm = () => {
    useEffect(() => {
        document.body.classList.add('login-form-page');

    return () => {
        document.body.classList.remove('login-form-page');
    };
    }, []);


  return (
    <div className='wrapper'>
        <form action="">
            <img src={scadatr_logo} alt="Logo" className="logo" /> 
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Utilizador" required />
                <FaUser className='icon' />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Palavra-Passe" required />
                <FaLock className='icon' />
            </div>

            <div className="remember-me">
                <label>
                    <input type="checkbox" /> Mantenha a sessão iniciada 
                </label>
            </div>

            <button type="submit">Login</button>

            <div className="forgot-password">
                <a href="#">Esqueceu-se da Palavra-Passe?</a>
            </div>

        </form>
    </div>
  );
}

export default LoginForm;