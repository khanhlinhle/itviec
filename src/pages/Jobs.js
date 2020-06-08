import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Container, Button, Form, FormControl, Navbar, Nav, Row, Col } from "react-bootstrap";

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
        let url = `https://my-json-server.typicode.com/legobitna/Itviec/jobs`;
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
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">DotoViec</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl onChange={e => { setKeyword(e.target.value) }} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="secondary" onClick={e => handleSearch(e)} >Search</Button>
                </Form>
            </Navbar>
            <Container>
                <Row>
                    <Col xs={3}>
                        <h1 className="title">CURRENT OPENINGS</h1>
                        <br/>
                        <Button className="Alerts-button" variant="secondary">Receive Job Alerts</Button>
                        <h6 className="text-muted small-text">Subscribe for receiving emails about new available jobs in the future</h6>
                    </Col>
                    <Col xs={9}>
                        {jobs && jobs.map(item => <JobCard job={item} key={item.id} />)}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
