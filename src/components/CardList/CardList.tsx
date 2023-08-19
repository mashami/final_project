"use client"
import Card from "@/components/Card/Card"

const CardList = () => {
  return (
    <div className="lg:container grid lg:grid-cols-2 justify-center items-center lg:space-y-0 relative  ">
      <div className="relative -bottom-[4.125rem] space-y-2  ">
        <Card
          svg={
            <svg
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.9981 41.0081C36.5973 41.0081 36.1965 40.9156 35.8265 40.6997L8.60053 24.9439C7.49053 24.2964 7.12047 22.878 7.76797 21.768C8.41547 20.658 9.80297 20.2879 10.9438 20.9354L36.9981 36.0131L62.8978 21.028C64.0078 20.3805 65.4262 20.7814 66.0737 21.8606C66.7212 22.9706 66.3206 24.3888 65.2415 25.0363L38.2006 40.6997C37.7998 40.8847 37.399 41.0081 36.9981 41.0081Z"
                fill="#2639ED"
              />
              <path
                d="M37 68.9434C35.7358 68.9434 34.6875 67.895 34.6875 66.6309V38.665C34.6875 37.4009 35.7358 36.3525 37 36.3525C38.2642 36.3525 39.3125 37.4009 39.3125 38.665V66.6309C39.3125 67.895 38.2642 68.9434 37 68.9434Z"
                fill="#2639ED"
              />
              <path
                d="M36.9966 70.1465C34.1908 70.1465 31.5083 69.499 29.4733 68.3582L13.0083 59.2318C8.53745 56.7651 5.02248 50.814 5.02248 45.6957V28.244C5.02248 23.1257 8.53745 17.2059 13.0083 14.7084L29.4733 5.5816C33.6666 3.23826 40.2649 3.23826 44.4891 5.5816L60.9541 14.7084C65.4249 17.175 68.9399 23.1257 68.9399 28.244V39.529C68.9399 40.7932 67.8916 41.8415 66.6274 41.8415C65.3633 41.8415 64.3149 40.7932 64.3149 39.529V28.244C64.3149 24.8524 61.6941 20.4125 58.7341 18.7784L42.2691 9.65163C39.4633 8.07913 34.5608 8.07913 31.7549 9.65163L15.2899 18.7784C12.2991 20.4434 9.70911 24.8524 9.70911 28.244V45.6957C9.70911 49.0873 12.3299 53.5276 15.2899 55.1618L31.7549 64.2882C34.4683 65.799 39.5866 65.799 42.2691 64.2882C43.3791 63.6715 44.7974 64.0726 45.4141 65.1826C46.0308 66.2926 45.6299 67.7107 44.5199 68.3273C42.4849 69.499 39.8024 70.1465 36.9966 70.1465Z"
                fill="#2639ED"
              />
              <path
                d="M59.2 68.2958C52.4783 68.2958 47.0208 62.8383 47.0208 56.1167C47.0208 49.395 52.4783 43.9375 59.2 43.9375C65.9217 43.9375 71.3792 49.395 71.3792 56.1167C71.3792 62.8383 65.9217 68.2958 59.2 68.2958ZM59.2 48.5625C55.0375 48.5625 51.6458 51.9542 51.6458 56.1167C51.6458 60.2792 55.0375 63.6708 59.2 63.6708C63.3625 63.6708 66.7542 60.2792 66.7542 56.1167C66.7542 51.9542 63.3625 48.5625 59.2 48.5625Z"
                fill="#2639ED"
              />
              <path
                d="M70.9151 70.1459C70.3293 70.1459 69.7435 69.9301 69.281 69.4676L66.1976 66.3842C65.3035 65.49 65.3035 64.0097 66.1976 63.1156C67.0918 62.2214 68.5718 62.2214 69.466 63.1156L72.5493 66.1989C73.4435 67.0931 73.4435 68.5734 72.5493 69.4676C72.0868 69.9301 71.501 70.1459 70.9151 70.1459Z"
                fill="#2639ED"
              />
            </svg>
          }
          className="h-20"
          title="API collection"
          desc="We collect APIs from different sides either developers or platforms"
          backgroundColor="bg-fourthColor"
        />
        <Card
          svg={
            <svg
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.7529 54.7289C27.4137 54.7289 27.0437 54.6364 26.7354 54.4822C24.3612 53.2797 22.3262 51.4914 20.8462 49.2714C19.6129 47.4214 19.6129 45.0472 20.8462 43.1972C22.3262 40.9772 24.3612 39.1889 26.7354 38.0172C27.8762 37.4314 29.2637 37.9247 29.8496 39.0656C30.4354 40.2064 29.9729 41.5939 28.8012 42.1797C27.1362 43.0122 25.7179 44.2764 24.7004 45.8181C24.5154 46.0956 24.5154 46.4656 24.7004 46.7739C25.7179 48.3156 27.1362 49.5797 28.8012 50.4122C29.9421 50.9981 30.4046 52.3856 29.8496 53.5264C29.4179 54.2664 28.5854 54.7289 27.7529 54.7289Z"
                fill="#FF007A"
              />
              <path
                d="M46.895 54.7288C46.0317 54.7288 45.23 54.2663 44.8292 53.4647C44.2434 52.3238 44.7059 50.9363 45.8775 50.3505C47.5425 49.518 48.9609 48.2538 49.9784 46.7122C50.1634 46.4347 50.1634 46.0647 49.9784 45.7563C48.9609 44.2147 47.5425 42.9505 45.8775 42.118C44.7367 41.5322 44.2742 40.1447 44.8292 39.0038C45.415 37.863 46.8025 37.4005 47.9434 37.9555C50.3175 39.158 52.3525 40.9463 53.8325 43.1663C55.0659 45.0163 55.0659 47.3905 53.8325 49.2405C52.3525 51.4605 50.3175 53.2488 47.9434 54.4205C47.5734 54.6363 47.2342 54.7288 46.895 54.7288Z"
                fill="#FF007A"
              />
              <path
                d="M46.25 70.1458H27.75C11.0075 70.1458 3.85416 62.9925 3.85416 46.25V27.75C3.85416 11.0075 11.0075 3.85413 27.75 3.85413H46.25C62.9925 3.85413 70.1458 11.0075 70.1458 27.75V46.25C70.1458 62.9925 62.9925 70.1458 46.25 70.1458ZM27.75 8.47913C13.5358 8.47913 8.47916 13.5358 8.47916 27.75V46.25C8.47916 60.4641 13.5358 65.5208 27.75 65.5208H46.25C60.4642 65.5208 65.5208 60.4641 65.5208 46.25V27.75C65.5208 13.5358 60.4642 8.47913 46.25 8.47913H27.75Z"
                fill="#FF007A"
              />
              <path
                d="M6.87728 27.01C5.61311 27.01 4.56478 25.9616 4.56478 24.6975C4.56478 23.4333 5.58228 22.385 6.87728 22.385L66.139 22.3541C67.4032 22.3541 68.4515 23.4025 68.4515 24.6666C68.4515 25.9308 67.434 26.9791 66.139 26.9791L6.87728 27.01Z"
                fill="#FF007A"
              />
            </svg>
          }
          title="Connection"
          desc="we connet developers to employee through our platform"
          backgroundColor="bg-firthColor"
        />
      </div>
      <div className=" relative  space-y-2  ">
        <svg
          className="absolute lg:block hidden -bottom-12 right-0 -z-10"
          width={120}
          height={120}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={60} cy={60} r="55.6" stroke="#FF007A" strokeWidth="8.8" />
        </svg>
        <Card
          svg={
            <svg
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M54.6983 70.1459H19.3017C11.6242 70.1459 5.39583 63.9175 5.39583 56.24V35.4892C5.39583 27.8117 11.6242 21.5834 19.3017 21.5834H54.6983C62.3758 21.5834 68.6042 27.8117 68.6042 35.4892V39.9292C68.6042 41.1934 67.5558 42.2417 66.2917 42.2417H60.0633C58.9842 42.2417 57.9975 42.6425 57.2883 43.3825L57.2575 43.4134C56.3942 44.2459 55.9933 45.3867 56.0858 46.5584C56.2708 48.5934 58.2133 50.2275 60.4333 50.2275H66.2917C67.5558 50.2275 68.6042 51.2759 68.6042 52.54V56.2092C68.6042 63.9175 62.3758 70.1459 54.6983 70.1459ZM19.3017 26.2084C14.1833 26.2084 10.0208 30.3709 10.0208 35.4892V56.24C10.0208 61.3584 14.1833 65.5209 19.3017 65.5209H54.6983C59.8167 65.5209 63.9792 61.3584 63.9792 56.24V54.8834H60.4333C55.7775 54.8834 51.8308 51.43 51.4608 46.99C51.2142 44.4617 52.1392 41.9642 53.9892 40.145C55.5925 38.5109 57.7508 37.6167 60.0633 37.6167H63.9792V35.4892C63.9792 30.3709 59.8167 26.2084 54.6983 26.2084H19.3017Z"
                fill="#FF9900"
              />
              <path
                d="M7.70833 40.5766C6.44416 40.5766 5.39583 39.5283 5.39583 38.2641V24.1735C5.39583 19.5793 8.29416 15.4167 12.58 13.7825L37.0617 4.53248C39.59 3.57665 42.3958 3.91594 44.585 5.45761C46.805 6.99927 48.1 9.49677 48.1 12.1793V23.8959C48.1 25.16 47.0517 26.2084 45.7875 26.2084C44.5233 26.2084 43.475 25.16 43.475 23.8959V12.1793C43.475 11.0076 42.92 9.92838 41.9333 9.25005C40.9467 8.57171 39.775 8.41755 38.665 8.84921L14.1833 18.0992C11.6858 19.055 9.99 21.491 9.99 24.1735V38.2641C10.0208 39.5591 8.9725 40.5766 7.70833 40.5766Z"
                fill="#FF9900"
              />
              <path
                d="M60.4349 54.884C55.779 54.884 51.8324 51.4306 51.4624 46.9906C51.2157 44.4315 52.1407 41.934 53.9907 40.1148C55.5632 38.5115 57.7215 37.6173 60.034 37.6173H66.4474C69.4999 37.7098 71.8432 40.1148 71.8432 43.0748V49.4265C71.8432 52.3865 69.4999 54.7915 66.5399 54.884H60.4349ZM66.3857 42.2423H60.0649C58.9857 42.2423 57.999 42.6431 57.2899 43.3831C56.3957 44.2465 55.964 45.4181 56.0874 46.5898C56.2724 48.6248 58.2149 50.259 60.4349 50.259H66.4782C66.879 50.259 67.249 49.889 67.249 49.4265V43.0748C67.249 42.6123 66.879 42.2731 66.3857 42.2423Z"
                fill="#FF9900"
              />
              <path
                d="M43.1667 39.3125H21.5833C20.3192 39.3125 19.2708 38.2642 19.2708 37C19.2708 35.7358 20.3192 34.6875 21.5833 34.6875H43.1667C44.4308 34.6875 45.4792 35.7358 45.4792 37C45.4792 38.2642 44.4308 39.3125 43.1667 39.3125Z"
                fill="#FF9900"
              />
            </svg>
          }
          title="Sell APIs"
          desc="The private APIs the user they have to pay in order to get access token"
          backgroundColor="bg-sixthColor"
        />
        <Card
          svg={
            <svg
              width={74}
              height={74}
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.1734 55.9615H19.4876C18.2235 55.9615 17.1751 54.9132 17.1751 53.649V37.8624C17.1751 34.6557 19.7959 32.0345 23.0026 32.0345H31.1734C32.4376 32.0345 33.4859 33.0829 33.4859 34.347V53.6179C33.4859 54.9129 32.4376 55.9615 31.1734 55.9615ZM21.8001 51.3365H28.8609V36.6907H23.0026C22.3551 36.6907 21.8001 37.2145 21.8001 37.8929V51.3365Z"
                fill="#00DA71"
              />
              <path
                d="M42.8263 55.9615H31.1404C29.8763 55.9615 28.828 54.9132 28.828 53.649V23.8638C28.828 20.6571 31.4488 18.0363 34.6554 18.0363H39.3421C42.5488 18.0363 45.1696 20.6571 45.1696 23.8638V53.649C45.1388 54.9132 44.1213 55.9615 42.8263 55.9615ZM33.4838 51.3365H40.5446V23.8638C40.5446 23.2163 40.0204 22.6613 39.3421 22.6613H34.6554C34.0079 22.6613 33.4529 23.1855 33.4529 23.8638V51.3365H33.4838Z"
                fill="#00DA71"
              />
              <path
                d="M54.5152 55.9616H42.8293C41.5652 55.9616 40.5168 54.9133 40.5168 53.6491V39.6196C40.5168 38.3555 41.5652 37.3071 42.8293 37.3071H51.0002C54.2068 37.3071 56.8277 39.928 56.8277 43.1346V53.6491C56.8277 54.9133 55.8102 55.9616 54.5152 55.9616ZM45.1418 51.3366H52.2027V43.1346C52.2027 42.4871 51.6785 41.9321 51.0002 41.9321H45.1418V51.3366Z"
                fill="#00DA71"
              />
              <path
                d="M46.25 70.1458H27.75C11.0075 70.1458 3.85417 62.9925 3.85417 46.25V27.75C3.85417 11.0075 11.0075 3.85413 27.75 3.85413H46.25C62.9925 3.85413 70.1458 11.0075 70.1458 27.75V46.25C70.1458 62.9925 62.9925 70.1458 46.25 70.1458ZM27.75 8.47913C13.5358 8.47913 8.47917 13.5358 8.47917 27.75V46.25C8.47917 60.4641 13.5358 65.5208 27.75 65.5208H46.25C60.4642 65.5208 65.5208 60.4641 65.5208 46.25V27.75C65.5208 13.5358 60.4642 8.47913 46.25 8.47913H27.75Z"
                fill="#00DA71"
              />
            </svg>
          }
          title="Market Analysis Project"
          desc="The full docummented project idea "
          backgroundColor="bg-seventhColor"
        />
      </div>
      <svg
        className="absolute lg:block hidden -z-20 -bottom-56 right-0 "
        width={960}
        height={960}
        viewBox="0 0 1047 619"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 150C0 67.1573 67.1573 0 150 0H1047V619H0V150Z"
          fill="#F4F9FF"
        />
      </svg>
    </div>
  )
}

export default CardList
