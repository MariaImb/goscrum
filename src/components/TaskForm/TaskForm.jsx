import "./TaskForm.styles.css"
import * as Yup from 'yup'

import {useFormik} from 'formik';


export const TaskForm = () => {

        const initialValues = {
            title: "",
            status: "",
            priority: "",
            description: "",

        }
    
        const onSubmit = (e) => {
            alert()
        }

        const required = "* Campo obligatorio"

        const validationsSchema = Yup.object().shape({
            title: Yup.string()
                .min(6, "La cantidad minima de caracteres es 6")
                .required(required),
            status: Yup.string().required(required),
            priority: Yup.string().required(required)
        }) 
        const formik = useFormik ({initialValues, validationSchema, onSubmit})

        const { handleSubmit, handleChange, errors } = formik
    
    return (
        <section className="task-form">
            <h2>Crear Tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="title" onChange={handleChange} placeholder="Título"></input>
                    </div>
                    {errors.title && <span>errors.title</span>}
                    <div>
                        <select name="status" onChange={handleChange}>
                            <option value="">Seleccionar un estado</option>
                            <option value="new">Nueva</option>
                            <option value="inProcess">En Proceso</option>
                            <option value="finished">Terminada</option>
                        </select>
                    </div>
                        {errors.status && <span>errors.status</span>}
                    <div>
                        <select name="priority" onChange={handleChange}>
                            <option value="">Seleccionar una prioridad</option>
                            <option value="low">Baja</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                        {errors.priority && <span>errors.priority</span>}
                </div>
                <div>
                    <textarea name="description" onChange={handleChange} placeholder="Descripción"></textarea>
                </div>
                <button type="submit">Crear</button>
            </form>

        </section>
    )
}