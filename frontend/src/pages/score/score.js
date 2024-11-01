import React, { useState } from 'react';
import './score.css';
import { host } from '../../config/constraints';
const ScorePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = async (e) => {
        
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResults(null);
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
    
          console.log(data);
          setResults(data);
        } catch (error) {
          console.error(error);
          setError('Get scores failed. Please check your credentials and try again.');
        } finally {
          setIsLoading(false);
        }

    };

    return (
        <div className="score-page">
        <h1>Score Search</h1>
        <div className="input-container">
            <input
            type="text"
            placeholder="Enter student ID"
            value={inputValue}
            onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
        {isLoading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {result && (
                <div className="result-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Student ID (SBD)</th>
                                <th>Toán</th>
                                <th>Ngữ Văn</th>
                                <th>Ngoại Ngữ</th>
                                <th>Vật Lý</th>
                                <th>Hóa Học</th>
                                <th>Sinh Học</th>
                                <th>Lịch Sử</th>
                                <th>Địa Lí</th>
                                <th>GDCD</th>
                                <th>Mã Ngoại Ngữ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{result.sbd !== null ? <strong>{result.sbd}</strong> : "N/A" }</td>
                                <td>{result.toan !== null ? <strong>{result.toan}</strong> : "N/A"}</td>
                                <td>{result.ngu_van !== null ? <strong>{result.ngu_van}</strong> : "N/A"}</td>
                                <td>{result.ngoai_ngu !== null ? <strong>{result.ngoai_ngu}</strong> : "N/A"}</td>
                                <td>{result.vat_li !== null ? <strong>{result.vat_li}</strong> : "N/A"}</td>
                                <td>{result.hoa_hoc !== null ? <strong>{result.hoa_hoc}</strong> : "N/A"}</td>
                                <td>{result.sinh_hoc !== null ? <strong>{result.sinh_hoc}</strong> : "N/A"}</td>
                                <td>{result.lich_su !== null ? <strong>{result.lich_su}</strong> : "N/A"}</td>
                                <td>{result.dia_li !== null ? <strong>{result.dia_li}</strong> : "N/A"}</td>
                                <td>{result.gdcd !== null ? <strong>{result.gdcd}</strong> : "N/A"}</td>
                                <td>{result.ma_ngoai_ngu !== null ? <strong>{result.ma_ngoai_ngu}</strong> : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ScorePage;
