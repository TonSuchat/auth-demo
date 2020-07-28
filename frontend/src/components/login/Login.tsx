import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginType = {
  onLogin: (data: Record<string, any>) => void;
  error?: string;
};

const Login: React.FC<LoginType> = ({ onLogin, error }) => {
  const onSubmit = (data: Record<string, any>) => onLogin(data);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form className="box" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="title has-text-centered has-text-black">
                  Login
                </h3>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      name="username"
                      type="text"
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      name="password"
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                {error && (
                  <div className="field">
                    <label className="has-text-danger">{error}</label>
                  </div>
                )}
                <div className="field">
                  <div className="control">
                    <input
                      type="submit"
                      disabled={!isValid}
                      className="button is-primary is-fullwidth"
                      value="Login"
                    />
                  </div>
                </div>
                <Link to="/register">Register</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
