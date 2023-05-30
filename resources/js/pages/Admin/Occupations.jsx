import {useNavigate} from "react-router-dom";
import {Button} from "../../components/UI/Button";
import {Subtitle} from "../../components/UI/Subtitle";
import {Table} from "../../components/UI/Table";
import {TableCell} from "../../components/UI/Table/TableCell";
import {TableRow} from "../../components/UI/Table/TableRow";
import useOccupationsStore from "../../store/useOccupationsStore";
import {useEffect, useState} from "react";
import {Loader} from "../../components/UI/Loader";
import {Modal} from "../../components/UI/Modal";
import {Title} from "../../components/UI/Title";
import { toast } from "react-toastify";

export const Occupations = () => {
    const loading = useOccupationsStore(({loading}) => loading);
    const occupations = useOccupationsStore(({occupations}) => occupations);
    const getOccupations = useOccupationsStore(
        ({getOccupations}) => getOccupations
    );
    const deleteOccupation = useOccupationsStore(
        ({deleteOccupation}) => deleteOccupation
    );
    const navigate = useNavigate();

    const [modalIsActive, setModalIsActive] = useState(false);
    const [occupationToDelete, setOccupationToDelete] = useState({});

    useEffect(() => {
        getOccupations();
    }, []);

    const chooseOccupationToDelete = (occupation) => {
        setOccupationToDelete(occupation);
        setModalIsActive(true);
    };

    const openCreateUserPageHandler = () => {
        navigate("/admin/occupations/new");
    };

    return (
        <>
            <Subtitle>Виды деятельности</Subtitle>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Button variant={"blue"} onClick={() => openCreateUserPageHandler()}>
                        Создать вид деятельности
                    </Button>
                    <Table className={"occupations__table"}>
                        <TableRow head>
                            <TableCell>Название</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                        {occupations.length > 0 ? occupations.map((occupation) => (
                            <TableRow key={occupation.id}>
                                <TableCell>{occupation.title}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => {
                                            chooseOccupationToDelete(occupation);
                                        }}
                                    >
                                        <svg
                                            width={24}
                                            height={24}
                                            fill={"currentColor"}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                        </svg>
                                    </button>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <div style={{textAlign: "center", width: '100%'}}>Нет видов деятельности</div>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>}
                    </Table>
                </>
            )}

            <Modal isActive={modalIsActive}>
                <Title>
                    Удаление вида деятельности {occupationToDelete.title}
                </Title>
                <p>Вы действительно хотите удалить вид деятельности?</p>
                <div className={"modal__buttons"}>
                    <Button
                        variant={"green"}
                        onClick={async () => {
                            await deleteOccupation(occupationToDelete.id);
                            toast(`Вид деятельности "${occupationToDelete.title}" удален`)
                            setModalIsActive(false);
                        }}
                    >
                        Да
                    </Button>
                    <Button
                        variant={"gray"}
                        onClick={() => {
                            setModalIsActive(false);
                        }}
                    >
                        Отмена
                    </Button>
                </div>
            </Modal>
        </>
    );
};
