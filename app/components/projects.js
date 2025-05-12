import React from 'react';


export default function Projects() {
    const Projects = [
        {
            title: 'The Other Guys',
            description: 'lorem15',
            liveUrl: 'Theotherguyske.org',
            techStack: ['Php', 'Tailwind', 'MySQL'],
            imageUrl: '/images/clear1.png'
        },
        {
            title: 'The Other Guys',
            description: 'lorem15',
            liveUrl: 'Theotherguyske.org',
            techStack: ['Php', 'Tailwind', 'MySQL'],
            imageUrl: '/images/clear1.png'
        },
        {
            title: 'The Other Guys',
            description: 'lorem15',
            liveUrl: 'Theotherguyske.org',
            techStack: ['Php', 'Tailwind', 'MySQL'],
            imageUrl: '/images/clear1.png'
    
        },
        
        {
            title: 'The Other Guys',
            description: 'lorem15',
            liveUrl: 'Theotherguyske.org',
            techStack: ['Php', 'Tailwind', 'MySQL'],
            imageUrl: '/images/clear1.png'
        },
        {
            title: 'The Other Guys',
            description: 'lorem15',
            liveUrl: 'Theotherguyske.org',
            techStack: ['Php', 'Tailwind', 'MySQL'],
            imageUrl: '/images/clear1.png'
    
        },
    ];
    
  return (
    <div className='p-12'>

        <h2 className='text-3xl font-bold'>All my projects under one roof</h2>

        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>

            
                {
                    Projects.map((project) => (
                        <div className='flex flex-col gap-2'>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <a>{project.liveUrl}</a>

                            <ul>
                                {
                                    project.techStack.map((tech) => (
                                        <li>{tech}</li>
                                    ))
                                }
                            </ul>

                            <img src={project.imageUrl} className=' max-w-full h-auto'></img>
                        </div>))
                
                }

               
            
        
        </div>
        
    

    </div>
  )
}
