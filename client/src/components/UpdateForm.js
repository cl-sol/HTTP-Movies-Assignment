import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateForm = props => {
    const { push } = useHistory();
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    });
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
        e.persist();
        let newStars = [];
        let value = e.target.value;
        if(e.target.name === "stars") {
            newStars.push(e.target.value);
            setMovie({
                ...movie,
                [e.target.name]: value,
                stars: newStars
            })
            } else {
                setMovie({
                    ...movie,
                    [e.target.name]: value,
                });
            }
        // if(e.target.name === "metascore") {
        //     value=parseInt(value, 10);
        // }
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