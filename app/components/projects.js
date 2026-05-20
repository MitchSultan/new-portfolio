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

        <div className='flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-2 pb-6 md:pb-0 hide-scrollbar'>

            
                {
                    Projects.map((project) => (
                        <div className='flex-none w-[85vw] sm:w-[350px] md:w-auto snap-center md:snap-align-none flex flex-col gap-2'>
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
        
    

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
