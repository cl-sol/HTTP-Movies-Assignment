import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateForm = props => {
    const { push } = useHistory();
    const { movie, setMovie } = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        e.persist();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res);
                props.setMovie(res.data);
                push(`/movies/`);
            })
            .catch(err => console.log(err));
    }
    
    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="movie title"
                    value={movie.title}
                    onChange={handleChanges}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="director"
                    value={movie.director}
                    onChange={handleChanges}
                />
                <input
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    value={movie.metascore}
                    onChange={handleChanges}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="stars"
                    value={movie.stars}
                    onChange={handleChanges}
                />
                <button type="submit">Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateForm;