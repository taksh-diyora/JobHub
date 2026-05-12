import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);

    const [input, setInput] = useState({
        fullname:user?.fullname || "",
        email:user?.email || "",
        phoneNumber:user?.phoneNumber || "",
        bio:user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file:user?.profile?.resume
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if(input.file){
            formData.append("file", input.file);
        }

        try{
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });

            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        }catch(error){
            toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className='text-right flex justify-end'>Name</Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={input.fullname}
                                    type='text'
                                    onChange={changeEventHandler}
                                    name='fullname'
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className='text-right flex justify-end'>Email</Label>
                                <Input
                                    id="email"
                                    className="col-span-3"
                                    value={input.email}
                                    type='email'
                                    onChange={changeEventHandler}
                                    name='email'
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className='text-right w-max flex justify-end'>Phone Number</Label>
                                <Input
                                    id="number"
                                    className="col-span-3"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    name='phoneNumber'
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className='text-right flex justify-end'>Bio</Label>
                                <Input
                                    id="bio"
                                    className="col-span-3"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    name='bio'
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className='text-right flex justify-end'>Skills</Label>
                                <Input
                                    id="skills"
                                    className="col-span-3"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    name='skills'
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className='text-right flex justify-end'>Resume</Label>
                                <Input
                                    id="file"
                                    className="col-span-3"
                                    name='file'
                                    type='file'
                                    onChange={fileChangeHandler}
                                    accept="application/pdf"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className=' disabled w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
                                    : <Button type="submit" className='w-full my-4 cursor-pointer'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog