import React, { useContext, useEffect, useState } from 'react';
import '../styles/Home.css'
import { Question } from '../components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {

    const navigate = useNavigate();
    const { questions, getQuestions, userId, tags, filterQuestions } = useContext(AuthContext);

    const [filter, setFilter] = useState('');

    const postAQuestion = () => {
        if (userId) {
            navigate('/post-question', { state: { questionToEdit: null } });
        } else {
            navigate('/signin');
        }
    }

    useEffect(() => {
        if (questions.length === 0) {
            getQuestions();
        }
    }, [])

    useEffect(() => {
        filterQuestions(filter);
    }, [filter]);

    return (
        <div className='home'>
            <div className='filters-container'>
                <div className='filters'>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value=''>Select tags</option>
                        {
                            tags.map((tag) => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))
                        }
                    </select>

                    {
                        filter ? <p className='selected-tags'>{filter}</p> : null
                    }

                </div>

                <div className='post-question'>
                    <button className='button' onClick={postAQuestion}>Ask a Question</button>
                </div>
            </div>

            <div className='questions-container'>
                {
                    questions.length > 0 ?
                        questions.map((question) => (
                            <Question key={question._id} question={question} showBody={false} userId={userId} />
                        ))
                        :
                        <p>No questions found</p>
                }
            </div>
        </div>
    )
}

export default Home