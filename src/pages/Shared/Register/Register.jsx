import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/AuthProviders';
import SocialLogin from '../../../components/SocialLogin';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    // reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })



                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <div className='row mx-auto'>
            <h2 className='text-center mb-5'>Registration Page</h2>
            <div className='col-md-6'>
                <img src="https://i.gifer.com/X0XF.gif" alt="" className='w-100' />
            </div>
            <div className="col-md-6">
                <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span className="text-danger">Name is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className="text-danger">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            {...register('password', { required: true, minLength: 6 })}
                        />
                        {errors.password?.type === 'required' && (
                            <span className="text-danger">Password is required</span>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <span className="text-danger">Password must be at least 6 characters long</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: true,
                                validate: (value) =>
                                    value === document.getElementById('password').value,
                            })}
                        />
                        {errors.confirmPassword?.type === 'required' && (
                            <span className="text-danger">Confirm Password is required</span>
                        )}
                        {errors.confirmPassword?.type === 'validate' && (
                            <span className="text-danger">Passwords do not match</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="photoUrl">Photo URL:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="photoUrl"
                            {...register('photoUrl', { required: true })}
                        />
                        {errors.photoUrl && <span className="text-danger">Photo URL is required</span>}
                    </div>
                    <div className="form-group">
                        <Link to="/login">Already have an account</Link>
                    </div>
                    <button type="submit" className="btn btn-primary my-2">Register</button>
                </form>
                <SocialLogin/>
            </div>

        </div>
    );
};

export default Register;
