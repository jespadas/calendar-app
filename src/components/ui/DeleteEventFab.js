import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDelete } from '../../actions/events';

export const DeleteEventFab = () => {
	const dispatch = useDispatch();

	const handleDeleteClick = () => {
		dispatch(eventDelete());
	};

	return (
		<button className='btn btn-danger fab-danger' onClick={handleDeleteClick}>
			<i className='fas fa-trash'></i>
		</button>
	);
};
