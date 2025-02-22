import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import Swal from "sweetalert2";


// eslint-disable-next-line react/prop-types
function DragAndDrop() {
    const dragItem = useRef();
    const dragContainer = useRef();
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState({});


    const { data: response = [], refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const { data } = await axiosPublic('/tasks');
            setData(data);
            console.log(data);

            return data;
        },
    });


    // console.log('test', data);


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

    // const handleDelete = async (id) => {
    //     try {
    //         const deletedTask = await axiosPublic.delete(`/tasks/${id}`);
    //         console.log(deletedTask);
    //         refetch();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleEdit = async (item) => {
        document.getElementById(item._id).showModal();
        const { _id: id, title, description } = item;
        console.log(item);



        // try {
        //     const editedTask = await axiosPublic.put(`/tasks/${id}`);
        //     console.log(editedTask);
        //     refetch();
        // }
        // catch (error) {
        //     console.log(error);
        // }
    };

    // function closeModal() {
    //     document.getElementById("my_modal_1").checked = false;
    //   }


    // const handelSave = async (e) => {
    //     e.preventDefault();
    //     // closeModal();
    //     // document.getElementById("my_modal_1").close();
    // }



    const handelSubmit = async (e, id) => {
        e.preventDefault();
        const form = e.target;
        console.log(form.title);
        console.log(id);

        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;

        console.log({title, description, category});
        // closeModal()
        document.getElementById(id).close();
        // document.getElementById('my_modal_1').classList.remove('open-modal')

        try {
            const editedTask = await axiosPublic.put(`/task-update/${id}`, { title, description, category });
            console.log(editedTask);
            refetch();
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleDrop = async (e, targetContainer) => {
        const item = dragItem.current;
        // console.log(item);
        // const sourceContainer = dragContainer.current;

        // update task category by id
        try {
            const updatedTask = await axiosPublic.put(`/tasks/${item._id}`, { category: targetContainer });
            console.log(updatedTask);
            refetch();
        } catch (error) {
            console.log(error);
        }


        // function closeModal() {
        //     document.getElementById("my-modal").checked = false;
        //   }

        // setData((prev) => {
        //     const newData = { ...prev };
        //     newData[sourceContainer] = newData[sourceContainer].filter((i) => i !== item);
        //     newData[targetContainer] = [...newData[targetContainer], item];

        //     return newData;
        // });
    };
    return (
        <section className="container mx-auto px-4">
            <h1 className="text-center text-4xl font-bold my-4">KanBan Board</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8 my-10">
                {Object.keys(data)?.map((container, index) => {
                    return (
                        <div
                            className="bg-base-200 min-h-64 min-w-3xs p-4 text-base-content rounded-box"
                            key={index}
                            onDrop={(e) => handleDrop(e, container)}
                            onDragOver={handleDragOver}
                        >
                            <h2 className="text-xl font-bold text-center my-4">{container}</h2>
                            {data[container]?.map((item) => {
                                return (
                                    <div
                                        className="bg-base-300 text-base-content p-4 mb-2 cursor-move"
                                        key={item._id}
                                        onDragStart={(e) => handleDragStart(e, item, container)}
                                        onDragEnd={handleDragEnd}
                                        draggable
                                    >
                                        <div>
                                            <h3 className="font-bold">{item?.title}</h3>
                                            <p className="text-xs">{item?.description}</p>
                                        </div>
                                        <div className="flex gap-2 justify-center items-center cursor-pointer mt-4">
                                            <button onClick={() => handleEdit(item)} className="btn btn-sm">Edit</button>
                                            <button onClick={0} className="btn btn-sm">Delete</button>


                                            <div>
                                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                {/* <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button> */}
                                                <dialog id={item._id} className="modal">
                                                    <div className="modal-box">
                                                        <form onSubmit={(e) => handelSubmit(e, item._id)} className=" space-y-1">
                                                            <div className="form-control">
                                                                <label className="label">Title : </label>
                                                                <input
                                                                    name="title"
                                                                    type="text"
                                                                    defaultValue={item?.title}
                                                                    className="input input-bordered w-full"
                                                                />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">Deception : </label>
                                                                <input
                                                                    name="description"
                                                                    type="text"
                                                                    defaultValue={item?.description}
                                                                    className="input input-bordered w-full"
                                                                />
                                                            </div>
                                                            <div className="form-control w-full">
                                                                <label className="label">Category</label>
                                                                <select
                                                                    name="category"
                                                                    defaultValue={item.category}
                                                                    className="select select-bordered w-full"
                                                                >
                                                                    <option value="To-Do">To-Do</option>
                                                                    <option value="Done">Done</option>
                                                                    <option value="In Progress">In Progress</option>
                                                                </select>
                                                            </div>
                                                            <button type="submit" className="btn">Save</button>


                                                        </form>
                                                        {/* <div className="modal-action"> */}
                                                        {/* <form method="dialog" className="w-full flex justify-center gap-4"> */}
                                                        {/* if there is a button in form, it will close the modal */}
                                                        {/* <button onClick={handelSave} className="btn">Save</button>
                                                                <button className="btn">Cancel</button> */}
                                                        {/* </form> */}
                                                        {/* </div> */}
                                                    </div>
                                                </dialog>
                                            </div>


                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default DragAndDrop;
