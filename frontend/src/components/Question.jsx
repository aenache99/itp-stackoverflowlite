import React, { useContext } from 'react';
import '../styles/Question.css';
import { useNavigate } from 'react-router-dom';
import { convertISOToDDMMYYYY } from '../utils/helper.js';
import { AuthContext } from '../context/AuthContext';
import DOMPurify from "dompurify";

const Question = ({ question, showBody, userId }) => {

    const navigate = useNavigate();
    const { deleteQuestion } = useContext(AuthContext);

    const handleEditQuestion = () => {
        navigate('/post-question', { state: { questionToEdit: question } });
    }

    return (
        <div className='question'>
            <div className='question-metrics'>
                <div className='metric'>
                    <span className='metric-value'>{question.voteCount}</span>
                    <span className='metric-label'>votes</span>
                </div>
                <div className='metric'>
                    <span className='metric-value'>{question.answerCount}</span>
                    <span className='metric-label'>answers</span>
                </div>
                <div className='metric'>
                    <span className='metric-value'>{question.viewCount}</span>
                    <span className='metric-label'>views</span>
                </div>
            </div>

            <div className='question-content'>
                <div className='question-info'>
                    <div className='question-tags'>
                        {
                            question.tags.map((tag) => (
                                <p key={tag}>{tag}</p>
                            ))
                        }
                    </div>
                    <p className='question-date'>
                        Asked on <span>{convertISOToDDMMYYYY(question.createdAt)}</span>
                    </p>
                </div>

                <h1 className='question-title' onClick={() => navigate(`/question/${question._id}`)}>
                    {question.title}
                </h1>

                <p className={`question-description ${showBody ? '' : 'hide'}`}
                   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.body) }}
                />



                <div className='question-user'>
                    {
                        userId === question.user._id ?
                            <div className='update-question'>
                                <button className='button' onClick={handleEditQuestion}>Edit</button>
                                <button className='button red' onClick={() => deleteQuestion(question._id)}>Delete</button>
                            </div>
                            :
                            <div className='update-question'></div>
                    }

                    <div className='question-user-details'>
                        <p className='question-date'>
                            Posted by&nbsp;<span>{question.user.username}</span>
                        </p>
                        <p className='question-date'>
                            Last edited at&nbsp;<span>{convertISOToDDMMYYYY(question.updatedAt)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;
