import { Heading } from '@/components/Heading'

export function Tutorials(){
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="tutorials">
        Video Tutorials
      </Heading>
      <div className='not-prose mt-4 border-t border-zinc-900/5 pt-10 dark:border-white/5'>
        <div className='mb-5'>
          {`Welcome to our Video series on using our API to build your First App! In this brief tutorial, 
          we'll cover the fundamental steps to kickstart your app development journey. 
          Whether you're a coding enthusiast or a total beginner, we've got you covered. Let's dive in!`}
        </div>
        <div className='relative max-w-[500px] w-full mx-auto overflow-hidden'>
          <a className='block' href="https://www.lightfunnels.co/academy/apps-development" target="_blank" rel="noreferrer">
            <img className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] z-10' src='images/yutab.webp'/>
            <img className="w-full h-auto" src="images/thumbnail.jpg" />
          </a>
        </div>
      </div>
    </div>
  )
}