
import "./Tasks.styles.css"
import {useResize} from "../../hooks/useResize"
import { Header } from "../../Header/Header"
import {cardsData} from "./data"
import {Card} from "../../Card/Card"
import {TaskForm} from "../../TaskForm/TaskForm"

export const Tasks = () => {

    const { isPhone } = useResize();

    const limitString = str => {
        if(str.length > 370)
            return {string: str.slice(0, 367).concat("..."), addButton: true}
        return { string: str, addButton: false}
    }

    const renderAllCards = () => {
        return cardsData.map( data => <Card key={data.id} data={data} />)
    }

    return (
        <>
            <Header/>
            <main id="tasks">
                <TaskForm/>
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>Mis tareas</h2>
                    </div>
                    { isPhone ? (
                        <div className="list phone">
                            {renderAllCards()}
                        </div>
                        ) : (
                        <div className="list_group">
                            <div className="list">
                                <h4>Nuevas</h4>
                                <div className="card">
                                    <div className="close">x</div>
                                    <h3>Tarea 1</h3>
                                    <h6>24/1/2022 16:40 hs.</h6>
                                    <h5>María Imbert</h5>
                                    <button type="button">Nueva</button>
                                    <button type="button">Alta</button>
                                    <p>{
                                        limitString(`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim delectus laborum sapiente porro quasi sunt dolorem ipsam est voluptatum fuga assumenda laboriosam beatae blanditiis eligendi, sequi facilis architecto minima. Ea! Lorem, ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, sint? Rem sit nisi minus et eligendi doloribus quae, ipsa cumque quod tempore molestias vitae rerum qui! Sunt animi voluptatem voluptatibus?loremrchitecto minima. Ea! Lorem, ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, sint? Rem sit nisi minus et eligendi doloribus quae, ipsa cumque quod tempore molestias vitae r`).string
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="list">
                                <h4>En proceso</h4>
                                <div className="card">
                                    <div className="close">x</div>
                                    <h3>Tarea 1</h3>
                                    <h6>24/1/2022 16:40 hs.</h6>
                                    <h5>María Imbert</h5>
                                    <button type="button">Nueva</button>
                                    <button type="button">Alta</button>
                                    <p>Descipción fake</p>
                                </div>
                            </div>
                            <div className="list">
                                <h4>Finalizadas</h4>
                                <div className="card">
                                    <div className="close">x</div>
                                    <h3>Tarea 1</h3>
                                    <h6>24/1/2022 16:40 hs.</h6>
                                    <h5>María Imbert</h5>
                                    <button type="button">Nueva</button>
                                    <button type="button">Alta</button>
                                    <p>Descipción fake</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}
