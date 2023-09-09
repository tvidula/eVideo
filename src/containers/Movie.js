import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import CatalogService from '../services/CatalogService';

export default function Movie() {
    const [movieData, setMovieData] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (movieData.name == undefined || movieData.id != id) {
            CatalogService.Get(id).then(res => {
                //console.log(res.data);
                setMovieData(res.data);
            });

            CatalogService.GetAll().then(res => {
                //console.log(res.data);
                setSimilarMovies(res.data);
            });
        }
    });
    return (
        <div>
            <div className="row" style={{ margin: '-20px 0', background: '#212529' }}>
                <div className='col-md-5 text-white'>
                    <div className='container pt-5 px-5'>
                        <h4 className='pt-5'>{movieData.name}</h4>
                        <h6>{movieData.language}</h6>
                        <p className='pt-1'>{movieData.description}</p>
                        <Link to={`/movie/player/${id}`} className='btn btn-primary'>Watch Movie</Link>
                    </div>
                </div>
                <div className='col-md-7 col-sm-12 movie-gradient'>
                    <img src={movieData.banner} alt="" className="img-slider" />
                </div>
            </div>
            <div className="container">
                <h2 className="mb-3 pt-4">Similar Movies</h2>
                <div className="row">
                    {
                        similarMovies.map((item, index) => {
                            return <div key={index} className="col-sm-2" style={{ paddingBottom: '15px' }}>
                                <Link to={`/movie/${item.id}`}>
                                    <div className="card box-shadow">
                                        <img className="card-img-top" src={item.thumbnail} alt="" />
                                        <div className="card-body d-none">
                                            <h4 className="card-title">{item.name}</h4>
                                            <h6 className="card-subtitle">{item.language}</h6>
                                            <p className="card-text">{item.summary}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
