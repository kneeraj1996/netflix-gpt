import { useDispatch } from "react-redux";
import { setVisibleMoreInfo } from "../utils/moviesSlice";

const MoreInfo = (info) => {
  const dipatch = useDispatch();
  const { title, overview, original_title } = info.info;
  return (
    <div className="fixed overflow-auto  text-white p-5 left-1/2 top-1/2 z-30 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2  bg-gradient-to-b from-black to-blue-950 ">
      <div
        onClick={() => dipatch(setVisibleMoreInfo())}
        className="right-5 absolute "
      >
        ❌
      </div>
      <h1 className="font-bold text-3xl mb-7">
        {title} ({original_title})
      </h1>
      <h1 className="text-xl flex-wrap text-overflow-ellipsis">
        {overview} {overview}
      </h1>
    </div>
  );
};

export default MoreInfo;
