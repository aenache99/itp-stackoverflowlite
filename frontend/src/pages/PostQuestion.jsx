import React, { useContext, useEffect, useState } from 'react';
import '../styles/PostQuestion.css';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";

const PostQuestion = () => {
    const { postQuestion, updateQuestion } = useContext(AuthContext);

    const location = useLocation();
    const questionToEdit = location.state?.questionToEdit;

    const [isEditing, setIsEditing] = useState(false);

    const [questionFormValues, setQuestionFormValues] = useState({
        title: '',
        tags: [],
        body: ''
    });

    const handlePostQuestion = (e) => {
        e.preventDefault();

        if (questionFormValues.title === '') return alert('Please enter a title');
        if (questionFormValues.tags.length === 0) return alert('Please enter tags');
        if (questionFormValues.body === '') return alert('Please enter a description');

        const question = {
            title: questionFormValues.title,
            tags: questionFormValues.tags,
            body: questionFormValues.body
        }

        if (isEditing) {
            updateQuestion(question, questionToEdit._id);
        } else {
            postQuestion(question);
        }
    }

    const handleQuillChange = (value) => {
        setQuestionFormValues(prevState => ({ ...prevState, body: value }));
    };

    const handleTagsChange = (tags) => {
        setQuestionFormValues(prevState => ({ ...prevState, tags }));
    };

    useEffect(() => {
        if (questionToEdit) {
            setIsEditing(true);
            setQuestionFormValues({
                title: questionToEdit.title,
                tags: questionToEdit.tags,
                body: questionToEdit.body
            });
        }
    }, [questionToEdit]);

    return (
        <div className='post-question-main'>
            <div className='post-question-container'>
                <h1>{isEditing ? 'Edit Question' : 'Ask a public question'}</h1>
                <form onSubmit={handlePostQuestion}>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            id='title'
                            placeholder='e.g. How to add two numbers in JavaScript?'
                            value={questionFormValues.title}
                            onChange={(e) => setQuestionFormValues({ ...questionFormValues, title: e.target.value })}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='tags'>Tags</label>
                        <TagsInput
                            value={questionFormValues.tags}
                            onChange={handleTagsChange}
                            name='tags'
                            placeholder='Press enter to add a new tag'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <ReactQuill
                            id='description'
                            value={questionFormValues.body}
                            onChange={handleQuillChange}
                            theme="snow"
                        />
                    </div>
                    <button type='submit' className='button'>{isEditing ? 'Update Question' : 'Add your question'}</button>
                </form>
            </div>
        </div>
    )
}

export default PostQuestion;
