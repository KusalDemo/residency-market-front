import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyCard } from '../components/PropertyCard';
import { RootState } from '../store';
import { getProperties } from '../store/slices/propertySlice';
import Loading from '../components/Loading';

export const Properties: React.FC = () => {
    const dispatch = useDispatch();
    const { properties, error, loading } = useSelector((state: RootState) => state.property);
    const [visibleProperties, setVisibleProperties] = useState(6);

    useEffect(() => {
        dispatch(getProperties());
    }, [dispatch]);

    const handleViewMore = () => {
        setVisibleProperties(prev => prev + 10);
    };

    if (loading) {
        return (
            <div className="text-center py-10 flex flex-col items-center">
                <Loading /> Loading properties...
            </div>
        );
    }

    if (error) {
        return <p className="flex justify-center mt-10">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.slice(0, visibleProperties).map((property) => (
                    <PropertyCard key={property._id} property={property}/>
                ))}
            </div>
            {visibleProperties < properties.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleViewMore}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        View More
                    </button>
                </div>
            )}

            {/* Additional Information Section */}
            <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Important Considerations When Buying a Property</h2>

                <p className="mb-4">
                    Purchasing a residency is a significant investment, and it is crucial to
                    <span className="font-semibold"> ensure proper communication</span> with the property owner.
                    Always verify ownership details, request all necessary documents, and arrange for in-person
                    or virtual meetings to discuss the terms and conditions before making any commitments.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Good Practices for Buyers</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <span className="font-semibold">Inspect the Property:</span> Visit the property to
                        check its condition, surroundings, and any potential maintenance issues.
                    </li>
                    <li>
                        <span className="font-semibold">Verify Legal Documents:</span> Ensure that the property
                        has all necessary approvals, including deeds, permits, and ownership history.
                    </li>
                    <li>
                        <span className="font-semibold">Discuss Financial Aspects:</span> Confirm the total cost,
                        including taxes, legal fees, and any other hidden charges.
                    </li>
                    <li>
                        <span className="font-semibold">Understand the Agreement:</span> Read and understand
                        the contract terms before signing any legal documents.
                    </li>
                    <li>
                        <span className="font-semibold">Check Utility Availability:</span> Ensure water,
                        electricity, and other essential utilities are properly set up and functioning.
                    </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Legal Aspects of Buying a Residency</h3>
                <p className="mb-4">
                    When buying a property, it is essential to follow legal regulations to avoid any disputes.
                    In Sri Lanka, buyers should check the <span className="font-semibold">Title Deed</span>
                    to ensure the ownership is clear and free of encumbrances. The land should also be
                    registered under the <span className="font-semibold">Land Registry</span>, and any mortgage
                    details should be disclosed.
                </p>

                <p className="mb-4">
                    Additionally, foreign buyers should be aware of restrictions regarding property ownership.
                    Consulting a real estate lawyer can help in reviewing contracts and ensuring all transactions
                    comply with national laws.
                </p>

                <p className="mb-4">
                    Before finalizing the purchase, it is advisable to obtain a
                    <span className="font-semibold"> Valuation Report</span> to assess the fair market price of
                    the property. This helps prevent overpaying and provides an understanding of the property’s
                    investment potential.
                </p>

                <p className="mt-6">
                    By following these best practices and legal guidelines, buyers can ensure a smooth and
                    secure property transaction. If you have any doubts, always seek professional advice
                    before proceeding.
                </p>
            </div>
        </div>

    );
};