import React from 'react';
import { Container } from "react-bootstrap";
import "./404.css"

export default function Page404() {

    return (
        <Container>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                        <h2>404 - The Page can't be found</h2>
                    </div>
                </div>
            </div>
        </Container>
    )
}
