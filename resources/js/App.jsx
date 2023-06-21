import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UnauthorizedLayout} from "./pages/layouts/UnauthorizedLayout";
import {MainPage} from "./pages/Main.page";
import {AuthorizedLayout} from "./pages/layouts/AuthorizedLayout";
import useAuthStore from "./store/useAuthStore";
import {Users} from "./pages/Admin/Users";
import {SchoolsTimetables} from "./pages/SchoolsOwner/SchoolsTimetables";
import {NewUser} from "./pages/Admin/NewUser";
import {Sections} from "./pages/SchoolsOwner/Sections";
import {Schools} from "./pages/SchoolsOwner/Schools";
import {School} from "./pages/SchoolsOwner/School";
import {EditUser} from "./pages/Admin/EditUser";
import {Occupations} from "./pages/Admin/Occupations";
import {NewOccupation} from "./pages/Admin/NewOccupation";
import {Section} from "./pages/SchoolsOwner/Section";
import {NewSchoolsTimetable} from "./pages/SchoolsOwner/NewSchoolsTimetable";
import {EditSchoolsTimetable} from "./pages/SchoolsOwner/EditSchoolsTimetable";
import {NewSection} from "./pages/SchoolsOwner/NewSection";
import {EditSection} from "./pages/SchoolsOwner/EditSection";
import {NewSchool} from "./pages/SchoolsOwner/NewSchool";
import {SchoolTypes} from "./pages/Admin/SchoolTypes";
import {NewSchoolType} from "./pages/Admin/NewSchoolType";
import {EditSchoolType} from "./pages/Admin/EditSchoolType";
import {EditSchool} from "./pages/SchoolsOwner/EditSchool";
import {SchoolsTeachers} from "./pages/SchoolsOwner/SchoolsTeachers";
import {NewTeacher} from "./pages/SchoolsOwner/NewTeacher";
import {Settings} from "./pages/Settings";
import {Teacher} from "./pages/SchoolsOwner/Teacher";
import {SectionTimetables} from "./pages/SchoolsOwner/SectionTimetables";
import {NewSectionTimetable} from "./pages/SchoolsOwner/NewSectionTimetable";
import {EditSectionTimetable} from "./pages/SchoolsOwner/EditSectionTimetable";
import {Accounts} from "./pages/User/Accounts";
import {LinkUser} from "./pages/User/LinkUser";
import {UserSchools} from "./pages/User/UserSchools";
import {TeacherTimetables} from "./pages/Teacher/TeacherTimetables";
import {NewTeacherTimeTable} from "./pages/Teacher/NewTeacherTimeTable";
import {UserSchoolsSections} from "./pages/User/UserSchoolsSections";
import {Reservation} from "./pages/User/Reservation";
import {TeacherSchools} from "./pages/Teacher/TeacherSchools";
import {SuccessPay} from "./pages/User/SuccessPay";
import {FailPay} from "./pages/User/FailPay";
import {NewPerson} from "./pages/User/NewPerson";
import {TeacherSections} from "./pages/Teacher/TeacherSections";
import {Verify} from "./pages/Verify";

const AdminRoute = ({children}) => {
    const user = useAuthStore(state => state.user)
    let location = useLocation()

    if(user.role !== 'admin') {
        return <Navigate to={'/'} state={{from: location}} />
    }

    return children
}

