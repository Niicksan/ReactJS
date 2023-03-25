import { useContext } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

const LoginFormKeys = {
    email: 'email',
    password: 'password'
};

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.email]: '',
        [LoginFormKeys.password]: '',
    }, onLoginSubmit);

    return (
        <section
            id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name={LoginFormKeys.email}
                        placeholder="Sokka@gmail.com"
                        value={values[LoginFormKeys.Email]}
                        onChange={changeHandler} />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name={LoginFormKeys.password}
                        placeholder="******"
                        value={values[LoginFormKeys.password]}
                        onChange={changeHandler} />

                    <input type="submit" className="btn submit" value="Login" />

                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};