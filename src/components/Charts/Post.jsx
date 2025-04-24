import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
const Post = () => {

    return (
        <div className="w-[500px] p-4 border-[1px] border-[#DFDFDF] bg-white rounded-xl">
            <div className="flex flex-row gap-4">
                <div className="flex items-center">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-[14px] text-[#484848]">Malton Durai</span>
                    <span className="font-medium text-[11px] text-[#A4A4A4]">Posted 1 Month ago</span>
                </div>
            </div>
            <img
                src="https://images.unsplash.com/photo-1657039918024-73ca6892cc67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-[300px] resize-none rounded-lg p-3 text-sm outline-none"
            ></img>

            <div className="flex justify-between items-center p-4 pt-0">
                <div className="flex flex-col">
                    <span className="text-[12px] font-semibold mt-3">Dear Team,</span>
                    <span className="font-semibold text-[11px] text-[#5F5F5F] mt-1">We're excited to announce the new Flexi Benefit Plan for all employees who fall under the tax bracket. This plan is designed to help you save on your taxes by adding new components to your salary package.</span>
                    <span className="text-[12px] font-semibold mt-3">What's New:</span>
                    <ul className="font-semibold text-[11px] text-[#5F5F5F] mt-1 list-disc list-inside">
                        <li>Food Reimbursement</li>
                        <li>Mobile/Internet Allowance</li>
                        <li>Transportation Allowance</li>
                        <li>Professional Development</li>
                    </ul>

                    <span className="text-[12px] font-semibold mt-3">How It Works:</span>
                    <ul className="font-semibold text-[11px] text-[#5F5F5F] mt-1 list-disc list-inside">
                        <li>Declare Your Expenses: Report your annual expenses for the above components on KEKA.</li>
                        <li>Save Your Invoices: Keep all invoices for expenses related to these new benefits.</li>
                    </ul>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex gap-1">
                    <ThumbUpOffAltOutlinedIcon fontSize="xs" />
                    <span className="text-[12px] font-semibold">5 Likes</span>
                </div>
                <div className="flex gap-1">
                    <ChatBubbleOutlineOutlinedIcon fontSize="xs" />
                    <span className="text-[12px] font-semibold">3 Comments</span>
                </div>
            </div>
        </div>
    );

}

export default Post