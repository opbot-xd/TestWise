import React, { useState, useEffect } from "react";
import "./currTest.css";
import { Link } from "react-router-dom";

interface Test {
  id: number;
  title: string;
  description: string;
  start_date: string; // Assuming start_date is a string in your API response
}

const CurrTest: React.FC = () => {
  const [upcomingTests, setUpcomingTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingTests = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:8000/api/get_current_tests/"
        );
        const data: Test[] = await response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setUpcomingTests(data);
      } catch (error) {
        console.error("Error fetching upcoming tests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingTests(); // Call on component mount
  }, []);

  return (
    <>
      <h1>Current Tests</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {upcomingTests.length > 0 && (
        <div className="container text-center">
          <div className="row">
            <div className="col-3">Title</div>
            <div className="col-6">Description</div>
            <div className="col-3">Start Time</div>
          </div>
          {upcomingTests.map((test) => (
            <div className="row" key={test.id}>
              <div className="col-3">
                <Link to={`/test/${test.id}`}>{test.title}</Link>
              </div>
              <div className="col-6">{test.description}</div>
              <div className="col-3">
                {formatTestTime(test.start_date)}
              </div>{" "}
              {/* Assuming a start_date property */}
            </div>
          ))}
        </div>
      )}
      {upcomingTests.length === 0 && !isLoading && !error && (
        <p>No upcoming tests found within the next 3 hours.</p>
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
    year: "numeric", // Include year
    month: "short", // Short month name (e.g., Jan, Feb)
    day: "2-digit", // Pad with zero if needed (e.g., 01)
    hour: "2-digit", // Pad with zero if needed
    minute: "2-digit",
  });
  return formattedTime;
}
export default CurrTest;
