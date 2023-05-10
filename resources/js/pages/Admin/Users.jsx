import {Subtitle} from "../../components/UI/Subtitle";
import useUsersStore from "../../store/useUsersStore";
import {shallow} from "zustand/shallow";
import {useEffect, useState} from "react";
import {Modal} from "../../components/UI/Modal";
import {Title} from "../../components/UI/Title";
import {Button} from "../../components/UI/Button";

export const Users = () => {
    const loading = useUsersStore(state => state.loading)
    const error = useUsersStore(state => state.error)
    const users = useUsersStore(state => state.users, shallow)
    const getUsers = useUsersStore(state => state.getUsers, shallow)
    const deleteUser = useUsersStore(state => state.deleteUser, shallow)

    const [modalIsActive, setModalIsActive] = useState(false)
    const [userToDelete, setUserToDelete] = useState({})

    useEffect(() => {
        const fetchUsers = async () => {
            await getUsers()
        }
        fetchUsers()

    }, [])

    const chooseUserToDelete = (user) => {
        setUserToDelete(user)
        setModalIsActive(true)
    }

    return (
        <div>
            {loading && <h3>Loading</h3>}
            {error && <span>{error}</span>}
            <Subtitle>Список пользователей</Subtitle>
            <div>
                <table>
                    <thead>
                    <tr style={{textAlign: 'left'}}>
                        <th>Роль</th>
                        <th>Имя</th>
                        <th>Почта</th>
                        <th>Телефон</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map(user => (
                        <tr key={user.id}>
                            <td>{user.role}</td>
                            <td>{user.full_name}</td>
                            <td style={{color: 'var(--green)'}}>{user.email_verified_at ? 'Подтверждена' : 'Не подтверждена'}</td>
                            <td>{user.phone_number}</td>
                            <td>
                                <button onClick={() => console.log(user.id + ' to edit')}>
                                    <svg width={30} height={30} fill={'currentColor'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>
                                    </svg>
                                </button>
                                <button onClick={() => {
                                  chooseUserToDelete(user)
                                }}>

                                    <svg width={30} height={30} fill={'currentColor'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal isActive={modalIsActive}>
                <Title>Удаление пользователя {userToDelete.full_name}</Title>
                <p>Вы действительно хотите удалить пользователя?</p>
                <div className={'modal__buttons'}>
                    <Button variant={'green'} onClick={async () => {
                        await deleteUser(userToDelete.id)
                        setModalIsActive(false)
                    }
                    }>Да</Button>
                    <Button variant={'gray'} onClick={() => {
                        setModalIsActive(false)
                        console.log('Ya debil')
                    }}>Отмена</Button>
                </div>
            </Modal>
        </div>
    )
}
