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
        <button className={`px-[5px] py-[1px] rounded-lg ${bgColor} ${textColor} ${className}`}
        type={type}
         {...props}>
            {children}
        </button>
    );
}