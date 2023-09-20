import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, PostQuestion, QuestionPage, SignIn } from './pages';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
      <>
        <Router>
          <AuthProvider>
            <Header />
            <div className='container'>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/post-question" element={<PostQuestion />} />
                <Route exact path="/question/:questionId" element={<QuestionPage />} />
              </Routes>
            </div>
            <Footer />
          </AuthProvider>
        </Router>
      </>
  )
}

export default App;
