import DragAndDrop from "./components/DragAndDrop";
const initialData = {
  Todo: [
    "Design UI mockups",
    "Set up project repository",
    "Write unit test",
    "Integrate payment gateway",
  ],
  "In Progress": ["Develop authentication flow", "Implement responsive design"],
  Completed: [
    "Set up CI/CD pipeline",
    "Conduct code reviews",
    "Deploy initial version to staging",
  ],
};

export default function App() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-8">Kanban Board</h1>
      <DragAndDrop initialState={initialData} />
    </section>
  );
}
