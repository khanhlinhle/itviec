import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Container, Button, Form, FormControl } from "react-bootstrap";

import JobCard from "../components/JobCard";

const QUERYSTR_PREFIX = "q";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Jobs() {

    let history = useHistory();
    let query = useQuery();
    let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));

    const [jobs, setJobs] = useState(null);
    const [originalJobs, setOriginalJobs] = useState(null);

    const getData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`;
        let data = await fetch(url);
        let result = await data.json();
        setOriginalJobs(result);
    };

    const handleSearch = (e) => {
        let filteredJobs = originalJobs;
        if (e) {
            e.preventDefault();
            history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
        }
        if (keyword) {
            filteredJobs = originalJobs.filter(job =>
                job.title.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        setJobs(filteredJobs);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [originalJobs]);

    return (
        <div>
            <Container>
                <Form inline>
                    <FormControl onChange={e => { setKeyword(e.target.value) }} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" onClick={e => handleSearch(e)} >Search</Button>
                </Form>
            </Container>
            <br />
            <Container>
                {jobs && jobs.map(item => <JobCard job={item} key={item.id} />)}
            </Container>
        </div>
    )
}