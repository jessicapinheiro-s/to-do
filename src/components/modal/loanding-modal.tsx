export default function LoadingModal({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-3xs bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-700">Carregando...</p>
      </div>
    </div>
  );
}
