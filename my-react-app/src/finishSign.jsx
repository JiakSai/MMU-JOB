import Footer from './Footer.jsx';
function FinishSign(){
    return(
        <>
        <section>
            <div className='LoginRegisterTop'><h1 className='logo'>" MMUJOB "</h1> </div>
            <div className="finishSignContainer">
                <div>
                    <h1>Almost done</h1>
                    <p>Fill in this form to complete your account.</p>
                    <form className="finishSignForm">
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
        </section>
        <Footer />
        </>
    )
}
export default FinishSign;