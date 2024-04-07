import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router

interface Question {
  text: string;
  test: string;
  question_type: string;
  choices: { id: number; text: string; is_correct: boolean }[];
}

const QuestionsPage: React.FC = () => {
  const { testTitle } = useParams<{ testTitle: string }>(); // Extract testTitle from URL
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/tests/questions/${testTitle}`); // Use template literal

      if (!response.ok) {
        throw new Error(`Error fetching questions: ${response.statusText}`);
      }

      const data: Question[] = await response.json(); // Type assertion for clarity
      setQuestions(data.map((question) => ({ ...question, choices: [] }))); // Initialize choices
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChoices = async (question: Question) => {
    try {
      const response = await fetch(
        `http://localhost:8000/tests/questions/${question.text}/choices` // Construct URL for choices
      );

      if (!response.ok) {
        throw new Error(`Error fetching choices for ${question.text}`);
      }

      const choices: Question['choices'] = await response.json(); // Type assertion for clarity
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q === question ? { ...q, choices } : q))
      ); // Update question with choices
    } catch (err) {
      console.error(`Error fetching choices for ${question.text}`, err); // Log error for debugging
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    questions.forEach(fetchChoices); // Fetch choices for each question after initial fetch
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
                    {question.choices.map((choice, choiceIndex) => (
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
