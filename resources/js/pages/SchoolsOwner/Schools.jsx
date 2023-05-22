import useUsersStore from "../../store/useUsersStore";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import useSchoolsStore from "../../store/useSchoolsStore";
import { useEffect, useState } from "react";
import { Subtitle } from "../../components/UI/Subtitle";
import { Loader } from "../../components/UI/Loader";
import { CardContainer } from "../../components/CardContainer";
import { SchoolCard } from "../../components/SchoolCard";
import {Button} from "../../components/UI/Button";

export const Schools = () => {
    const loading = useSchoolsStore(({ loading }) => loading);
    const schools = useSchoolsStore(({ schools }) => schools, shallow);
    const getSchools = useSchoolsStore(({ getSchools }) => getSchools, shallow);
    const navigate = useNavigate();

    useEffect(() => {
        getSchools();
        console.log(schools)
    }, []);

    const handleNavigate = () => {
        navigate(`/schools_owner/schools/new`)
    }

    return (
        <>
            <Subtitle>Список школ</Subtitle>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <Button type={'button'} variant={'blue'} onClick={handleNavigate}>Создать</Button>
                    <CardContainer>
                        {schools && schools.map((school) => (
                            <SchoolCard
                                key={school?.id}
                                id={school?.id}
                                images={school?.images}
                                title={school?.title}
                                description={school?.description}
                                types={school?.school_types}
                            />
                        ))}
                    </CardContainer>
                </>
            )}
        </>
    );
};
