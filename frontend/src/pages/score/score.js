import React, { useState } from 'react';
import './score.css';
import { host } from '../../config/constraints';

const ScorePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false); // State to track result display

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);
    setShowResults(false); // Reset the show results flag
    const Sbd = inputValue;

    try {
      const response = await fetch(`${host}students/scores/${Sbd}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Cant find the student');
      }

      const data = await response.json();
      setResults(data);
      setShowResults(true); // Show results after fetching data
    } catch (error) {
      console.error(error);
      setError('Get scores failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-auto p-6`}>
      <h1 className={`text-3xl font-semibold mb-6 ${showResults ? 'transition-transform transform -translate-y-8' : ''}`}>Score Search</h1>

      <div className={`flex items-center space-x-4 mb-6 w-full max-w-md ${showResults ? 'transition-transform transform -translate-y-8' : ''}`}>
      <div className="hidden sm:block">
            <div className="relative">
              <button onClick={handleSearch} className="absolute left-0 top-1/2 -translate-y-1/2" >
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className=" h-10 w-full bg-transparent pl-9 pr-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent xl:w-125 dark:text-white dark:focus:ring-blue-300 border border-gray-300 rounded-xl"
                value={inputValue}
                onChange={handleInputChange}
                />

            </div>
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 font-semibold rounded-lg shadow transition duration-200 hover:bg-blue-500 bg-blue-900 text-white"
        >
          Search
        </button>
      </div>

      {isLoading && <p className="font-medium">Loading...</p>}

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {showResults && result && (
        <div className=" bg-boxdark drop-shadow-1 dark:bg-white dark:drop-shadow-none rounded-lg overflow-hidden w-full max-w-3xl mt-6">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3">Student ID (SBD)</th>
                <th className="px-4 py-3">Toán</th>
                <th className="px-4 py-3">Ngữ Văn</th>
                <th className="px-4 py-3">Ngoại Ngữ</th>
                <th className="px-4 py-3">Vật Lý</th>
                <th className="px-4 py-3">Hóa Học</th>
                <th className="px-4 py-3">Sinh Học</th>
                <th className="px-4 py-3">Lịch Sử</th>
                <th className="px-4 py-3">Địa Lí</th>
                <th className="px-4 py-3">GDCD</th>
                <th className="px-4 py-3">Mã Ngoại Ngữ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">{result.sbd ? <strong>{result.sbd}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.toan ? <strong>{result.toan}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.ngu_van ? <strong>{result.ngu_van}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.ngoai_ngu ? <strong>{result.ngoai_ngu}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.vat_li ? <strong>{result.vat_li}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.hoa_hoc ? <strong>{result.hoa_hoc}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.sinh_hoc ? <strong>{result.sinh_hoc}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.lich_su ? <strong>{result.lich_su}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.dia_li ? <strong>{result.dia_li}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.gdcd ? <strong>{result.gdcd}</strong> : "N/A"}</td>
                <td className="px-4 py-2">{result.ma_ngoai_ngu ? <strong>{result.ma_ngoai_ngu}</strong> : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScorePage;
