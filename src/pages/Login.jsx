import Header from "../Components/Authentication/Header"
import LogIn from "../Components/Authentication/Login"

const LoginPage = () =>{
    return(
    <>
        <div className="flex flex-col items-center justify-center h-screen m-0">
        <Header heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
        />
        <LogIn/>
        </div>

    </>
    )
}

export default LoginPage