import {Subtitle} from "../../components/UI/Subtitle";
import useSectionTimetables from "../../store/useSectionTimetables";
import {Loader} from "../../components/UI/Loader";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../../components/UI/Button";
import {Table} from "../../components/UI/Table";
import {TableRow} from "../../components/UI/Table/TableRow";
import {TableCell} from "../../components/UI/Table/TableCell";

export const SectionTimetables = () => {
    const navigate = useNavigate()
    const {schoolId, sectionId} = useParams()
    const {
        loading,
        error,
        sectionTimetables,
        getSectionTimetables
    } = useSectionTimetables()

    useEffect(() => {
        getSectionTimetables(sectionId)
    }, [])

    const handleNewSectionTimetable = () => {
        navigate(`/schools_owner/schools/${schoolId}/sections/${sectionId}/sectionTimetables/new`)
    }

    return (
        <>
            <Subtitle>Расписания</Subtitle>
            {loading ? <Loader/> : (
                <>
                    <Button
                        variant={'blue'}
                        onClick={handleNewSectionTimetable}
                    >Создать расписание секции</Button>
                    {sectionTimetables && JSON.stringify(sectionTimetables)}
                    <Table>
                        <TableRow head>
                            <TableCell>Цена занятия</TableCell>
                            <TableCell>Цена пробного занятия</TableCell>
                            <TableCell>Кол-во мест</TableCell>
                            <TableCell>Цена группового занятия</TableCell>
                        </TableRow>
                        {sectionTimetables && sectionTimetables.map(timetable => (
                            <TableRow key={timetable.id}>
                                <TableCell>{timetable.lesson_price}</TableCell>
                                <TableCell>{timetable.trial_price}</TableCell>
                                <TableCell>{timetable.group ? timetable.group : '-'}</TableCell>
                                <TableCell>{timetable.group_price ? timetable.group_price : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </>
            )}
        </>
    )
}
