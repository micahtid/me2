import React from 'react'

const SocialForm = () => {
  return (
    <div>
        <p>The chat has been open for 24 hours and is now closed. Would you like to share socials?</p>
        <div className='flex flex-row justify-start items-center gap-x-4'>
            <button>Share Socials</button>
            <button>Close Chat</button>
        </div>
    </div>
  )
}

export default SocialForm