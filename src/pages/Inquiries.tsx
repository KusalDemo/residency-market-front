import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import {getUserRelatedInquiries} from '../store/slices/inquirySlice';
import { MessageCircle } from 'lucide-react';
import Loading from "../components/Loading.tsx";
import {InquiryCard} from "../components/InquiryCard.tsx";

export const Inquiries: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { inquiries, loading , error } = useSelector((state: RootState) => state.inquiry);
  // const { properties } = useSelector((state: RootState) => state.property);
  // const [replyMessages, setReplyMessages] = useState<{ [key: string]: string }>({});

  useEffect( () => {
    if (isAuthenticated) {
      dispatch(getUserRelatedInquiries('6794ebefd1f7918bbc628fcf'));
      setTimeout(() => {
        console.log(inquiries);
      }, 4000);
      console.log(inquiries);
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
        <div className="text-center py-10 flex flex-col items-center" >
          <Loading /> Loading inquiries...
        </div>
    )
  }
  if (error) return <p className="flex justify-center mt-10">Error: {error}</p>;

  /*const userInquiries = inquiries.filter(inquiry => inquiry.id === user?.email);
  const receivedInquiries = inquiries.filter(inquiry => {
    const property = properties.find(p => p._id === inquiry.residencyId);
    return property?._id === user?.email;
  });

  const handleReply = (inquiryId: string) => {
    const reply = {
      id: Date.now().toString(),
      userEmail: user?.email || '',
      message: replyMessages[inquiryId] || '',
      date: new Date().toISOString()
    };

    dispatch(addReply({ inquiryId, reply }));
    setReplyMessages(prev => ({ ...prev, [inquiryId]: '' }));
  };*/



  // const getPropertyDetails = (residencyId: string) => {
  //   return properties.find(p => p.id === residencyId);
  // };

  /*const InquiryCard: React.FC<{ inquiry: any; isReceived?: boolean }> = ({ inquiry, isReceived = false }) => {
    const property = properties.find((p) => p._id === inquiry.residencyId);

    if (!property) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <p className="text-gray-600 text-sm">
                {isReceived ? `From: ${inquiry.userEmail}` : `To: ${property.owner}`}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(inquiry.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">{inquiry.message}</p>
          </div>

          {inquiry.replies?.length > 0 && (
              <div className="mb-4 pl-4 border-l-2 border-gray-200">
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
          )}

          <div className="mt-4">
        <textarea
            value={replyMessages[inquiry.id] || ''}
            onChange={(e) =>
                setReplyMessages((prev) => ({
                  ...prev,
                  [inquiry.id]: e.target.value,
                }))
            }
            placeholder="Write your reply..."
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
            rows={2}
        />
            <button
                onClick={() => handleReply(inquiry.id)}
                className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Reply
            </button>
          </div>
        </div>
    );
  };*/


  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" />
            Your Inquiries
          </h2>
          {inquiries.length === 0 ? (
            <p className="text-gray-600">You haven't made any inquiries yet.</p>
          ) : (
            inquiries.map(inquiry => (
              <InquiryCard key={inquiry._id} inquiry={inquiry} />
            ))
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" />
            Received Inquiries
          </h2>
          {inquiries.length === 0 ? (
            <p className="text-gray-600">No inquiries received for your properties.</p>
          ) : (
              inquiries.map(inquiry => (
              <InquiryCard key={inquiry._id} inquiry={inquiry} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};