export const App = () => {
  
    const user = useAuthStore(({user}) => user)

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<UnauthorizedLayout/>}>
                    <Route path={'/'} element={<MainPage/>}/>
                </Route>

                {!localStorage.getItem('token') && <Route element={<UnauthorizedLayout/>}>
                    <Route path={'/'} element={<MainPage/>}/>
                </Route>}

                {user && user.role === 'admin' && (
                    <Route path={'/admin/'} element={<AuthorizedLayout/>}>
                        <Route path={'/admin/users'} element={<Users/>}/>
                        <Route path={'/admin/users/new'} element={<NewUser/>}/>
                        <Route path={'/admin/users/:userId/update'} element={<EditUser/>}/>
                        <Route path={'/admin/occupations'} element={<Occupations/>}/>
                        <Route path={'/admin/occupations/new'} element={<NewOccupation/>}/>
                        <Route path={'/admin/schoolTypes/'} element={<SchoolTypes/>}/>
                        <Route path={'/admin/schoolTypes/new'} element={<NewSchoolType/>}/>
                        <Route path={'/admin/schoolTypes/:schoolTypeId/edit'} element={<EditSchoolType/>}/>
                        <Route path={'/admin/commission'} element={<h1>Комиссия</h1>}/>
                        <Route path={'/admin/extracts'} element={<h1>Выписки</h1>}/>
                        <Route path={'/admin/settings'} element={<Settings/>}/>
                    </Route>
                )}

                {user && user.role === 'schools_owner' && (
                    <Route path={'/schools_owner/'} element={<AuthorizedLayout/>}>
                        <Route path={'/schools_owner/schools'} element={<Schools/>}/>
                        <Route path={'/schools_owner/schools/new'} element={<NewSchool/>}/>
                        <Route path={'/schools_owner/schools/:schoolId'} element={<School/>}/>
                        <Route path={'/schools_owner/schools/:schoolId/settings'} element={<EditSchool/>}/>
                        {/* SECTIONS */}
                        <Route path={'/schools_owner/schools/:schoolId/sections'} element={<Sections/>}/>
                        <Route path={'/schools_owner/schools/:schoolId/sections/new'} element={<NewSection/>}/>
                        <Route path={'/schools_owner/schools/:schoolId/sections/:sectionId'} element={<Section/>}/>
                        <Route path={'/schools_owner/schools/:schoolId/sections/:sectionId/update'}
                               element={<h1>Редактирование секции</h1>}/>
                        <Route path={'/schools_owner/schools/:schoolId/sections/:sectionId/settings'}
                               element={<EditSection/>}/>
                        {/*  SECTION TIMETABLES  */}
                        <Route
                            path={'/schools_owner/schools/:schoolId/sections/:sectionId/sectionTimetables'}
                            element={<SectionTimetables/>}
                        />
                        <Route
                            path={'/schools_owner/schools/:schoolId/sections/:sectionId/sectionTimetables/:sectionTimetableId'}
                            element={<h1>Расписание секции</h1>}
                        />
                        <Route
                            path={'/schools_owner/schools/:schoolId/sections/:sectionId/sectionTimetables/new'}
                            element={<NewSectionTimetable/>}
                        />
                        <Route
                            path={'/schools_owner/schools/:schoolId/sections/:sectionId/sectionTimetables/:sectionTimetableId/edit'}
                            element={<EditSectionTimetable/>}
                        />
                        {/* TIMETABLES */}
                        <Route path={'/schools_owner/schools/:schoolId/timetables'} element={<SchoolsTimetables/>}/>
                        <Route path={'/schools_owner/schools/:schoolId/timetables/new'}
                               element={<NewSchoolsTimetable/>}/>
                        <Route path={`/schools_owner/schools/:schoolId/timetables/:timetableId/update`}
                               element={<EditSchoolsTimetable/>}/>
                        {/* TEACHERS */}
                        <Route path={'/schools_owner/schools/:schoolId/teachers'} element={<SchoolsTeachers/>}/>
                        <Route path={'/schools_owner/schools/:schoolId/teachers/new'} element={<NewTeacher/>}/>
                        <Route path={'/schools_owner/schools/:schoolId/all-teachers'}
                               element={<h1>Все преподаватели</h1>}/>
                        <Route path={'/schools_owner/schools/:schoolId/all-teachers/:teacherId'}
                               element={<h1>Свободный преподаватель</h1>}/>
                        <Route path={'/schools_owner/schools/:schoolId/invited-teachers'}
                               element={<h1>Приглашенные преподаватели</h1>}/>
                        <Route path={'/schools_owner/schools/:schoolId/invited-teachers/:teacherId'}
                               element={<h1>Приглашенный преподаватель</h1>}/>
                        <Route path={'/schools_owner/schools/:schoolId/school-teachers'}
                               element={<h1>Преподаватели</h1>}/>
                        <Route path={'/schools_owner/schools/:schoolId/school-teachers/:teacherId'}
                               element={<Teacher/>}/>
                        <Route path={'/schools_owner/settings'} element={<Settings/>}/>
                        <Route path={'/schools_owner/extracts'} element={<h1>Выписки</h1>}/>
                    </Route>
                )}

                {user && user.role === 'user' && (
                    <Route path={'/user/'} element={<AuthorizedLayout/>}>
                        <Route path={'/user/schedule'} element={<h1>Моё расписание</h1>}/>
                        <Route path={'/user/schools'} element={<UserSchools/>}/>
                        <Route path={'/user/schools/:schoolId'} element={<School/>}/>
                        <Route path={'/user/schools/:schoolId/sections'} element={<UserSchoolsSections/>}/>
                        <Route path={'/user/schools/:schoolId/sections/:sectionId'} element={<Section/>}/>
                        <Route path={'/user/schools/:schoolId/sections/:sectionId/reservation'}
                               element={<Reservation/>}/>
                        <Route path={'/user/favorites'} element={<h1>Избранное</h1>}/>
                        <Route path={'/user/subscriptions'} element={<h1>Абонементы</h1>}/>
                        <Route path={'/user/accounts'} element={<Accounts/>}/>
                        <Route path={'/user/accounts/link-user'} element={<LinkUser/>}/>
                        <Route path={'/user/accounts/new-person'} element={<NewPerson/>}/>
                        <Route path={'/user/settings'} element={<Settings/>}/>
                        <Route path={'/user/successPay'} element={<SuccessPay/>}/>
                        <Route path={'/user/failPay'} element={<FailPay/>}/>
                    </Route>
                )}

                {user && user.role === 'teacher' && (
                    <Route path={'/teacher/'} element={<AuthorizedLayout/>}>
                        <Route path={'/teacher/sections'} element={<TeacherSections/>}/>
                        <Route path={'/teacher/schools'} element={<TeacherSchools/>}/>
                        <Route path={'/teacher/timetables'} element={<TeacherTimetables/>}/>
                        <Route path={'/teacher/timetables/new'} element={<NewTeacherTimeTable/>}/>
                        <Route path={'/teacher/applications'} element={<h1>Заявки</h1>}/>
                        <Route path={'/teacher/settings'} element={<Settings/>}/>
                    </Route>
                )}
                <Route path={`/email/verify/:id/:hash`} element={<Verify/>}/>
                <Route path={'*'} element={<Navigate to={'/user/schedule'}/>}/>

            </Routes>
        </BrowserRouter>
    )
}
