import React from 'react'
import moment from "moment";
import { Row, Col, Badge, Button, Card } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import "./JobCard.css";
import { useSelector } from 'react-redux';

export default function JobCard(props) {

    let history = useHistory();
    const user = useSelector(state => state.user);
    const jobSelect = () => {
        history.push(`/jobs/${props.job.id}`);
    };

    return (
        <div className="job-content" onClick={() => jobSelect()}>
            <Row>
                <Col xs={10}>
                    <div className="jobcard-descriptions">
                        <Card.Header>
                            <h3>{props.job.title}</h3>
                            <div className="jobcard-title">
                                <div className="d-flex">
                                    <h5>
                                        {props.job.isHotjob ? (
                                            <Badge className="Hotjob-style" variant="danger">Hot Job</Badge>
                                        ) : (
                                                <div></div>
                                            )}
                                    </h5>
                                    <h5>
                                        {
                                            user.isAuthenticated === true ?
                                                <Badge variant="warning">$ {props.job.salary}</Badge> :
                                                <Badge variant="light">$&nbsp;
                                                    <Link to="/login">Sign in to view</Link>
                                                </Badge>
                                        }

                                    </h5>
                                </div>
                                <div>
                                    <Button className="Apply-button" variant="success">Apply now</Button>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <div className="text-muted">Posted date: {moment(props.job.time).fromNow()}</div>
                                <div className="jobcard-location">
                                    <span>Location: District {props.job.district} - {props.job.city}</span>
                                </div>
                                <div>
                                    <ul className="benefit-list">
                                        {props.job.benefits.map(benefit => (
                                            <li>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Card.Text>
                            <h5>
                                {props.job.tags.map(tag => (
                                    <Badge variant="dark" className="badge-style">
                                        {tag}
                                    </Badge>
                                ))}
                            </h5>
                        </Card.Body>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
