import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Bed, Bath, Square, MapPin, Phone, Mail, MessageCircle, ThumbsUp, ThumbsDown} from 'lucide-react';
import {RootState} from '../store';
import {addInquiry, createInquiry} from '../store/slices/inquirySlice';
import {useDispatch} from 'react-redux';
import {Inquiry} from "../types";
import {downvoteComment, getCommentsForResidency, upvoteComment} from "../store/slices/commentSlice.ts";

export const PropertyDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {properties} = useSelector((state: RootState) => state.property);
    const {user} = useSelector((state: RootState) => state.auth);
    const {comments, error, loading} = useSelector((state: RootState) => state.comments);
    const property = properties.find(p => p._id === id);

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [inquiryMessage, setInquiryMessage] = useState('');


    useEffect(() => {
        dispatch(getCommentsForResidency("6795a8baca2d0604c205ba5c"));
    }, [dispatch]);

    if (!property) {
        return <div className="container mx-auto px-6 py-12">Property not found</div>;
    }

    const handleBooking = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        navigate(`/payment/${property._id}`);
    };

    const handleInquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const inquiry: Inquiry = {
            id: "",
            residencyId: property._id,
            userId: user?.id || '6794ebefd1f7918bbc628fcf',
            userEmail: user?.email || '',
            message: inquiryMessage,
            date: new Date().toISOString(),
        };

        await dispatch(createInquiry(inquiry));
        setInquiryMessage('');
        setShowInquiryForm(false);
        alert('Inquiry sent successfully!');
    };

    const handleVote = (commentId: string, voteType: 'up' | 'down') => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (voteType === 'up') {
            dispatch(upvoteComment(commentId));
        } else {
            dispatch(downvoteComment(commentId));
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <div className="relative h-[400px] mb-8">
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src={property.images[1]}
                            alt={`${property.title}`}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                    <div className="space-y-6 mt-5">
                        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-medium text-blue-600">{comment.user}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleVote(comment.id, 'up')}
                                            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                                        >
                                            <ThumbsUp className="h-4 w-4"/>
                                            <span>{comment.upVotes}</span>
                                        </button>
                                        <button
                                            onClick={() => handleVote(comment.id, 'down')}
                                            className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                                        >
                                            <ThumbsDown className="h-4 w-4"/>
                                            <span>{comment.downVotes}</span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-700">{comment.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-6">
                        <MapPin className="h-5 w-5 mr-2"/>
                        <span>{property.location}</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="text-3xl font-bold text-blue-600 mb-6">
                            ${property.price.toLocaleString()}
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center">
                                <Bed className="h-5 w-5 mr-2 text-gray-600"/>
                                <span>{property.facilities[0].bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center">
                                <Bath className="h-5 w-5 mr-2 text-gray-600"/>
                                <span>{property.facilities[0].bathrooms} Baths</span>
                            </div>
                            <div className="flex items-center">
                                <Square className="h-5 w-5 mr-2 text-gray-600"/>
                                <span>{property.facilities[0].area} sqft</span>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowInquiryForm(true)}
                                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <MessageCircle className="h-5 w-5 mr-2"/>
                                Send Inquiry
                            </button>
                            <button
                                onClick={handleBooking}
                                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>

                    {showInquiryForm && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Send an Inquiry</h2>
                            <form onSubmit={handleInquiry}>
                <textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    rows={4}
                    placeholder="Write your message here..."
                    required
                />
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowInquiryForm(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Description</h2>
                        <p className="text-gray-600">{property.description}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Agent</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 text-blue-600"/>
                                <span>(+94) 77 145 7878</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 text-blue-600"/>
                                <span>example@example.com</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};