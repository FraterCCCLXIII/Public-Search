import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:8090/yacysearch.json"; // Local YaCy node

function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Public</h1>
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the P2P Web..." />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q") || "";
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`${API_URL}?query=${encodeURIComponent(query)}&maximumRecords=20&resource=local`)
      .then(res => res.json())
      .then(data => {
        setResults(data.channels || []);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl mb-4">Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((item, i) => (
            <li key={i} className="p-4 border rounded-xl">
              <a href={item.link} className="text-lg font-semibold text-blue-600" target="_blank" rel="noreferrer">
                {item.title || item.link}
              </a>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-400">{item.link}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}
