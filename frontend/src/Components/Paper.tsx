import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

interface Question {
  text: string;
  test: string;
  question_type: string;
  choices: { id: number; text: string; is_correct: boolean }[];
}

const QuestionsPage: React.FC = () => {
  const { testTitle } = useParams<{ testTitle: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<Question[]>(
        `http://localhost:8000/tests/questions/${testTitle}`
      );

      if (response.status !== 200) {
        throw new Error(`Error fetching questions: ${response.statusText}`);
      }

      setQuestions(response.data); // No need for manual type assertion
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChoices = async (question: Question) => {
    try {
      const response = await axios.get<Question['choices']>(
        `http://localhost:8000/tests/questions/${question.text}/choices`
      );

      if (response.status !== 200) {
        throw new Error(`Error fetching choices for ${question.text}`);
      }

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q === question ? { ...q, choices: response.data } : q))
      );
    } catch (err: any) {
      console.error(`Error fetching choices for ${question.text}`, err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    questions.forEach(fetchChoices);
  }, [questions]);

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
                  <ul>
                    {question.choices?.map((choice, choiceIndex) => (
                      <li
                        key={choiceIndex}
                        style={{
                          backgroundColor: choice.is_correct
                            ? 'lightgreen' // Highlight correct choice
                            : 'white',
                        }}
                      >
                        {choice.text}
                      </li>
                    ))}
                  </ul>
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
