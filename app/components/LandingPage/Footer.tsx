import { FaGithub } from 'react-icons/fa6'

// Organization details configuration
const organizationInfo = {
  name: "Me2 Chat App",
  description: "We're on a mission to connect students around the world. Help us defeat loneliness and make a difference in others' lives.",
  joinButtonText: "Join Now",
  joinButtonLink: "/register"
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      id="footer"
      className="bg-gray-100"
    >
      <div className="default-container py-16">
        <div className="
          flex 
          flex-col 
          items-center 
          text-center 
          max-w-2xl 
          mx-auto 
          space-y-8
        ">
          {/* Organization Info */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-gray-800">
              {organizationInfo.name}
            </p>
            <p className="text-gray-600">
              {organizationInfo.description}
            </p>
          </div>

          {/* GitHub Profiles */}
          <div className="flex gap-x-8">
            <a
              href="https://github.com/Not-Micah"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex 
                items-center 
                gap-x-2
                text-gray-600 
                hover:text-header
                transition-colors
              "
            >
              <FaGithub className="w-6 h-6" />
              <span className="font-medium">Micah</span>
            </a>
            
            <a
              href="https://github.com/ebeeyuuu"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex 
                items-center 
                gap-2 
                text-gray-600 
                hover:text-header
                transition-colors
              "
            >
              <FaGithub className="w-6 h-6" />
              <span className="font-medium">Ean</span>
            </a>
          </div>

          {/* Join Button */}
          <a 
            href="https://me2-register.vercel.app/"
            className="
              py-2 px-6 
              bg-header
              text-white 
              font-medium
              rounded-lg 
            "
          >
            {organizationInfo.joinButtonText}
          </a>

          {/* Copyright Notice */}
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} {organizationInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer