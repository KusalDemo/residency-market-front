import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../store';
import {getUserRelatedInquiries, getReceivedInquiries} from '../store/slices/inquirySlice';
import {MessageCircle} from 'lucide-react';
import Loading from "../components/Loading.tsx";
import {InquiryCard} from "../components/InquiryCard.tsx";
import Cookies from "js-cookie";

export const Inquiries: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
  const {inquiries, receivedInquiries, loading, error} = useSelector((state: RootState) => state.inquiry);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(getUserRelatedInquiries(Cookies.get('user_id')));
      dispatch(getReceivedInquiries(Cookies.get('user_id')));
    }
  }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
        <div className="text-center py-10 flex flex-col items-center">
          <Loading/> Loading inquiries...
        </div>
    );
  }

  if (error) return <p className="flex justify-center mt-10">Error: {error}</p>;

  return (
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2"/>
              Your Inquiries
            </h2>
            {inquiries.length === 0 ? (
                <p className="text-gray-600">You haven't made any inquiries yet.</p>
            ) : (
                inquiries.map(inquiry => (
                    <InquiryCard key={inquiry._id} inquiry={inquiry}/>
                ))
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2"/>
              Received Inquiries
            </h2>
            {receivedInquiries.length === 0 ? (
                <p className="text-gray-600">No inquiries received for your properties.</p>
            ) : (
                receivedInquiries.map(inquiry => (
                    <InquiryCard key={inquiry._id} inquiry={inquiry} isReceived={true}/>
                ))
            )}
          </div>
        </div>
      </div>
  );
};