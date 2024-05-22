function FinishSign(){
    return(
        <section>
            <nav><h1 className='logo'>" MMUJOB "</h1> </nav>
            <div className="finishSignContainer">
                <div className="finishSignForm">
                        <h1>Almost done</h1>
                        <p>Fill in this form to complete your account.</p>
                    <form>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required />
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required />
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" required />
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" required />
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state" required />
                        <label htmlFor="zip">Zip Code</label>
                        <input type="text" id="zip" name="zip" required />
                        <label htmlFor="country">Country</label>
                        <input type="text" id="country" name="country" required />
                        <button type="submit">Finish</button>
                    </form>
                </div>
            </div>
            <div className='userLoginBottom'>
              <p>Copyright © 2024, MMUJOB LLC. "MMUJOB" and logo are registered trademarks of MMUJOB LLC.</p>
              <p><a href="#">Terms of Use</a> | <a href="#">Privacy & Ad Choices</a></p>
            </div>
        </section>
    )
}
export default FinishSign;