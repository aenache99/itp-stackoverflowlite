import './config/database.js';
import router from './config/app.js';
import { acceptAnswer, login, publishAnswer, publishQuestion, updateQuestion, getQuestions, getAnswers, deleteQuestion } from './controllers/index.js';
import { authenticate } from './middleware/authentication.js';

// User routes
router.post('/login', login);

// Question routes
router.post('/publish-question', authenticate, publishQuestion);
router.put('/update-question', authenticate, updateQuestion);
router.get('/questions', getQuestions);
router.delete('/delete-question', authenticate, deleteQuestion);

// Answer routes
router.post('/publish-answer', authenticate, publishAnswer);
router.post('/accept-answer', authenticate, acceptAnswer);
router.get('/answers', getAnswers);