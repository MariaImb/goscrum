import "./Header.styles.css";
import {useNavigate} from "react-router-dom"
import { useSelector} from "react-redux";

//falta cambiar el span por una imagen. <img src="/img/goscrum.png" alt="Logo"/>
export const Header = () => {
    const navigate = useNavigate();

    const { tasks } = useSelector((state) => {
        return state.tasksReducer;
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login", {replace: true})
    }

    return(
        <header>
            <span>Go Scrum</span>
            <div className="wrapper_right_header" >
                <div>Tareas creadas: {tasks?.length}</div>
                <div>{localStorage.getItem("userName")}</div>
                <div onClick={handleLogout}>x</div>
            </div>
        </header>
    )
}