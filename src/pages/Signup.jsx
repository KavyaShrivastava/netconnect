import SignUp from "../Components/Authentication/Signup"
import Header from "../Components/Authentication/Header"

const SignUpPage = () => {
    return(
        <div className="flex flex-col items-center justify-center h-screen">
        <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"/>
        <SignUp />
        </div>
    )
        
}

export default SignUpPage