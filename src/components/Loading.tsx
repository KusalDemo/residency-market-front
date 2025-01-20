import React from "react";

interface LoadingProps {
    size?: "small" | "medium" | "large";
}

const Loading: React.FC<LoadingProps> = ({ size = "medium" }) => {
    const sizes = {
        small: "h-6 w-6 border-2",
        medium: "h-10 w-10 border-4",
        large: "h-16 w-16 border-4",
    };

    return (
        <div
            className={`rounded-full border-t-transparent animate-spin ${sizes[size]} border-blue-950 mb-4`}
        ></div>
    );
};

export default Loading;
