import React, { Component, Fragment } from 'react'
import './EditMovie.css'
import '../components/form-components/Input.js'
import Input from '../components/form-components/Input.js';
import Description from './form-components/Description';


export default class EditMovie extends Component {
    state = {
        movie: [],
        isLoaded: false,
        error: null,
    };

constructor(props) {
    super(props);
    this.state = {
        movie: {
            id: 0,
            title: "",
            release_date: "",
            runtime: "",
            mpaa_rating: "",
            rating: "",
            description: "",
        },
        isLoaded: false,
        error: null,
        errors: [],
    }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

}

handleSubmit = (e) => {
    e.preventDefault()

    // validation

    let errors = [];
    if (this.state.movie.title === "") {
        errors.push("title");
    }

    this.setState({errors: errors});

    if (errors.length > 0 ) {
        return false;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());
    console.log(payload);

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload)
    };

    fetch('http://localhost:4000/v1/admin/editmovie', requestOptions) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
};

handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => ({
        movie: {
            ...prevState.movie,
            [name]: value,
        }
    }))
}

hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
}

componentDidMount() {
   const id = this.props.match.params.id;
   if (id > 0) {
       fetch("http://localhost:4000/v1/movie/"+id)
        .then((response) => {
            if (response.status !== "200") {
                let err = Error;
                err.Message = "Invalid response code: " + response.status;
                this.setState({error: err});
            }
            return response.json();
        })
        .then((json) => {
            const releaseDate = new Date(json.movie.release_date);

            this.setState (
                {
                    movie: {
                        id: id,
                        title: json.movie.title,
                        release_date: releaseDate.toISOString().split("T")[0],
                        runtime: json.movie.runtime,
                        mppa_rating: json.movie.mppa_rating,
                        rating: json.movie.rating,
                        description: json.movie.description
                    },
                    isLoaded: true,
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    })
                }
            )
        })
   } else {
       this.setState({isLoaded: true})
   }
}

    render() {
        let {movie, isLoaded, error} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading... </p>
        } else {
                return (
                    <Fragment>
                        <h2>Add/Edit Movie</h2>
                        <hr />

                        <form onSubmit={this.handleSubmit}>
                            <input 
                                type="hidden"
                                name="id"
                                id="id"
                                value={movie.id}
                                onChange={this.handleChange}
                            />
                        
                            <Input 
                                title={"Title"}
                                className={this.hasError("title") ? "is-invalid" : ""}
                                type={"text"}
                                name={"title"}
                                value={movie.title}
                                handleChange={this.handleChange}
                                errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                                errorMsg={"Error, please enter a title"}
                            />
                            
                            <Input 
                                title={"Release Date"}
                                type={"date"}
                                name={'release_date'}
                                value={movie.release_date}
                                handleChange={this.handleChange}
                            />

                            <Input 
                                title={"Runtime"}
                                type={"text"}
                                name={'runtime'}
                                value={movie.runtime}
                                handleChange={this.handleChange}
                            />

                            <div className="mb-3">
                                <label htmlFor="mpaa_rating" className="form-label" >
                                    MPAA Rating 
                                </label>
                                <select className="form-select selectform"            
                                    value={movie.mpaa_rating}
                                    onChange={this.handleChange}
                                    name="mpaa_rating">
                                    <option value="G">G</option>
                                    <option value="PG">PG</option>
                                    <option value="PG13">PG-13</option>
                                    <option value="R">R</option>
                            </select>
                            </div>
                            

                            <Input 
                                title={"Rating"}
                                type={"text"}
                                name={'rating'}
                                value={movie.rating}
                                handleChange={this.handleChange}
                            />

                            <Description 
                                title={"Description"}
                                name={"description"}
                                value={movie.description}
                                rows={"3"}
                                handleChange={this.handleChange}
                            />

                            <button className="btn btn-primary"> 
                                Save
                            </button>
                            
                        </form>

                        <div className="mt-3">
                            <pre>{JSON.stringify(this.state, null, 3)}</pre>
                        </div>
                    </Fragment>
                );
            }
    }
}