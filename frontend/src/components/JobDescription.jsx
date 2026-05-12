import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
    const isApplied = true;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-xl'>Frontend Developer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant='outline'>12 Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant='outline'>Part Time</Badge>
                        <Badge className='text-[#7209D7] font-bold' variant='outline'>24LPA</Badge>
                    </div>
                </div>
                <Button disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209D7] hover:bg-[#5805a5]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium my-4 py-3'>Job Description</h1>
            <div className='my-4'>
                <div className="font-bold my-1">Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></div>
                <div className="font-bold my-1">Location: <span className='pl-4 font-normal text-gray-800'>Hyderabad</span></div>
                <div className="font-bold my-1">Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, libero facilis eligendi eos quod vel delectus modi quidem atque beatae.</span></div>
                <div className="font-bold my-1">Experience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></div>
                <div className="font-bold my-1">Salary: <span className='pl-4 font-normal text-gray-800'>12LPA</span></div>
                <div className="font-bold my-1">Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></div>
                <div className="font-bold my-1">Posted Date: <span className='pl-4 font-normal text-gray-800'>12-05-2026</span></div>
            </div>
        </div>
    )
}

export default JobDescription