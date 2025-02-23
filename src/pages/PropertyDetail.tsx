import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bed, Bath, Square, MapPin, Phone, Mail, MessageCircle, ThumbsUp, ThumbsDown, Edit, Trash } from 'lucide-react';
import { RootState } from '../store';
import { addInquiry, createInquiry } from '../store/slices/inquirySlice';
import { Inquiry } from "../types";
import {
    downvoteComment,
    getCommentsForResidency,
    upvoteComment,
    addComment,
    updateComment,
    deleteComment
} from "../store/slices/commentSlice.ts";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { properties } = useSelector((state: RootState) => state.property);
    const { user } = useSelector((state: RootState) => state.auth);
    const { comments, error, loading } = useSelector((state: RootState) => state.comments);
    const property = properties.find(p => p._id === id);

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [inquiryMessage, setInquiryMessage] = useState('');
    const [commentMessage, setCommentMessage] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editedCommentMessage, setEditedCommentMessage] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(getCommentsForResidency(id));
        }
    }, [dispatch, id]);

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
            residency: property._id,
            user: Cookies.get("user_id") || '6794ebefd1f7918bbc628fcf',
            message: inquiryMessage,
            date: new Date().toISOString(),
        };

        try {
            await dispatch(createInquiry(inquiry));
            setInquiryMessage('');
            setShowInquiryForm(false);
            toast.success('Inquiry sent successfully!');
        } catch (error) {
            toast.error('Failed to send inquiry. Please try again.');
        }
    };

    const handleVote = async (commentId: string, voteType: 'up' | 'down') => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            if (voteType === 'up') {
                await dispatch(upvoteComment(commentId));
                toast.success('Upvoted successfully!');
            } else {
                await dispatch(downvoteComment(commentId));
                toast.success('Downvoted successfully!');
            }
        } catch (error) {
            toast.error('Failed to vote. Please try again.');
        }
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const newComment = {
            id: "",
            residency: property._id,
            user: Cookies.get('user_id') || '',
            message: commentMessage,
            upVotes: 0,
            downVotes: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            await dispatch(addComment(newComment));
            setCommentMessage('');
            toast.success('Comment added successfully!');
        } catch (error) {
            toast.error('Failed to add comment. Please try again.');
        }
    };

    const handleUpdateComment = async (commentId: string) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const updatedComment = {
            id: commentId,
            residency: property._id,
            user: Cookies.get('user_id') || '',
            message: editedCommentMessage,
            upVotes: 0,
            downVotes: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            await dispatch(updateComment({ commentId, comment: updatedComment }));
            setEditingCommentId(null);
            setEditedCommentMessage('');
            toast.success('Comment updated successfully!');
        } catch (error) {
            toast.error('Failed to update comment. Please try again.');
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            await dispatch(deleteComment(commentId));
            toast.success('Comment deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete comment. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <ToastContainer />
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
                            <div key={comment._id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-medium text-blue-600">{comment.user}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {comment.user === Cookies.get('user_id') && (
                                            <>
                                                <span className="text-sm text-gray-500">you</span>
                                                <button
                                                    onClick={() => {
                                                        setEditingCommentId(comment._id);
                                                        setEditedCommentMessage(comment.message);
                                                    }}
                                                    className="text-gray-600 hover:text-blue-600"
                                                >
                                                    <Edit className="h-4 w-4"/>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="text-gray-600 hover:text-red-600"
                                                >
                                                    <Trash className="h-4 w-4"/>
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleVote(comment._id, 'up')}
                                            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                                        >
                                            <ThumbsUp className="h-4 w-4"/>
                                            <span>{comment.upVotes}</span>
                                        </button>
                                        <button
                                            onClick={() => handleVote(comment._id, 'down')}
                                            className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                                        >
                                            <ThumbsDown className="h-4 w-4"/>
                                            <span>{comment.downVotes}</span>
                                        </button>
                                    </div>
                                </div>
                                {editingCommentId === comment._id ? (
                                    <div className="mt-4">
                                        <textarea
                                            value={editedCommentMessage}
                                            onChange={(e) => setEditedCommentMessage(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                            rows={4}
                                            placeholder="Edit your comment..."
                                            required
                                        />
                                        <button
                                            onClick={() => handleUpdateComment(comment._id)}
                                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                        >
                                            Update Comment
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-gray-700">{comment.message}</p>
                                )}
                            </div>
                        ))}
                        <form onSubmit={handleAddComment} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
                            <textarea
                                value={commentMessage}
                                onChange={(e) => setCommentMessage(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                rows={4}
                                placeholder="Write your comment here..."
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                            >
                                Submit Comment
                            </button>
                        </form>
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