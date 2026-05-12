import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
    const navigate = useNavigate();
    const jobId = "jakfaskfnlaskdfnadfa";

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>2 days ago</p>
            <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src='https://cdn-icons-png.flaticon.com/128/5968/5968764.png' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet labore ut voluptas officiis recusandae totam praesentium sint, natus et beatae?</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='outline'>12 Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant='outline'>Part Time</Badge>
                <Badge className='text-[#7209D7] font-bold' variant='outline'>24LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant='outline' onClick={() => navigate(`/description/${jobId}`)}>Details</Button>
                <Button className='bg-[#7209D7]'>Save For Later</Button>
            </div>
        </div>
    )
}

export default Job