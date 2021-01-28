import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

export default function News() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("react hooks");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchInputRef = useRef();

    /* useEffect(() => {
        axios.get('http://hn.algolia.com/api/v1/search')
        .then(response => {
            console.log("hi")
            setResults(response.data.hits);
        }) // useEffect will continue to execute unless we pass the empty array
    }, []) // ensures function gets called only on componentMount and not on updates */

    useEffect(() => { // alternative syntax
        getResults();
    }, [])

    const getResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
            setResults(response.data.hits);
        } catch (err) {
            setError(err)
        }
        setLoading(false);
    }

    const handleSearch = event => {
        event.preventDefault();
        getResults();
    }

    const handleClearSearch = () => {
        setQuery("");
        searchInputRef.current.focus();
    }

    return (
      <>
        <form onSubmit={handleSearch}>
            <input
                type="text"
                onChange={event => setQuery(event.target.value)}
                value={query}
                ref={searchInputRef}
            />
            <button type="submit">Search</button>
            <button type="button" onClick={handleClearSearch}>Clear</button>
        </form>
        {loading ? (<div>Loading...</div>) : (<ul>
        {results.map(result => (
            <li key={result.objectID}>
                <a href={result.url}>{result.title}</a>
            </li>
        ))}
        </ul>)}

        {error && <div>{error.message}</div>}
      </>
    );
}