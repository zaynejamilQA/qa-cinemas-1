import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Image, Col, Button, Modal, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ModalStyle.css";

const SearchedMovie = ({ showModal, updateState, searchedMovie }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies/getAll")
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleClose = () => {
    updateState(false);
  };
  const handleFilter = (e) => {
    setFilterQuery(e.target.value.toLowerCase());
  };

  const showFilterList = () => {
    if (filterQuery.length >= 3) {
      return movies
        .filter((movie) => movie.title.toLowerCase().includes(filterQuery))
        .map((movie) => (
          <li>
            <Link
              to={{
                pathname: `/movieinfo/${movie.imdbID}`,
                state: { movie },
              }}
              style={{
                color: "white",
                display: "inline-block",
                marginBottom: "9px",
              }}
            >
              {movie.title}
            </Link>
          </li>
        ));
    } else {
      return <h4>{"No results found"}</h4>;
    }
  };
  // const movieRef = useRef("");
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { data } = await axios.get(
  //     // `http://www.omdbapi.com/?apikey=1fac6c28&s=${movieRef.current.value}&plot=full`
  //     `http://localhost:8080/api/movies/getAll`
  //   );
  //   console.log(data);
  //   setMovies(data.Search);
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await axios.get(
  //       `http://www.omdbapi.com/?apikey=1fac6c28&i=${id}`
  //     );
  //     setMovieInfo(data);
  //   }
  //   fetchData();
  //   console.log(id);
  // }, []);

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      keyboard={false}
      scrollable={true}
      style={{
        minHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>

      <Form>
        <FormControl type="text" placeholder="Search" onChange={handleFilter} />
      </Form>

      <h4 style={{ margin: "20px 10px", color: "white" }}>Search Result:</h4>

      <Col>
        <ul id="searchResults">{showFilterList()}</ul>
      </Col>
      <br />
    </Modal>
  );
};

export default SearchedMovie;