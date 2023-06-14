import { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button";
import { Loader } from "../../components/UI/Loader";
import { Modal } from "../../components/UI/Modal";
import { SubtitleWithButton } from "../../components/UI/SubtitleWithButton";
import { Table } from "../../components/UI/Table";
import { TableCell } from "../../components/UI/Table/TableCell";
import { TableRow } from "../../components/UI/Table/TableRow";
import { Title } from "../../components/UI/Title";
import usePersonsStore from "../../store/usePersonsStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

export const Accounts = () => {
    const {
        loading,
        linkedUsers,
        people,
        getPersons,
        unlinkUser: unlinkUserFunction,
        deletePerson: deletePersonFunction,
    } = usePersonsStore();

    const navigate = useNavigate();

    const [modalIsActive, setModalIsActive] = useState(false);

    const [linkedUserToUnlink, setLinkedUserToUnlink] = useState({});
    const [personToDelete, setPersonToDelete] = useState({});
    const [modalType, setModalType] = useState("");

    useEffect(() => {
        const fetchPersons = async () => {
            await getPersons();
        };

        fetchPersons();
    }, []);

    const chooseUserToUnlink = async (linkedUser) => {
        setLinkedUserToUnlink(linkedUser);
        setModalType("unlinkUser");
        setModalIsActive(true);
    };

    const choosePersonToDelete = async (person) => {
        setPersonToDelete(person);
        setModalType("deletePerson");
        setModalIsActive(true);
    };

    const openLinkUserPage = () => {
        navigate("/user/accounts/link-user");
    };

    const openNewPersonPage = () => {
        navigate("/user/accounts/new-person");
    };

    const closeModal = () => {
        setModalType("");
        setModalIsActive(false);
    };

    const unlinkUser = async (user) => {
        await unlinkUserFunction(user?.id).then(() => {
            toast(`Пользователь ${user?.full_name} отвязан`);
            closeModal();
        });
    };

    const deletePerson = async (person) => {
        await deletePersonFunction(person?.id).then(() => {
            toast(`Подопечный ${person?.full_name} удален`);
            closeModal();
        });
    };

    const translateGender = (value) => value === 'male' ? 'Мужской' : 'Женский'

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <SubtitleWithButton
                        title={"Привязанные пользователи"}
                        buttonText={"Призязать пользователя"}
                        onClick={openLinkUserPage}
                    />
                    <Table>
                        <TableRow head>
                            <TableCell>Имя</TableCell>
                            <TableCell>Почта</TableCell>
                            <TableCell>Телефон</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                        {linkedUsers.length > 0 ? (
                            linkedUsers.map((linkedUser) => (
                                <TableRow key={linkedUser?.id}>
                                    <TableCell>
                                        {linkedUser?.full_name}
                                    </TableCell>
                                    <TableCell>{linkedUser?.email}</TableCell>
                                    <TableCell>{linkedUser?.phone}</TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => {
                                                chooseUserToUnlink(linkedUser);
                                            }}
                                        >
                                            <svg
                                                width={24}
                                                height={24}
                                                fill={"currentColor"}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                            </svg>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <span
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        padding: "1rem",
                                    }}
                                >
                                    Похоже у вас нет привязанных пользователей
                                </span>
                            </TableRow>
                        )}
                    </Table>

                    <SubtitleWithButton
                        title={"Подопечные"}
                        buttonText={"Добавить подопечного"}
                        onClick={openNewPersonPage}
                    />
                    <Table>
                        <TableRow head>
                            <TableCell>Имя</TableCell>
                            <TableCell>Пол</TableCell>
                            <TableCell>Дата рождения</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                        {people.length > 0 ? (
                            people.map((person) => (
                                <TableRow key={person?.id}>
                                    <TableCell>{person?.full_name}</TableCell>
                                    <TableCell>{translateGender(person?.gender)}</TableCell>
                                    <TableCell>{moment(person?.date_birth).format('DD.MM.YYYY')}</TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => {
                                                choosePersonToDelete(person);
                                            }}
                                        >
                                            <svg
                                                width={24}
                                                height={24}
                                                fill={"currentColor"}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                            </svg>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <span
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        padding: "1rem",
                                    }}
                                >
                                    Похоже у вас нет подопечных
                                </span>
                            </TableRow>
                        )}
                    </Table>
                </>
            )}

            {modalType === "unlinkUser" ? (
                <Modal isActive={modalIsActive}>
                    <Title>
                        Отвязать пользователя {linkedUserToUnlink?.full_name} ?
                    </Title>
                    <div className={"modal__buttons"}>
                        <Button
                            variant={"green"}
                            onClick={() => unlinkUser(linkedUserToUnlink)}
                        >
                            Отвязать
                        </Button>
                        <Button variant={"gray"} onClick={closeModal}>
                            Отмена
                        </Button>
                    </div>
                </Modal>
            ) : (
                ""
            )}

            {modalType === "deletePerson" ? (
                <Modal isActive={modalIsActive}>
                    <Title>
                        Удаление подопечного {personToDelete?.full_name}
                    </Title>
                    <div className={"modal__buttons"}>
                        <Button
                            variant={"green"}
                            onClick={() => deletePerson(personToDelete)}
                        >
                            Удалить
                        </Button>
                        <Button variant={"gray"} onClick={closeModal}>
                            Отмена
                        </Button>
                    </div>
                </Modal>
            ) : (
                ""
            )}
        </>
    );
};
