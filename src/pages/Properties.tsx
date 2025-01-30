import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { PropertyCard } from '../components/PropertyCard';
import { RootState } from '../store';
import {getProperties} from "../store/slices/propertySlice.ts";
import Loading from "../components/Loading.tsx";

export const Properties: React.FC = () => {
    const dispatch = useDispatch();
  const { properties , error , loading} = useSelector((state: RootState) => state.property);

    useEffect(() => {
        dispatch(getProperties());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="text-center py-10 flex flex-col items-center" >
                <Loading /> Loading properties...
            </div>
        )
    }
    if (error) return <p className="flex justify-center mt-10">Error: {error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};