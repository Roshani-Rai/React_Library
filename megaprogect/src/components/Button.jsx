import React from "react";

export default function Button({
    children,
    type = 'button',
    bgColor = "bg-black",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`inline-block px-2 py-1 rounded-lg ${bgColor} ${textColor} ${className}`}
        type={type}
         {...props}>
            {children}
        </button>
    );
}