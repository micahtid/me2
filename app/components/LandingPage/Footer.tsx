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
      className="bg-gray-50 border-t border-gray-200"
    >
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 max-w-7xl mx-auto py-12 sm:py-16">
        <div className="
          flex
          flex-col
          items-center
          text-center
          max-w-2xl
          mx-auto
          space-y-6 sm:space-y-8
        ">
          {/* Organization Info */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xl sm:text-2xl font-bold text-header">
              {organizationInfo.name}
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {organizationInfo.description}
            </p>
          </div>

          {/* GitHub Profiles */}
          <div className="flex gap-x-6 sm:gap-x-8">
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
                transition-colors duration-200
              "
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base">Micah</span>
            </a>

            <a
              href="https://github.com/ebeeyuuu"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-x-2
                text-gray-600
                hover:text-header
                transition-colors duration-200
              "
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base">Ean</span>
            </a>
          </div>

          {/* Join Button */}
          <a
            href="https://me2-register.vercel.app/"
            className="
              py-2.5 px-6
              bg-header
              text-white
              font-semibold
              text-sm sm:text-base
              rounded-xl
              hover:bg-[#004696] hover:opacity-95
              transition-all duration-200
            "
          >
            {organizationInfo.joinButtonText}
          </a>

          {/* Copyright Notice */}
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {currentYear} {organizationInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer