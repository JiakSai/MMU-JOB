import loginphoto from './photo/ZombieingDoodle.png';

export default function UserLogin() {
    return (
        <section>
          <nav><h1 className='logo'>" MMUJOB "</h1> </nav>
          <div className="userLoginContainer">
                <img src={loginphoto} alt="Login" className='loginIllustration'/>
                <div>
                  <p className='changeSite'>Are you an employer?</p>
                  <div className='userLoginFormContainer'>
                    <h1>Welcome Back!</h1>
                    <p>Please login to your account</p>
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
                      <p className='toRegister'>Do you have an account? <a href="#">Register</a></p>
                    </form>
                  </div>
                </div>
          </div>
            <div className='userLoginBottom'>
              <p>Copyright © 2024, MMUJOB LLC. "MMUJOB" and logo are registered trademarks of MMUJOB LLC.</p>
              <p><a href="#">Terms of Use</a> | <a href="#">Privacy & Ad Choices</a></p>
            </div>
        </section>
    );
}
