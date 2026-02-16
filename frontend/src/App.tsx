import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Markdown Memo App
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Backend says:{" "}
          <span className="font-semibold text-blue-600">
            {data ? data.message : "Loading..."}
          </span>
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
