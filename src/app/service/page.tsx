import { CardList } from "@/components/CardList"
import NavBar from "@/components/NavBar/NavBar"

const SevicePage = () => {
  return (
    <div className="max-h-screen relative">
      <svg
        className="absolute top-24 "
        width={150}
        height={125}
        viewBox="0 0 150 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="64.1794"
          cy="35.5584"
          rx="4.67939"
          ry="4.40413"
          fill="#F2EEFF"
        />
        <ellipse
          cx="111.823"
          cy="92.5975"
          rx="4.67939"
          ry="4.40413"
          fill="#6944D5"
        />
        <path
          d="M58.1619 75.0358C58.1619 77.8637 55.7588 80.2657 52.6567 80.2657C49.5546 80.2657 47.1515 77.8637 47.1515 75.0358C47.1515 72.2078 49.5546 69.8058 52.6567 69.8058C55.7588 69.8058 58.1619 72.2078 58.1619 75.0358Z"
          stroke="#6944D5"
          strokeWidth="3.3031"
        />
        <rect
          x="-1.5"
          y="12.8486"
          width="14.6581"
          height="14.6581"
          transform="rotate(-60 -1.5 12.8486)"
          fill="#D9CCFF"
        />
        <rect
          x="135.756"
          y="56.5752"
          width="8.27375"
          height="8.27375"
          transform="rotate(-60 135.756 56.5752)"
          stroke="#D9CCFF"
          strokeWidth="3.3031"
        />
        <path
          d="M60.5835 107.154L68.4501 120.367H52.717L60.5835 107.154Z"
          fill="#D9CCFF"
        />
        <path
          d="M126.462 14.5851L119.734 28.672L110.898 15.8014L126.462 14.5851Z"
          fill="#9A77FF"
        />
      </svg>

      <div>
        <NavBar />
      </div>
      <div className="flex justify-between px-4">
        <div className="w-1/2 px-20 text-center [&>p]:text-lg [&>h2]:text-lg [&>h2]:font-semibold grid place-content-center space-y-8 ">
          <h2>Who are we</h2>
          <p>
            This website serves as a bridge between developers and employers.
            Its primary objective is to showcase the work of backend developers
            and aggregate APIs from various backends and platforms. The platform
            features APIs contributed by both backend software developers and
            other platforms. However, the APIs created by our backend developers
            form the core offerings that will be made available for sale on this
            platform.
          </p>
          <h2>Mission</h2>
          <p>
            Increase trust and quality in the marketplace by addressing
            challenges of matching, reputation management, information that
            foster iWorker employment generation.
          </p>
          <h2>Vision</h2>
          <p>
            iHuzo (Accelerating growth of Micro and Small Enterprises (MSEs)
            through expanding the e-commerce sector in Rwanda)
          </p>
        </div>
        <div className="w-1/2">
          <CardList />
        </div>
      </div>
    </div>
  )
}

export default SevicePage
