import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    const event = mockData[0];
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={event} />);
    });

    beforeEach(() => {
        EventWrapper.setState({
            showDetails: false
        });
    });

    test('render event element', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('render event summary', () => {
        expect(EventWrapper.find('.event-summary')).toHaveLength(1);
    });

    test('render event summary content', () => {
        expect(EventWrapper.find('.event-summary').children()).toHaveLength(3);
    });

    test('render show details button', () => {
        expect(EventWrapper.find('button')).toHaveLength(1);
    });

    test('change showDetails state when button clicked', () => {
        EventWrapper.find('button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
    });

    test('render event details when button clicked', () => {
        EventWrapper.find('button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
        expect(EventWrapper.find('.event-details')).toHaveLength(1);
        expect(EventWrapper.find('.event-details').children()).toHaveLength(2);
    });

    test('toggle display of event details with each button click', () => {
        EventWrapper.find('button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
        expect(EventWrapper.find('.event-details')).toHaveLength(1);
        expect(EventWrapper.find('.event-details').children()).toHaveLength(2);

        EventWrapper.find('button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(false);
        expect(EventWrapper.find('.event-details')).toHaveLength(0);
        expect(EventWrapper.find('.event-details').children()).toHaveLength(0);
    });

    test('toggle show/hide details wording on button', () => {
        EventWrapper.find('button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
        expect(EventWrapper.find('.show-details-btn')).toHaveLength(0);
        expect(EventWrapper.find('.hide-details-btn')).toHaveLength(0);

        EventWrapper.find('button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(false);
        expect(EventWrapper.find('.show-details-btn')).toHaveLength(0);
        expect(EventWrapper.find('.hide-details-btn')).toHaveLength(0);
    })
});