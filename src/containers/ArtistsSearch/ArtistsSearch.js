import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ArtistsSearch.css';
import { 
  setLocation, 
  fetchApiEvents, 
  fetchArtist, 
  setArtistInLocation 
} from '../../actions/actions.js';

export class ArtistsSearch extends Component {
  constructor () {
    super();
    this.state = {
      artist: '',
      favArtists: []
    };
  }

  inputHandler = (e) => {
    const artist = e.target.value;
    this.setState({artist});
  }

  submitHandler = async(e) => {
    e.preventDefault();
    const location = this.getFromLocalStorage();
    const splitLocation = location.split(', ');

    this.sendArtistToStore(splitLocation);
    this.setState({artist: ''});
  }

  sendArtistToStore = async(splitLocation) => {
    const { fetchArtist, setArtistInLocation} = this.props;
    const artistData = await fetchArtist(this.state.artist);
    const filtered = artistData.allArtistsEvents.find(
      artist => artist.city === splitLocation[0]
    );

    const { artistInLocation } = setArtistInLocation(filtered);
    this.setState({favArtists: [...this.state.favArtists, artistInLocation]});
    localStorage.setItem('favArtists', JSON.stringify(this.state.favArtists))
  }
  
  getFromLocalStorage = () => {
    const location = localStorage.getItem('location');
    return location;
  }

  render () {
    return (
      <div>
        <form className='artist-form' onSubmit={(e) => this.submitHandler(e)}>
          <input
            onChange={(e) => this.inputHandler(e)} 
            type='text'
            placeholder='Enter an artist'
            value={this.state.artist}
          />
          <button>search</button>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = store => ({
  events: store.events,
  location: store.location,
  allArtistEvents: store.allArtistsEvents,
  artistInLocation: store.artistInLocation
});

export const mapDispatchToProps = dispatch => ({
  fetchApiEvents: (locationKey) => dispatch(fetchApiEvents(locationKey)),
  setLocation: location => dispatch(setLocation(location)),
  fetchArtist: artistName => dispatch(fetchArtist(artistName)),
  setArtistInLocation: artist => dispatch(setArtistInLocation(artist))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsSearch);

ArtistsSearch.propTypes = {
  fetchArtist: PropTypes.func,
  location: PropTypes.string, 
  setArtistInLocation: PropTypes.func
};