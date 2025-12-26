import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quiz({ user }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await axios.get('/quiz/questions');
      if (response.data.success) {
        setQuestions(response.data.questions);
      }
    } catch (error) {
      console.error('Failed to load questions', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (optionIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const answers = questions.map(q => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id]
    }));

    try {
      const response = await axios.post('/quiz/submit', { answers });
      if (response.data.success) {
        setResults(response.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Failed to submit quiz', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setResults(null);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (user.progress.completedModules.length < 6) {
    return (
      <div className="container">
        <div className="card">
          <h2>Complete All Modules First</h2>
          <p>You need to complete all 6 modules before taking the quiz.</p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container">
        <h1>Quiz Results</h1>
        
        <div className="card">
          <h2 style={{ textAlign: 'center' }}>Your Score: {results.percentage}%</h2>
          <p style={{ textAlign: 'center', fontSize: '20px' }}>
            {results.score} out of {results.totalQuestions} correct
          </p>
          
          {results.certificateEarned ? (
            <div className="alert alert-success" style={{ marginTop: '20px' }}>
              <h3>🎉 Congratulations!</h3>
              <p>You've earned a <strong className={`badge badge-${results.passLevel}`}>{results.passLevel?.toUpperCase()}</strong> certificate!</p>
              {results.passLevel === 'gold' && <p>Outstanding performance! You've mastered the content!</p>}
              {results.passLevel === 'silver' && <p>Great work! You have a solid understanding of Data Science!</p>}
              {results.passLevel === 'bronze' && <p>Good job! You've passed the course!</p>}
            </div>
          ) : (
            <div className="alert alert-error" style={{ marginTop: '20px' }}>
              <h3>Keep Trying!</h3>
              <p>You need at least 50% to earn a certificate. Review the modules and try again!</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={() => navigate('/certificate')} className="btn btn-success" disabled={!results.certificateEarned}>
              View Certificate
            </button>
            <button onClick={handleRetake} className="btn btn-primary">
              Retake Quiz
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Answer Review</h2>
          {results.results.map((result, index) => (
            <div key={index} style={{ marginBottom: '30px', padding: '20px', background: '#f7fafc', borderRadius: '10px' }}>
              <h3>Question {index + 1}</h3>
              <p style={{ fontSize: '18px', marginBottom: '15px' }}>{result.question}</p>
              
              <div>
                {questions[index].options.map((option, optionIndex) => {
                  let className = 'quiz-option';
                  if (optionIndex === result.correctAnswer) {
                    className += ' correct';
                  } else if (optionIndex === result.selectedAnswer && !result.isCorrect) {
                    className += ' incorrect';
                  }
                  
                  return (
                    <div key={optionIndex} className={className}>
                      {option}
                      {optionIndex === result.correctAnswer && ' ✓'}
                      {optionIndex === result.selectedAnswer && !result.isCorrect && ' ✗'}
                    </div>
                  );
                })}
              </div>
              
              <div className="alert alert-info" style={{ marginTop: '15px' }}>
                <strong>Explanation:</strong> {result.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container">
      <h1>Certification Quiz</h1>
      
      <div className="card">
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h2>{currentQuestion.question}</h2>
        
        <div style={{ margin: '30px 0' }}>
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`quiz-option ${selectedAnswers[currentQuestion.id] === index ? 'selected' : ''}`}
              onClick={() => handleSelectAnswer(index)}
            >
              {option}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={handleNext}
            className="btn btn-primary"
            disabled={selectedAnswers[currentQuestion.id] === undefined}
            style={{ fontSize: '18px', padding: '15px 40px' }}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question →'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Exit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
