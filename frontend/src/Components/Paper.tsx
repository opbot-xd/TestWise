import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  text: string;
  test: string;
  question_type: string;
}

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Question[]>(
        "http://localhost:8000/tests/questions/test1"
      );
      setQuestions(response.data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <p>Loading questions...</p>
        ) : error ? (
          <p>Error fetching questions: {error}</p>
        ) : (
          <div>
            <h2>Questions:</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>
                  <p>{question.text}</p>
                  {/* Render additional question information as needed, e.g., */}
                  {/* <p>Test: {question.test}</p> */}
                  {/* <p>Type: {question.question_type}</p> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionsPage;
