import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card.js';

const CardContainer = ({events}) => {
  const rendered = events.map(event => {
    return <Card 
      name={event.name}
      city={event.city}
      state={event.state}
      date={event.date}
      time={event.time}
      venue={event.venue}
      ticketUrl={event.ticketUrl}
    />;
  });
  console.log(rendered)
  return (
    <div>
      {rendered}
    </div>
  );
};

export const mapStateToProps = store => ({
  events: store.events
});

export default connect(mapStateToProps)(CardContainer);