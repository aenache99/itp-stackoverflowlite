import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';

function Footer() {
    const [metrics, setMetrics] = useState({
        popularDay: '',
        averageStats: { votes: 0, questions: 0, answers: 0 },
        totalStats: { votes: 0, questions: 0, answers: 0 },
    });

    useEffect(() => {
        // ... Your fetchMetrics code
    }, []);

    return (
        <footer>
            <div className="column">
                <h3>COMPANY</h3>
                <a href="https://stackoverflow.co/">About</a>
                <a href="https://stackoverflow.co/company/press/">Press</a>
                <a href="https://www.inthepocket.com/careers">Work Here</a>
                <a href="https://stackoverflow.com/legal/terms-of-service">Legal</a>
                <a href="https://stackoverflow.com/legal/privacy-policy">Privacy Policy</a>
            </div>
            <div className="column">
                <h3>CONTACT US</h3>
                <a href="https://stackoverflow.co/company/contact/">Feedback</a>
                <a href="https://stackoverflow.co/advertising/">Advertise</a>
            </div>
            <div className="metrics-column">
                <h3>METRICS</h3>
                <div className="metric">
                    <strong>Popular Day of the Week: </strong> {metrics.popularDay}
                </div>
                <div className="metric">
                    <strong>Avg/User: </strong>
                    Votes: {metrics.averageStats.votes},
                    Questions: {metrics.averageStats.questions},
                    Answers: {metrics.averageStats.answers}
                </div>
                <div className="metric">
                    <strong>Total: </strong>
                    Votes: {metrics.totalStats.votes},
                    Questions: {metrics.totalStats.questions},
                    Answers: {metrics.totalStats.answers}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
