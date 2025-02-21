import React, {useState} from "react";
import {Inquiry} from "../types";
import {Send} from "lucide-react";
import {useDispatch} from "react-redux";
import {addReply} from "../store/slices/inquirySlice";
import Cookies from "js-cookie";

export const InquiryCard: React.FC<{ inquiry: Inquiry; isReceived?: boolean }> = ({inquiry, isReceived = false}) => {
    const dispatch = useDispatch();
    const [replyMessage, setReplyMessage] = useState('');

    const handleReply = () => {
        if (replyMessage.trim()) {
            const reply = {
                id: Date.now().toString(),
                user: Cookies.get('user_id'), // Replace with actual user email
                message: replyMessage,
                date: new Date().toISOString()
            };
            dispatch(addReply({inquiryId: inquiry._id, reply}));
            setReplyMessage('');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Inquiry ID: {inquiry._id}</h3>
            <p className="text-sm text-gray-600">Residency ID: {inquiry.residency}</p>
            <p className="text-sm text-gray-600">User ID: {inquiry.userId}</p>
            <p className="mt-2 text-gray-700">{inquiry.message}</p>
            <p className="mt-2 text-sm text-gray-500">Created At: {new Date(inquiry.createdAt).toLocaleDateString()}</p>

            {/*{inquiry.replies?.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <h4 className="font-semibold mb-2">Replies:</h4>
                    {inquiry.replies.map((reply) => (
                        <div key={reply.id} className="mb-3">
                            <p className="text-sm text-gray-600">
                                {reply.userEmail} - {new Date(reply.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">{reply.message}</p>
                        </div>
                    ))}
                </div>
            )}*/}

            <div className="mt-4">
                <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-3 border border-gray-300 rounded-md mb-2"
                    rows={2}
                />
                <button
                    onClick={handleReply}
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    <Send className="h-4 w-4 mr-2"/>
                    Reply
                </button>
            </div>
        </div>
    );
};