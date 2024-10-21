import React from "react";

const Input = ({ input, setInput, handleAddItem, selectedOptions, handleSelectChange, opt }) => {
    return (
        <div className="bg-[#16161a] w-full gap-4 flex flex-wrap justify-center items-center min-h-[120px] py-11">
            <span className="text-white">What do you need for your trip 😍?</span>
            <div className="flex flex-wrap justify-center gap-3 text-[#2cb67d]">
                <select
                    onChange={(e) => handleSelectChange(selectedOptions.length, e.target.value)}
                    className=" h-[30px]  w-[200px]  sm:w-[60px] bg-[#363b41] rounded-md"
                >
                    {opt.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    className="h-[30px] w-[200px] sm:w-[230px] bg-[#363b41] rounded-md pl-3"
                    placeholder="item..."
                    value={input}
                />
            </div>
            <button onClick={handleAddItem} className="bg-[#7f5af0] hover:bg-[#663ce7] w-[80px] h-[30px] rounded-md">add</button>
        </div>
    );
};

export default Input;
