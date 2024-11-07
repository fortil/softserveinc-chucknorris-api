import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

interface Joke {
  id: string;
  value: string;
}

const LikeButton: React.FC<{ onClick: () => void; likes: number }> = ({
  onClick,
  likes,
}) => (
  <button onClick={onClick}>
    <span>{likes}</span>
    👍
  </button>
);

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const fetchJokes = async (count: number) => {
    const responses = await Promise.all(
      new Array(count)
        .fill(null)
        .map(() => fetch("https://api.chucknorris.io/jokes/random"))
    );
    const jokesData = await Promise.all(responses.map((res) => res.json()));
    setJokes(jokesData);
  };

  useEffect(() => {
    fetchJokes(5);
  }, []);

  const handleLike = (id: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  };

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
            <th>Likes</th>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {filteredJokes.map((joke) => (
            <tr key={joke.id}>
              <td>
                <LikeButton
                  onClick={() => handleLike(joke.id)}
                  likes={likes[joke.id] || 0}
                />
              </td>
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
