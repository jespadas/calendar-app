import moment from 'moment';
import { types } from '../types/types.';

const initialState = {
	events: [
		{
			id: new Date().getTime(),
			title: 'Birthday',
			start: moment().toDate(), // new Date
			end: moment().add(2, 'hours').toDate(),
			bgcolor: '#fafafa',
			notes: 'Buy the birthday cake',
			user: {
				_id: '124',
				name: 'Julio',
			},
		},
	],
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};

		case types.eventAddNew:
			return {
				...state,
				events: [...state.events, action.payload],
			};
		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent: null,
			};
		case types.eventUpdate:
			return {
				...state,
				events: state.events.map((e) =>
					e.id === action.payload.id ? action.payload : e
				),
			};
		case types.eventDelete:
			return {
				...state,
				events: state.events.filter((e) => e.id !== state.activeEvent.id),
				activeEvent: null,
			};

		default:
			return state;
	}
};
