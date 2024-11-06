import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

interface Joke {
  id: string;
  value: string;
}

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchJokes = async () => {
      const responses = await Promise.all([
        fetch("https://api.chucknorris.io/jokes/random"),
        fetch("https://api.chucknorris.io/jokes/random"),
        fetch("https://api.chucknorris.io/jokes/random"),
      ]);
      const jokesData = await Promise.all(responses.map((res) => res.json()));
      setJokes(jokesData);
    };

    fetchJokes();
  }, []);

  const filteredJokes = jokes.filter((joke) =>
    joke.value.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter jokes"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {filteredJokes.map((joke) => (
            <tr key={joke.id}>
              <td>{joke.id}</td>
              <td>{joke.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
