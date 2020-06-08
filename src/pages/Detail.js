import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import JobCard from "../components/JobCard";

export default function Detail() {

    const { id } = useParams();
    const [jobDetail, setJob] = useState(null);

    const getDetailData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`;
        let data = await fetch(url);
        let result = await data.json();
        setJob(result);
    };

    useEffect(() => {
        getDetailData();
    }, []);

    return (
        <Container>
            {jobDetail ?
                <JobCard job={jobDetail} key={jobDetail.id} />
                :
                <div></div>
            }
        </Container>
    )
}
