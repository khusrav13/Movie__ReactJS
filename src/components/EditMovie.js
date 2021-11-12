import React, { Component, Fragment } from 'react'
import './EditMovie.css'
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
    }

     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

}

handleSubmit = (e) => {
    console.log("Form was submited")
    e.preventDefault()
}

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

componentDidMount() {
   
}

    render() {
        let {movie} = this.state;

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
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={movie.title}
                            onChange={this.handleChange}/>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="release_date" className="form-label">
                            Release
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="release_date"
                            name="release_date"
                            value={movie.release_date}
                            onChange={this.handleChange}
                            />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="runtime" className="form-label">
                            Runtime
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="runtime"
                            name="runtime"
                            value={movie.runtime}
                            onChange={this.handleChange}
                            />
                    </div>

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
                            <option value="PG14">PG14</option>
                            <option value="R">R</option>
                       </select>
                    </div>
                       
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">
                            Rating
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="rating"
                            name="rating"
                            value={movie.rating}
                            onChange={this.handleChange}
                            />
                    </div>

                    <div className="mb-3">
                       <label htmlFor="rating" className="form-label">
                            Description
                        </label>

                        <textarea className="form-control" 
                        id="description" 
                        name="description" rows="3" 
                        onChange={this.handleChange} 
                        value={movie.value}/>

                    </div>

                    <button className="btn btn-primary"> 
                        Save
                    </button>
                    
                </form>

                <div className="mt-3">
                    <pre>{JSON.stringify(this.state, null, 3)}</pre>
                </div>
            </Fragment>
        )
    }
}