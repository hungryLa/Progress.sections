import {Link, useNavigate, useParams} from "react-router-dom";
import {Subtitle} from "../../components/UI/Subtitle";
import useSectionsStore from "../../store/useSectionsStore";
import {Loader} from "../../components/UI/Loader";
import {CardContainer} from "../../components/CardContainer";
import {useEffect} from "react";
import {SectionCard} from "../../components/SectionCard";
import {Button} from "../../components/UI/Button";

export const Sections = () => {
    const {schoolId, sectionId} = useParams();
    const {loading, error, sections, getSections} = useSectionsStore();
    const navigate = useNavigate()

    useEffect(() => {
        getSections(schoolId);
    }, []);

    const handleNewSection = () => {
        navigate(`/schools_owner/schools/${schoolId}/sections/new`)
    }

    return (
        <>
            <Subtitle>Секции</Subtitle>

            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Button variant={'blue'} onClick={handleNewSection}>Создать секцию</Button>
                    {!sections.length && (
                        <p style={{textAlign: 'center', marginTop: '2.4rem'}}>Нет секций</p>
                    )}
                    <CardContainer>

                        {sections.map((section) => (
                            <SectionCard key={section.id} schoolId={schoolId} section={section}/>
                        ))}

                    </CardContainer>
                </>
            )}
        </>
    );
};
