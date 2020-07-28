import React from "react";
import { useForm } from "react-hook-form";

type RegisterType = {
  onRegister: (data: Record<string, any>) => void;
  error?: string;
};

const Register: React.FC<RegisterType> = ({ onRegister, error }) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form className="box" onSubmit={handleSubmit(onRegister)}>
                <h3 className="title has-text-centered has-text-black">
                  Register
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
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      name="confirmpassword"
                      ref={register({
                        required: true,
                        validate: (value) => value === watch("password"),
                      })}
                    />
                  </div>
                  {errors.confirmpassword && (
                    <span className="has-text-danger">Password must match</span>
                  )}
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
                      value="Register"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
