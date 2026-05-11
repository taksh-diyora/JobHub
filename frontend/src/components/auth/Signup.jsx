import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'

const Signup = () => {
    const [input, setInput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const changeFileHandler = (e) => {
        setInput({...input, file:e.target.files?.[0]});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        
        if(input.file){
            formData.append("file", input.file);
        }

        try{
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers:{
                    "Content-Type":"multipart/form-data",
                },
                withCredentials:true
            });

            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-4'>
                        <Label className='mb-1'>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Taksh"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='mb-1'>Email</Label>
                        <Input
                            type="email"
                            placeholder="taksh@gmail.com"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='mb-1'>Phone Number</Label>
                        <Input
                            type="text"
                            placeholder="1234567890"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='mb-1'>Password</Label>
                        <Input
                            type="password"
                            placeholder="********"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center w-1/2 gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                name="file"
                                onChange={changeFileHandler}
                                className='cursor-pointer w-fit'
                            />
                        </div>
                    </div>
                    <Button type="submit" className='w-full my-4 cursor-pointer'>Signup</Button>
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup