import "./Header.styles.css";
import {useNavigate} from "react-router-dom"

//falta cambiar el span por una imagen. <img src="/img/goscrum.png" alt="Logo"/>
export const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("logged");
        navigate("/login", {replace: true})
    }

    return(
        <header>
            <span>Go Scrum</span> 
            <div onClick={handleLogout}>x</div>
        </header>
    )
}