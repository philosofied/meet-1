import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
  };

  handleClick = () => {
    this.setState((previousState) => ({
      showDetails: !previousState.showDetails,
    }));
  };

  render() {
    const { event } = this.props;
    const { showDetails } = this.state;

    const eventISODateTime = new Date(event.start.dateTime);
    const eventDate = eventISODateTime.toDateString();
    const eventTime = eventISODateTime.toTimeString();
    const eventTimeFormatted = `${eventTime.slice(0, 5)} ${eventTime.slice(
      18
    )}`;

    return (
      <div className="event">
        <div className="event-summary">
          <h2 className="event-name">{event.summary}</h2>
          <p className="event-location">{event.location}</p>
          <div className="event-time-date">
            <p>{eventDate}</p>
            <p>{eventTimeFormatted}</p>
          </div>
        </div>

        {showDetails ? (
          <div>
            <div className="event-details">
              <p className="event-description">{event.description}</p>
              <a href={event.htmlLink}>See details on Google Calendar</a>
            </div>
            <button className="details-btn" onClick={() => this.handleClick()}>
              Hide details
            </button>
          </div>
        ) : (
          <button className="details-btn" onClick={() => this.handleClick()}>
            Show details
          </button>
        )}
      </div>
    );
  }
}

export default Event;
