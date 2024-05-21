export default function UserLogin() {
    return (
        <section className="userLoginContainer">
          <div>
            <h1>Welcome Back!</h1>
            <form className="userLoginForm">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
              <div className="rememberForgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </section>
    );
}
