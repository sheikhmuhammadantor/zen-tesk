import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";


// eslint-disable-next-line react/prop-types
function DragAndDrop() {
    const dragItem = useRef();
    const dragContainer = useRef();
    const axiosPublic = useAxiosPublic();


    const [data, setData] = useState({});
    const { data: response = [] } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const { data } = await axiosPublic('/tasks');
            setData(data);
            console.log(data);

            return data;
        },
    });


    console.log('test', data);


    const handleDragStart = (e, item, container) => {
        dragItem.current = item;
        dragContainer.current = container;
        e.target.style.opacity = "0.5";
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = "1";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetContainer) => {
        const item = dragItem.current;
        console.log(item);
        const sourceContainer = dragContainer.current;
        setData((prev) => {
            const newData = { ...prev };
            newData[sourceContainer] = newData[sourceContainer].filter((i) => i !== item);
            newData[targetContainer] = [...newData[targetContainer], item];
            return newData;
        });
    };
    return (
        <div className="flex justify-center space-x-4 mt-12">
            {Object.keys(data)?.map((container, index) => {
                return (
                    <div
                        className="bg-base-200 w-60 min-h-64 p-4 text-base-content rounded-box"
                        key={index}
                        onDrop={(e) => handleDrop(e, container)}
                        onDragOver={handleDragOver}
                    >
                        <h2 className="text-xl font-bold text-center my-4">{container}</h2>
                        {data[container]?.map((item, idx) => {
                            return (
                                <div
                                    className="bg-base-300 text-base-content p-4 mb-2 cursor-move"
                                    key={idx}
                                    onDragStart={(e) => handleDragStart(e, item, container)}
                                    onDragEnd={handleDragEnd}
                                    draggable
                                >
                                    <h3 className="font-bold">{item?.title}</h3>
                                    <p className="text-xs">{item?.description}</p>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default DragAndDrop;
