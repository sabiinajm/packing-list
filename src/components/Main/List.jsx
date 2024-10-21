import React from "react";
import { MdDelete } from "react-icons/md";

const List = ({ items, checkedItems, handleCheckbox, selectedOptions, handleDel }) => {
    return (
        <div className="min-h-[200px] h-[50vh] text-white py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[90%] mx-auto">
                {items.length > 0
                    ? items.map((item, index) => (
                        <li
                            key={index}
                            className={`px-4 h-[40px] flex items-center justify-between bg-[#191a1c] ${checkedItems[index] ? 'line-through' : ''}`}
                        >
                            <input
                                onChange={() => { handleCheckbox(index); }}
                                checked={checkedItems[index]}
                                type="checkbox"
                                className="mr-4"
                            />
                            <div className="min-w-[90%] flex justify-between items-center">
                                <span>{`${selectedOptions[index]} - ${item} `}</span>
                                <MdDelete onClick={() => { handleDel(index); }} className="text-[#2cb67d] hover:text-red-500 cursor-pointer" />
                            </div>
                        </li>
                    ))
                    : <li className="text-center text-gray-500">Empty</li>}
            </ul>
        </div>
    );
};

export default List;
