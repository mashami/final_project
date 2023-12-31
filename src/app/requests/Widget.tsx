/* eslint-disable react/jsx-key */
"use client"

import NavBar from "@/components/NavBar/NavBar"
import { truncateDescription } from "@/utils/helpers"
import { Request } from "@prisma/client"
import Link from "next/link"

interface RequestWidgetProps {
  requests: Request[]
}

const RequestWidget = ({ requests }: RequestWidgetProps) => {
  return (
    <div className="relative">
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center">
        <h1>THE REQUESTS</h1>
      </div>
      <div className="grid grid-cols-3 py-16 px-28 w-full place-items-center container">
        {requests.length ? (
          requests.map((request) => {
            const isoDate = request.updatedAt
            const date = new Date(isoDate)
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric"
            }

            // Convert the date to a readable date string
            const formattedDate = date.toLocaleDateString(
              "en-US",
              options as any
            )

            return (
              <Link
                href={`/getRequest/[id]`}
                as={`getRequest/${request.id}`}
                className="w-60 bg-white p-4 space-y-3 grid place-items-center rounded-lg shadow-black/75"
              >
                {/* Use the svgs[randomIndex] directly within the Link's content */}
                <span>
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_82_84)">
                      <path
                        d="M32.6863 9.67557C35.774 8.44034 39.2186 8.44034 42.3063 9.67557L63.6072 18.2004C65.7162 19.0403 67.0963 21.0827 67.0963 23.3508V51.641C67.0965 52.7504 66.7642 53.8344 66.1422 54.7531C65.5203 55.6719 64.6373 56.3831 63.6072 56.7951L42.3063 65.3162C40.5531 66.0176 38.6676 66.327 36.7822 66.2227C36.5345 65.7837 36.2283 65.3804 35.872 65.0239L35.6463 64.8019V33.2002L11.5963 23.5802V33.9032C10.3347 34.0416 9.09321 34.3247 7.8963 34.7468V23.3508C7.89685 22.242 8.22951 21.1587 8.8514 20.2408C9.47328 19.3228 10.3559 18.6121 11.3854 18.2004L32.6863 9.67557ZM40.9336 13.1166C38.7282 12.2344 36.268 12.2344 34.0627 13.1166L29.0677 15.1146L51.8338 24.2166L60.2661 20.8496L40.9336 13.1166ZM46.8536 26.2146L24.0838 17.1015L14.7265 20.8459L37.4963 29.9553L46.8536 26.2146ZM63.3963 23.5765L39.3463 33.1965V62.3525C39.8865 62.2415 40.4156 62.0824 40.9299 61.8789L62.2345 53.3578C62.578 53.2201 62.8724 52.9826 63.0795 52.6758C63.2866 52.3691 63.397 52.0074 63.3963 51.6373V23.5765ZM13.4463 63.3996C16.3545 63.3996 19.0407 62.4376 21.2015 60.8207L30.6365 70.2557C30.8083 70.4277 31.0122 70.5642 31.2367 70.6573C31.4612 70.7505 31.7019 70.7986 31.945 70.7987C32.1881 70.7989 32.4288 70.7512 32.6534 70.6583C32.8781 70.5655 33.0822 70.4293 33.2542 70.2575C33.4263 70.0858 33.5627 69.8818 33.6559 69.6573C33.7491 69.4328 33.7972 69.1921 33.7973 68.949C33.7975 68.7059 33.7498 68.4652 33.6569 68.2406C33.5641 68.0159 33.4279 67.8118 33.2561 67.6398L23.8211 58.2048C25.5675 55.8692 26.4745 53.0126 26.3952 50.0974C26.3159 47.1822 25.2549 44.3791 23.3841 42.142C21.5133 39.9048 18.9421 38.3647 16.0869 37.7709C13.2317 37.1771 10.2597 37.5644 7.65199 38.87C5.04433 40.1757 2.95371 42.3234 1.71866 44.9652C0.483611 47.6071 0.17643 50.5885 0.846859 53.4267C1.51729 56.2648 3.12607 58.7936 5.41272 60.6036C7.69937 62.4136 10.53 63.3987 13.4463 63.3996ZM13.4463 59.6996C10.993 59.6996 8.64027 58.725 6.90556 56.9903C5.17085 55.2556 4.1963 52.9028 4.1963 50.4496C4.1963 47.9963 5.17085 45.6435 6.90556 43.9088C8.64027 42.1741 10.993 41.1996 13.4463 41.1996C15.8995 41.1996 18.2523 42.1741 19.987 43.9088C21.7217 45.6435 22.6963 47.9963 22.6963 50.4496C22.6963 52.9028 21.7217 55.2556 19.987 56.9903C18.2523 58.725 15.8995 59.6996 13.4463 59.6996Z"
                        fill="#FF017A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_82_84">
                        <rect
                          width={74}
                          height={74}
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <p className="text-black">
                  {truncateDescription(`${request.description}`, 28)}
                </p>
                <p className="text-black font-bold text-base">
                  {request.company}
                </p>
                <span className=" w-full flex justify-start items-center space-x-2">
                  <p>Contributors</p>
                  <p className="px-1 border font-bold">0</p>
                </span>

                <p className="w-full flex justify-end text-gray-400">
                  {formattedDate}
                </p>
              </Link>
            )
          })
        ) : (
          <p> There is no Requests APIs yet</p>
        )}
      </div>
    </div>
  )
}

export default RequestWidget
