import React from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
	const dispatch = useDispatch();

	const [formLoginValues, handleLoginInputChange] = useForm({
		lEmail: 'test@test.com',
		lPassword: '123456',
	});

	const [formRegisterValues, handleRegisterInputChange] = useForm({
		rName: 'Julio',
		rEmail: 'julio@test.com',
		rPassword1: '123456',
		rPassword2: '123456',
	});

	const { lEmail, lPassword } = formLoginValues;

	const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

	const handleLogin = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startLogin(lEmail, lPassword));
		}
	};

	const handleRegister = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startRegister(rEmail, rPassword1, rName));
		}
	};

	const isFormValid = () => {
		// If there is no name it shows an Error message
		if (rName.trim().length === 0) {
			Swal.fire('Error', 'Name is required', 'error');
			return false;
			// If there is no email correct sintax it shows and
			// Error message
		} else if (!validator.isEmail(rEmail)) {
			Swal.fire('Error', 'You must entry an e-mail', 'error');
			return false;
			// If the password and its confirmation are not equals or
			// dont have at least 5 characters shows an Error message
		} else if (rPassword1 !== rPassword2 || rPassword1.length < 5) {
			Swal.fire(
				'Error',
				'Password should be at least 6 characters and should match each other',
				'error'
			);
			return false;
		}

		return true;
	};

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Sign In</h3>
					<form onSubmit={handleLogin}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Email'
								name='lEmail'
								value={lEmail}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								autoComplete='off'
								name='lPassword'
								value={lPassword}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className='form-group'>
							<input type='submit' className='btnSubmit' value='Login' />
						</div>
					</form>
				</div>

				<div className='col-md-6 login-form-2'>
					<h3>Sign Up</h3>
					<form onSubmit={handleRegister}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Name'
								name='rName'
								value={rName}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='email'
								className='form-control'
								placeholder='Email'
								name='rEmail'
								value={rEmail}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								autoComplete='off'
								name='rPassword1'
								value={rPassword1}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Confirm your password'
								autoComplete='off'
								name='rPassword2'
								value={rPassword2}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className='form-group'>
							<input type='submit' className='btnSubmit' value='Register' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
