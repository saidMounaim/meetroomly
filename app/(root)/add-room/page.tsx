import AddRoomForm from "@/components/shared/forms/AddRoomForm";

export default function AddRoomPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Add New Room</h1>
      <AddRoomForm />
    </div>
  );
}
