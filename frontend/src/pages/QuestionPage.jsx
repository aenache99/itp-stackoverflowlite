import React, { useContext, useEffect, useState } from 'react'
import '../styles/QuestionPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Question } from '../components';
import { AuthContext } from '../context/AuthContext';
import { convertISOToDDMMYYYY } from '../utils/helper';

const QuestionPage = () => {

    const navigate = useNavigate();
    const { questionId } = useParams();
    const { getAllAnswers, answers, userId, postAnswer, acceptAnswer } = useContext(AuthContext);

    const [answerFormValues, setAnswerFormValues] = useState({
        body: '',
        questionId: questionId,
    });

    const postAnAnswer = () => {
        if (userId) {
            postAnswer(answerFormValues);
        } else {
            navigate('/signin');
        }
    }

    useEffect(() => {
        if (questionId) {
            getAllAnswers(questionId);
        }
    }, [])

    return (
        <div className='question-page'>
            <div className='question-page-header' onClick={() => navigate('/')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.5 5.5L8.5 12L15.5 18.5" stroke="#2D3748" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Back to Home</span>
            </div>
            {
                Object.keys(answers.question).length > 0 ? <Question question={answers.question} showBody={true} userId={userId} /> : null
            }

            <div className='add-answer'>
                <h2>Add Answer</h2>
                <textarea
                    placeholder='Enter your answer here...'
                    value={answerFormValues.body}
                    onChange={(e) => setAnswerFormValues({ ...answerFormValues, body: e.target.value })}
                ></textarea>
                <button className='button' onClick={postAnAnswer}>Post Answer</button>
            </div>

            {
                answers.answer.length > 0 ?
                    <div className='answers-container'>
                        <div className='answers-header'>
                            <h2>Answers</h2>
                            <p>{answers.answer.length} Answers</p>
                        </div>

                        {
                            answers.answer.map((item) => (
                                <div className='answer' key={item._id}>
                                    {
                                        answers.question.acceptedAnswer === item._id && (
                                            <div className='accepted-answer'>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4 12L9 17L20 6" stroke="#4ADE80" strokeWidth="2"
                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p>Accepted Answer</p>
                                            </div>
                                        )
                                    }
                                    <div className='answer-user'>
                                        <img className='answer-user-image' src='https://www.w3schools.com/howto/img_avatar.png' alt='user' />
                                        <p>{item.user.username}</p>
                                    </div>

                                    <div className='answer-content'>
                                        <p>
                                            {item.body}
                                        </p>
                                    </div>

                                    <div className='answer-date'>
                                        <p>Answered on <span>{convertISOToDDMMYYYY(item.createdAt)}</span></p>
                                        {
                                            userId === answers.question.user._id && answers.question.acceptedAnswer !== item._id && (
                                                <div className='accept-answer'>
                                                    <button className='button' onClick={() => acceptAnswer(questionId, item._id)} >Accept Answer</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className='no-answers'>
                        <h2>No Answers Yet</h2>
                        <p>Be the first one to answer this question</p>
                    </div>
            }


        </div>
    )
}

export default QuestionPage;