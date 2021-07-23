import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { WarningAlert } from "./Alert";
import { OfflineAlert } from './Alert';
import "./nprogress.css";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EventGenre from "./EventGenre";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 22,
    currentLocation: "all",
    infoText: "",
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      const { numberOfEvents } = this.state;
      if (this.mounted) {
        const filteredEvents = events.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          locations: extractLocations(events),
        });
      }

      if (!navigator.onLine) {
        if (!navigator.onLine) {
          this.setState({
            offlinealert: 'Cached data is being displayed.'
          })
        }
        else {
          this.setState({
            warningText: ''
          })
        }
      }
    });
  }


  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === "all"
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length;
      const city = location.split(" ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <h1>Let's Meet!</h1>
        <h4>Select your nearest city</h4>
        <div className="offline-alert">
          <WarningAlert text={this.state.infoText} />
        </div>
        <CitySearch
          updateEvents={this.updateEvents}
          locations={this.state.locations}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
        <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#530d78" />
            </ScatterChart>
          </ResponsiveContainer> 
        </div>
        <OfflineAlert text={this.state.offlinealert} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;