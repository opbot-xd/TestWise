import React, { useState, useEffect } from 'react';
import './prevTest.css';

interface Test {
  id: number;
  title: string;
  description: string;
  start_date: string; // Assuming start_date is a string in your API response
}

const FutureTest: React.FC = () => {
  const [futureTests, setFutureTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFutureTests = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:8000/get_prev_tests/');
        const data: Test[] = await response.json();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setFutureTests(data);
      } catch (error) {
        console.error('Error fetching past tests:', error);
        setError('An error occurred while fetching tests.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFutureTests(); // Call on component mount
  }, []);

  return (
    <>
      <h1>Previous Tests</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {futureTests.length > 0 && (
        <div className="container text-center">
          <div className="row">
            <div className="col-3">Title</div>
            <div className="col-6">Description</div>
            <div className="col-3">Start Time</div>
          </div>
          {futureTests.map((test) => (
            <div className="row" key={test.id}>
              <div className="col-3">{test.title}</div>
              <div className="col-6">{test.description}</div>
              <div className="col-3">{formatTestTime(test.start_date)}</div>  {/* Assuming a start_date property */}
            </div>
          ))}
        </div>
      )}
      {futureTests.length === 0 && !isLoading && !error && (
        <p>No past tests found.</p>
      )}
    </>
  );
};

function formatTestTime(dateString: string): string {
  // Implement logic to format the date and time as needed for display
  // Example using moment.js (if included in your project):
  // const formattedTime = moment(dateString).format('h:mm A');
  // return formattedTime;

  // Or use built-in JavaScript Date formatting (replace with your desired format):
  const date = new Date(dateString);
  const formattedTime = date.toLocaleString([], {
    year: 'numeric', // Include year
    month: 'short', // Short month name (e.g., Jan, Feb)
    day: '2-digit', // Pad with zero if needed (e.g., 01)
    hour: '2-digit', // Pad with zero if needed
    minute: '2-digit',
  });
  return formattedTime;
}

export default FutureTest;
