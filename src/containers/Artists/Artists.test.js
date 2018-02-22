import React from 'react';
import { shallow } from 'enzyme';
import { Artists, mapStateToProps, mapDispatchToProps } from './Artists.js';

describe('Artists', () => {

  it('snapshot test', () => {
    const wrapper = shallow(<Artists />);
    expect(wrapper).toMatchSnapshot();
  });

  it('map the store correctly', () => {
    const artist = {
      key: 9,
      name: 'name',
      city: 'city',
      state: 'state',
      date: 'date',
      time: 'time',
      venue: 'venue',
      ticketUrl: 'url'
    };
    const mockStore = {location: 'denver, co', allArtistEvents: [artist]};
    const mapped = mapStateToProps(mockStore);

    expect(mapped.location).toEqual(mockStore.location);
    expect(mapped.allArtistEvents).toEqual(mockStore.allArtistEvents);
  });

  it('call dispatch function after MDTP of setArtistInLocation', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.setArtistInLocation();
    expect(mockDispatch).toHaveBeenCalled();
  });
});