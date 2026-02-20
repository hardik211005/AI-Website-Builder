import React, { useEffect, useState } from 'react'
import type { Project } from '../types'
import {Loader2Icon, PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyProjects } from '../assets/assets';

const MyProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([])
  const navigate = useNavigate()
  const fetchProjects = async () => {
    setProjects(dummyProjects)
    //simulate loading
    setTimeout(() => {
      setLoading(false)
  },1000)
  }
  useEffect(() => {
    fetchProjects()
  }, [])
  return (
    <>
    <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
      {loading ? (
        <div className='flex items-center justify-center h-[80vh]'>
          <Loader2Icon className='size-7 animate-spin text-indigo-200'/>
        </div>
      ) : projects.length > 0 ?(
       <div className='py-10 min-h-[80vh]'>
        <div className='flex items-center justify-between mb-12'>
          <h1 className='text-2xl font-medium text-white'>My Projects </h1>
          <button onClick={()=> navigate('/')} className='flex items-center gap-2 text-white px-3 sm:px-6 py-1 sm:py-2 rounded bg-gradient-to-br from-indigo-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all'><PlusIcon size = {18}/> Create New </button>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className='bg-gray-800/50 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800/70 transition-all border border-gray-700/50 hover:border-indigo-500/50'
            >
              <div className='aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center'>
                <span className='text-4xl'>🌐</span>
              </div>
              <div className='p-4'>
                <h3 className='text-lg font-medium text-white mb-2'>{project.name}</h3>
                <p className='text-sm text-gray-400 line-clamp-2'>{project.initial_prompt}</p>
                <div className='mt-4 flex items-center justify-between text-xs text-gray-500'>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  <span className='px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded'>
                    {project.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
       </div> 
      ): (
        <div className='flex flex-col items-center justify-center gap-6 h-[80vh]'>
          <h1 className='text-3xl font-semibold text-gray-300'>You have no projects yet!</h1>
          <button onClick={()=> navigate('/')} className='text-white px-5 py-2 mt-5 rounded-md bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all'>
            Create New
          </button>
        </div>
      )} 
    </div>
    </>
  )
}

export default MyProjects