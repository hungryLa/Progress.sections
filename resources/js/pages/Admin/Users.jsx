import {Subtitle} from "../../components/UI/Subtitle";
import useUsersStore from "../../store/useUsersStore";
import {shallow} from "zustand/shallow";
import {useEffect} from "react";

export const Users = () => {
    // const {users, loading, error, getUsers} = useUsersStore((state) => ({
    //     users: state.users,
    //     loading: state.loading,
    //     error: state.error,
    //     getUsers: state.getUsers()
    // }), shallow)
    const loading = useUsersStore(state => state.loading)
    const error = useUsersStore(state => state.error)
    const users = useUsersStore(state => state.users)
    const getUsers = useUsersStore(state => state.getUsers)

    useEffect(() => {
        const fetchUsers = async () => {
            await getUsers()
        }
        fetchUsers().then(res => console.log(res))
    }, [users])

    return (
        <div>

            <Subtitle>Список пользователей</Subtitle>
            {loading ? <h3>Loading</h3> : (
                <div>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.email}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}
