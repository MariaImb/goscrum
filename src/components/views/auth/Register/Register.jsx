import {useNavigate, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Switch, FormControlLabel} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import "../Auth.styles.css";

const {REACT_APP_API_ENDPOINT} = process.env

export const Register = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()

    useEffect (()=>{
        console.log(process.env);
            // fetch("https://goscrum-api.alkemy.org/auth/data")
        fetch (`${REACT_APP_API_ENDPOINT}auth/data`)
            .then(response => response.json()) 
            .then(data => setData(data.result))
    }, [])

    
   

    const initialValues = {
        userName: "",
        password: "",
        email: "",
        teamID: "",
        role: "",
        continent: "",
        region: "",
        switch: false,
    }

    const required = "* Campo obligatorio"

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .min(4, "La cantidad minima de caracteres es 4")
            .required(required),
        password: Yup.string().required(required),
        email: Yup.string().email("debe ser un email válido").required(required),
        role: Yup.string().required(required),
        continent: Yup.string().required(required),
        region: Yup.string().required(required),
        // priority: Yup.string().required(required)
    }) 

    const handleChangeContinent = value => {
        setFieldValue('continent', value)
        if (value !== "America") setFieldValue('region', "Otro")
        }
    
    // si teamID esta vacio es decir que hay que generar un id utilizo el siguiente ternario
    
    const onSubmit = () => {//e
        const teamID = !values.teamID ? uuidv4() : values.teamID;
        // alert();
        console.log({values})
    
        // fetch para comunicarnos con el servidor

        // fetch(`${REACT_APP_API_ENDPOINT}auth/data`, {
        fetch("https://goscrum-api.alkemy.org/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify ({
                user: {
                    userName: values.userName,
                    password: values.password,
                    email: values.email,
                    teamID: values.teamID,
                    role: values.role,
                    continent: values.continent,
                    region:values.region,
                },
            })
        })
                .then(response => response.json())
                .then(data=>navigate ("/registered/" + data?.result?.user?.teamID, {
                    replace: true,
                }))
        
    }
    const formik = useFormik ({initialValues, validationSchema, onSubmit})

    const { handleSubmit, handleChange, setFieldValue, touched, handleBlur, values, errors} = formik

    console.log(errors)
    
    return(
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div>
                    <label>Nombre de usuario</label>
                    <input 
                        name="userName" 
                        type="text" 
                        value={values.userName} 
                        onChange={handleChange}
                        onBlur={handleBlur}                     
                        className={errors.userName && touched.userName ? "error" : ""}
                    />
                    {errors.userName && touched.userName && <span className="error-message">{errors.userName}</span>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input 
                        name="password" 
                        type="password" 
                        value={values.password} 
                        onChange={handleChange}
                        onBlur={handleBlur}                     
                        className={errors.password && touched.password? "error" : ""}
                    />
                    {errors.password && touched.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        value={values.email} 
                        onChange={handleChange}
                        onBlur={handleBlur}                     
                        className={errors.email? "error" : ""}
                    />
                    {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
                </div>
                {/* creo un switch con material ui que va a ser un booleano hay que agregarlo en los valores iniciales del formulario*/}
                <FormControlLabel 
                    control={
                        <Switch       
                            value={values.switch}
                            onChange={()=> formik.setFieldValue ("switch", !formik.values.switch)
                            }
                            name="switch"
                            color="secondary"
                        />} 
                    label="Pertenezco a un equipo ya creado"
                />
                {/* input de teamID */}
                {/* Escribo una logica donde si no se pertenece a un equipo creado no se deberia mostrar el input de ingreso del identificador, si no que deberia ser generado por uuid */}
                {values.switch && (                
                    <div>
                        <label>Por favor introduce el identificador del equipo</label>
                        <input 
                            type="text" 
                            name="teamID" 
                            value={values.teamID} 
                            onChange={handleChange}
                        />    
                    </div>)
                }
                <div>
                    <label>Rol</label>
                    <select 
                        name="role" 
                        value={values.role} 
                        onChange={handleChange}
                        onBlur={handleBlur}                     
                        className={errors.role? "error" : ""}
                    >
                        <option value="">Seleccionar Rol</option>
                        {data?.Rol?.map(option => <option value={option} key={option}>{option}</option>)}
                        {/* <option value="Team Member">Team Member</option>
                        <option value="Team Leader">Team Leader</option> */}
                    </select>
                    {errors.role && touched.role && <span className="error-message">{errors.role}</span>}
                </div>
                <div>
                    <label>Continente</label>
                    <select 
                        name="continent" 
                        value={values.continent} 
                        onChange={event => handleChangeContinent(event.currentTarget.value)}
                        onBlur={handleBlur}                     
                        className={errors.continent? "error" : ""}
                    >
                        <option value="">Seleccionar continente</option>
                        {data?.continente?.map(option => <option value={option} key={option}>{option}</option>)}
                        {/* <option value="America">America</option>
                        <option value="Europa">Europa</option>
                        <option value="Otro">Otro</option> */}
                    </select>
                    {errors.continent && touched.continent && <span className="error-message">{errors.continent}</span>}
                </div>
                {values.continent === "America" && (
                    <div>
                        <label>Región</label>
                        <select 
                            name="region" 
                            value={values.region} 
                            onChange={handleChange}
                            onBlur={handleBlur}                     
                            className={errors.region? "error" : ""}
                        >
                            <option value="">Seleccionar Region</option>
                            {data?.region?.map(option => <option value={option} key={option}>{option}</option>)}
                            {/* <option value="Latam">Latam</option>
                            <option value="Brasil">Brasil</option>
                            <option value="America del Norte">America del Norte</option>
                            <option value="Otro">Otro</option> */}
                        </select>
                        {errors.region && touched.region && <span className="error-message">{errors.region}</span>}
                    </div>

                )}

                <div>
                    <button type="submit">Enviar</button>
                </div>
                <div>
                    <Link to="/login">Iniciar Sesion</Link>
                </div>
            </form>
        </div>
    )
}