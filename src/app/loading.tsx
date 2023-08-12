import { Loader } from "@/components/Loader"

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center space-x-4 ">
      <Loader />
      <p>Loading...</p>
    </div>
  )
}

export default Loading
