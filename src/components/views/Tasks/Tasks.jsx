import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Tasks.styles.css";
import { getTasks, deleteTask, editTaskStatus } from "../../../store/actions/tasksActions";
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { useResize } from "../../hooks/useResize";
import { Header } from "../../Header/Header";
import { Card } from "../../Card/Card";
import { TaskForm } from "../../TaskForm/TaskForm";

// const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Tasks = () => {
    const [list, setList] = useState(null);
    const [renderList, setRenderList] = useState(null);
    const [tasksfromWho, setTasksfromWho] = useState("ALL");
    const [search, setSearch] = useState("");
    // const [loading, setLoading] = useState(false);
    const { isPhone } = useResize();
    const dispatch = useDispatch();

    //al hacer un get no necesitamos aclarar el metodo GET

    //USE EFFECT SIN REDUX
    // useEffect(() => {
    //     setLoading(true);
    //     fetch(`${API_ENDPOINT}task${tasksfromWho === "ME" ? "/me" : ""}`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setList(data.result);
    //             setRenderList(data.result);
    //             setLoading(false);
    //             console.log(data);
    //         });
    // }, [tasksfromWho]);

    //USE EFFECT CON REDUX
    useEffect(() => {
        dispatch(getTasks(tasksfromWho === "ME" ? "/me" : ""));
    }, [tasksfromWho, dispatch]);

    const { loading, error, tasks } = useSelector((state) => {
        return state.tasksReducer;
    });


    useEffect(() => {
        if (tasks?.length) {
            setList(tasks);
            setRenderList(tasks);
        }
    }, [tasks]);

    useEffect(() => {
        if (search) {
            setRenderList(list.filter((data) => data.title.startsWith(search)));
        } else setRenderList(list);
    }, [search]);

    const renderAllCards = () => {
        return renderList?.map((data) => (
            <Card
                key={data.id}
                data={data}
                deleteCard={handleDelete}
                editCardStatus={handleEditCardStatus}
            />
        ));
    };

    //Devuelve cards de status nuevo
    const renderColumnCards = (text) => {
        return renderList
            ?.filter((data) => data.status === text)
            .map((data) => (
                <Card
                    key={data._id}
                    data={data}
                    deleteCard={handleDelete}
                    editCardStatus={handleEditCardStatus}
                />
            ));
    };

    const handleChangeImportance = (event) => {
        if (event.currentTarget.value === "ALL") setRenderList(list);
        else
            setRenderList(
                list.filter(
                    (data) => data.importance === event.currentTarget.value
                )
            );
    };

    // const handleSearch = event => setSearch(event.currentTarget.value)

    const handleSearch = debounce((event) => {
        setSearch(event?.target?.value);
    }, 1000);

    const handleDelete = (id) => dispatch(deleteTask(id));

    const handleEditCardStatus = data => dispatch(editTaskStatus(data))

    if (error) return <div>hay un error</div>;

    return (
        <>
            <Header />
            <main id="tasks">
                <TaskForm />
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>Mis tareas</h2>
                    </div>
                    <div className="filters">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                onChange={(event) => {
                                    setTasksfromWho(event.currentTarget.value);
                                }}
                            >
                                <FormControlLabel
                                    value="ALL"
                                    control={<Radio />}
                                    label="Todas"
                                />
                                <FormControlLabel
                                    value="ME"
                                    control={<Radio />}
                                    label="Mis tareas"
                                />
                            </RadioGroup>
                        </FormControl>
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Buscar por título..."
                                // value={search}
                                onChange={handleSearch}
                            />
                        </div>
                        <select
                            name="importance"
                            onChange={handleChangeImportance}
                        >
                            <option value="">Seleccionar una prioridad</option>
                            <option value="ALL">Todas</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                    </div>

                    {isPhone ? (
                        !list?.length ? (
                            <div>No hay tareas creadas</div>
                        ) : loading ? (
                            <>
                                <Skeleton heigh={90} baseColor="lightgrey" />
                                <Skeleton heigh={90} baseColor="lightgrey" />
                                <Skeleton heigh={90} baseColor="lightgrey" />
                            </>
                        ) : (
                            <div className="list phone">{renderAllCards()}</div>
                        )
                    ) : (
                        <div className="list_group">
                            {!list?.length ? (
                                <div>No hay tareas creadas</div>
                            ) : loading ? (
                                <>
                                    <Skeleton
                                        heigh={150}
                                        width={300}
                                        baseColor="lightgrey"
                                    />
                                    <Skeleton
                                        heigh={150}
                                        width={300}
                                        baseColor="lightgrey"
                                    />
                                    <Skeleton
                                        heigh={150}
                                        width={300}
                                        baseColor="lightgrey"
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="list">
                                        <h4>Nuevas</h4>
                                        {renderColumnCards("NEW")}
                                    </div>
                                    <div className="list">
                                        <h4>En proceso</h4>
                                        {renderColumnCards("IN PROGRESS")}
                                    </div>
                                    <div className="list">
                                        <h4>Finalizadas</h4>
                                        {renderColumnCards("FINISHED")}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};
