import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddTask() {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const mutation = useMutation({
        mutationFn: async (newTask) => {
            return await axiosPublic.post("/tasks", newTask);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            alert("Task added successfully!");
        },
        onError: () => {
            alert("Failed to add task");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        const newTask = {
            title,
            description,
        };

        mutation.mutate(newTask);
        setTitle("");
        setDescription("");
    };

    return (
        <div className="w-full flex justify-center items-center bg-gray-100 p-6"
        // draggable
        // onDrag={0}
        // onDragEnd={0}
        // onDragEnter={0}
        >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Add a New Task</h2>
                <input
                    type="text"
                    placeholder="Title"
                    maxLength={50}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full text-lg"
                    required
                />
                <textarea
                    placeholder="Description (optional)"
                    maxLength={200}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea textarea-bordered w-full text-lg"
                />
                <button type="submit" className="btn btn-primary w-full text-lg">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;
