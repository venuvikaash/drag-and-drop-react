import { Switch } from "@mui/material";
import { useState } from "react";
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

const PostBox = () => {
    const [isPoll, setIsPoll] = useState(false);

    return (
        <div className="w-full h-full p-4 border-[1px] border-[#DFDFDF] bg-white rounded-xl overflow-auto">
            <div className="flex items-center justify-between pb-[3%]">
                <div className="flex items-center gap-2 ">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold text-[14px] text-[#484848]">Malton Durai</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span>Post</span>
                    <Switch
                        checked={isPoll}
                        onChange={(e) => setIsPoll(e.target.checked)}
                        color="#1B4E4D"
                        size="large"
                    />
                    <span>Poll</span>
                </div>
            </div>
            <textarea
                placeholder="Write your post or question here"
                className="w-full h-[140px] resize-none rounded-lg border border-[#DFDFDF] bg-[#EEEEEE] p-3 text-sm outline-none"
            ></textarea>

            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-[#1B4E4D] bg-[#F3F3F3]">
                        <BrokenImageOutlinedIcon fontSize="small" />
                        Add media
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-[#DFDFDF] rounded-md text-sm text-[#1B4E4D] bg-[#F3F3F3]">
                        Organization
                        <ExpandMoreOutlinedIcon fontSize="small" />
                    </button>
                </div>
            </div>
            <div className="flex justify-end items-center mt-4">
                <div className="flex gap-2">
                    <button className="px-4 py-1.5 border border-[#004d40] text-[#004d40] rounded-md text-sm bg-white">
                        Save Draft
                    </button>
                    <button className="px-4 py-1.5 bg-[#004d40] text-white rounded-md text-sm">
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostBox;
