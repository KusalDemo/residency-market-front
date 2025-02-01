import React from "react";
import {Inquiry} from "../types";


export const InquiryCard: React.FC<{ inquiry : Inquiry }> = ({ inquiry }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Inquiry ID: {inquiry._id}</h3>
            <p className="text-sm text-gray-600">Residency ID: {inquiry.residency}</p>
            <p className="text-sm text-gray-600">User ID: {inquiry.userId}</p>
            <p className="mt-2 text-gray-700">{inquiry.message}</p>
            <p className="mt-2 text-sm text-gray-500">Created At: {new Date(inquiry.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

