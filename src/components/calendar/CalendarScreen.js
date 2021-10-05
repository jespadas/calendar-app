import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';
import { Navbar } from '../ui/Navbar';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventClearActive, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

// TODO: #1 Translate to spanish
// TODO: On click in slot will set the date and hour from the event.

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {
	// Dispatch
	const dispatch = useDispatch();
	// Selector
	const { events, activeEvent } = useSelector((state) => state.calendar);
	// Set item into localStorage
	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month',
	);

	// Listernes
	const onDoubleClick = (e) => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		if (activeEvent) {
			dispatch(eventClearActive());
		} else {
			dispatch(uiOpenModal());
		}
	};

	// Event style
	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#367CF7',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};

		return {
			style,
		};
	};

	return (
		<div className='calendar-screen'>
			<Navbar />

			<Calendar
				components={{
					event: CalendarEvent,
				}}
				endAccessor='end'
				events={events}
				eventPropGetter={eventStyleGetter}
				localizer={localizer}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				onSelectSlot={onSelectSlot}
				selectable={true}
				startAccessor='start'
				view={lastView}
			/>

			<AddNewFab />

			{activeEvent && <DeleteEventFab />}

			<CalendarModal />
		</div>
	);
};
