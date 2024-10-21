import { useState } from "react";
import Input from "./Input";
import List from "./List";

function Main() {
    const opt = Array(21).fill("").map((_, i) => i)
    const [input, setInput] = useState('')
    const [items, setItems] = useState([])
    const [checkedItems, setCheckedItems] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [sortOrder, setSortOrder] = useState("input")

    const handleAddItem = () => {
        if (input.trim()) {
            setItems([...items, input])
            setCheckedItems(prevChecked => [...prevChecked, false]);
            setInput('')
        } else {
            alert('Input cannot be empty!')
        }
    };

    const handleCheckbox = (index) => {
        setCheckedItems(checkedItems => {
            const newChecked = [...checkedItems]
            newChecked[index] = !newChecked[index]
            return newChecked
        });
    };

    const handleSelectChange = (index, value) => {
        setSelectedOptions(selectedOptions => {
            const newOptions = [...selectedOptions]
            newOptions[index] = value
            return newOptions
        });
    };

    const handleDel = (index) => {
        setItems(items => items.filter((_, i) => i !== index))
        setCheckedItems(checkedItems => checkedItems.filter((_, i) => i !== index))
        setSelectedOptions(selectedOptions => selectedOptions.filter((_, i) => i !== index))
    };

    const clearAllItems = () => {
        setItems([]);
        setCheckedItems([]);
        setSelectedOptions([]);
    };

    const sortItems = (order) => {
        let sortedItems = [...items]
        let sortedCheckedItems = [...checkedItems]
        let sortedSelectedOptions = [...selectedOptions]

        if (order === "desc") {
            sortedItems.sort()
            sortedSelectedOptions = sortedItems.map(item => {
                const index = items.indexOf(item)
                return selectedOptions[index]
            });
            sortedCheckedItems = sortedItems.map(item => {
                const index = items.indexOf(item)
                return checkedItems[index]
            })
        } else if (order === "checked") {
            const packedItems = sortedItems.filter((_, index) => sortedCheckedItems[index])
            const unpackedItems = sortedItems.filter((_, index) => !sortedCheckedItems[index])
            sortedItems = [...packedItems, ...unpackedItems]
            sortedCheckedItems = [...sortedCheckedItems.filter((_, index) => sortedCheckedItems[index]), ...sortedCheckedItems.filter((_, index) => !sortedCheckedItems[index])]
            sortedSelectedOptions = [...sortedSelectedOptions.filter((_, index) => sortedCheckedItems[index]), ...sortedSelectedOptions.filter((_, index) => !sortedCheckedItems[index])]
        } else if (order === "input") {
            sortedItems = [...originalItems]
            sortedCheckedItems = [...checkedItems]
            sortedSelectedOptions = [...selectedOptions]
        }

        setItems(sortedItems)
        setCheckedItems(sortedCheckedItems)
        setSelectedOptions(sortedSelectedOptions)
    };

    const handleSort = (e) => {
        const value = e.target.value
        setSortOrder(value)
        sortItems(value)
    };

    return (
        <main className="bg-[#010101]">
            <Input 
                input={input}
                setInput={setInput}
                handleAddItem={handleAddItem}
                selectedOptions={selectedOptions}
                handleSelectChange={handleSelectChange}
                opt={opt}
            />
            <List 
                items={items}
                checkedItems={checkedItems}
                handleCheckbox={handleCheckbox}
                selectedOptions={selectedOptions}
                handleDel={handleDel}
            />
            <div className="flex flex-wrap bg-[#010101] w-full min-h-[180px] justify-center items-center gap-3 py-8 text-[#2cb67d]">
                <select onChange={handleSort} className="h-[30px] w-[200px] sm:w-[230px] bg-[#363b41] rounded-md pl-3">
                    <option>sort by input order</option>
                    <option  value="desc">sort by description</option>
                    <option  value="checked">sort by packed status</option>
                </select>
                <button onClick={clearAllItems} className="hover:underline">clear list</button>
            </div>
            <div className="min-h-[70px] text-white flex justify-center items-center bg-[#7f5af0]">
                <h2>
                    💼You have {items.length} items on your list, and you already packed {checkedItems.filter(checked => checked).length} 
                    ({items.length > 0 ? Math.round((checkedItems.filter(checked => checked).length / items.length) * 100) : 0}  %)
                </h2>
            </div>

        </main>
    );
}

export default Main;
