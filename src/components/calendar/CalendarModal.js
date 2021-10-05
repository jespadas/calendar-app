import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import {
	eventAddNew,
	eventClearActive,
	eventUpdate,
} from '../../actions/events';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

// Bind modal to the appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

// Set the start and end date
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

// Set initial event state
const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlus1.toDate(),
};

//TODO #2 use Swal

export const CalendarModal = () => {
	// Dispatch
	const dispatch = useDispatch();

	// Selector
	const { modalOpen } = useSelector((state) => state.ui);
	const { activeEvent } = useSelector((state) => state.calendar);

	// Start and end date states
	const [startDate, setStartDate] = useState(now.toDate());
	const [endDate, setEndDate] = useState(nowPlus1.toDate());

	// Form handler
	const [formValues, setFormValues] = useState(initEvent);
	const { title, notes, start, end } = formValues;

	// Effect
	useEffect(() => {
		if (activeEvent) {
			setFormValues(activeEvent);
		} else {
			setFormValues(initEvent);
		}
	}, [activeEvent, setFormValues]);

	useEffect(() => {
		if (startDate !== null) {
			setEndDate(moment(startDate).add(1, 'hours').toDate());
		}
	}, [startDate]);

	// Listeners
	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const handleStartDateChange = (e) => {
		console.log(e, 'string');
		setFormValues({
			...formValues,
			start: e,
		});
		setStartDate(e);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e);
		setFormValues({
			...formValues,
			end: e,
		});
	};

	// Validate form
	const handleSubmitForm = (e) => {
		e.preventDefault();

		const momentStart = moment(start);
		const momentEnd = moment(end);

		console.log(momentStart);
		console.log(end);

		if (momentStart.isSameOrAfter(momentEnd, 'hour')) {
			console.log('error');
			return Swal.fire(
				'Error',
				'The end date must be at least the same of the start date.',
				'error'
			);
		}

		if (title.trim().length < 2) {
			return Swal.fire(
				'Error',
				'The event title description must have more than 5 characters.',
				'error'
			);
		}

		if (activeEvent) {
			dispatch(eventUpdate(formValues));
		} else {
			dispatch(
				eventAddNew({
					...formValues,
					id: new Date().getTime(),
					user: {
						_id: '123ABC',
						name: 'Julio',
					},
				})
			);
		}

		closeModal();
	};

	const closeModal = () => {
		dispatch(uiCloseModal());
		dispatch(eventClearActive());
		setFormValues(initEvent);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Modal
				className='modal'
				closeTimeoutMS={200}
				overlayClassName='modal-fondo'
				isOpen={modalOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<h1> {activeEvent ? 'Edit event' : 'New event'} </h1>
				<hr />
				<form className='container' onSubmit={handleSubmitForm} noValidate>
					<div className='form-group'>
						<DateTimePicker
							inputVariant='outlined'
							ampm={false}
							label='Start date'
							value={startDate}
							onChange={handleStartDateChange}
							format='MMMM dd yyyy, HH:mm '
						/>
					</div>

					<div className='form-group'>
						<DateTimePicker
							inputVariant='outlined'
							ampm={false}
							label='End date'
							value={endDate}
							onChange={handleEndDateChange}
							format='MMMM dd yyyy, HH:mm '
						/>
					</div>

					<hr />
					<div className='form-group'>
						<label>Title and description</label>
						<input
							type='text'
							className='form-control'
							placeholder='Event title'
							name='title'
							autoComplete='off'
							value={title}
							onChange={handleInputChange}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							Short description
						</small>
					</div>

					<div className='form-group'>
						<textarea
							type='text'
							className='form-control'
							placeholder='Notes'
							rows='5'
							name='notes'
							value={notes}
							onChange={handleInputChange}
						></textarea>
						<small id='emailHelp' className='form-text text-muted'>
							Aditional info
						</small>
					</div>

					<button type='submit' className='btn btn-outline-primary btn-block'>
						<i className='far fa-save'></i>
						<span> Save</span>
					</button>
				</form>
			</Modal>
		</MuiPickersUtilsProvider>
	);
};
