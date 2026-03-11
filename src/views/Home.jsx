
import { useState } from "react";
import axios from "axios";

function Home() {

  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("india");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const loadNews = async () => {
    try {

     const url = `${import.meta.env.VITE_NEWS_BASE_URL}?q=${query}&from=${fromDate}&to=${toDate}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;

      const response = await axios.get(url);

      setNews(response.data.articles);

    } catch (error) {
      console.log("Error loading news:", error);
    }
  };

  return (<div className="min-h-screen bg-[#EDF7BD]">

  {/* Hero Section */}
  <div className="bg-[#281C59] text-white py-12 text-center">
    <h1 className="text-4xl font-bold mb-2">News Explorer 📰</h1>
    <p className="text-lg text-[#85C79A]">Search latest news from around the world</p>
  </div>

  <div className="p-6">

    {/* Search Section */}
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto mb-10 border-t-4 border-[#4E8D9C]">

      <div className="flex flex-wrap gap-4 justify-center">

        <input
          type="text"
          placeholder="Search topic..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-[#4E8D9C]"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e)=>setFromDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E8D9C]"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e)=>setToDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E8D9C]"
        />

        <button
          onClick={loadNews}
          className="bg-[#4E8D9C] hover:bg-[#281C59] text-white px-6 py-2 rounded-lg transition"
        >
          Search
        </button>

      </div>
    </div>

    {/* News Cards */}
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

      {news.map((item,index)=>{

        const { title, description, url, urlToImage } = item;

        return(
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden border-b-4 border-[#85C79A]"
          >

            <img
              src={urlToImage || "https://via.placeholder.com/400"}
              alt={title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">

              <h2 className="text-lg font-bold text-[#281C59] mb-2 line-clamp-2">
                {title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {description}
              </p>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#85C79A] text-[#281C59] px-4 py-2 rounded-lg hover:bg-[#4E8D9C] hover:text-white transition"
              >
                Read More
              </a>

            </div>

          </div>
        );
      })}

    </div>

  </div>
</div>
  );
}

export default Home;