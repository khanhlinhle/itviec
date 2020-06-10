import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from "react-router-dom";
import { Container, Button, Form, FormControl, Navbar, Dropdown, Row, Col } from "react-bootstrap";
import "../components/JobCard.css"
import JobCard from "../components/JobCard";
import { useSelector, useDispatch } from "react-redux";

const QUERYSTR_PREFIX = "q";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Jobs() {

    let history = useHistory();
    let query = useQuery();
    let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const logout = (e) => {
        dispatch({ type: "LOGOUT", payload: user });
        history.push(`/jobs`);
    };

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
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">DotoViec</Navbar.Brand>
                <Form inline>
                    <FormControl onChange={e => { setKeyword(e.target.value) }} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="secondary" onClick={e => handleSearch(e)} >Search</Button>
                </Form>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                        Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            user.isAuthenticated === true ?
                                <Dropdown.Item href="#/action-2" onClick={logout}>Log out</Dropdown.Item> :
                                <Dropdown.Item href="#/action-1">
                                    <Link to="/login">Log in</Link>
                                </Dropdown.Item>
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
            <Container>
                <Row>
                    <Col md={3} xs={12}>
                        <h1 className="title">CURRENT OPENINGS</h1>
                        <br />
                        <Button className="Alerts-button" variant="outline-secondary">Receive Job Alerts</Button>
                        <h6 className="text-muted small-text">Subscribe for receiving emails about new available jobs in the future</h6>
                    </Col>
                    <Col md={9} xs={12}>
                        {jobs && jobs.map(item => <JobCard job={item} key={item.id} />)}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
