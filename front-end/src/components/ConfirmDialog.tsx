import { Loader } from "lucide-react";

type DialogType = {
  title?: "lobby" | "logout";
  action: () => void;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  isFetching?: boolean;
};

function ConfirmDialog({
  title = "logout",
  action,
  onCancel,
  isFetching,
}: DialogType) {
  const caption =
    title === "lobby"
      ? "Deseja realmente voltar ao lobby?"
      : "Deseja realmente sair do chat?";

  return (
    <div className="absolute z-10 inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-800 flex flex-col items-center px-10 py-6 rounded-xl border border-slate-700 shadow-lg">
        <p className="text-slate-200 mb-4">{caption}</p>
        <div className="flex gap-3">
          <button
            className="w-30 cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            onClick={() => action()}
          >
            {isFetching ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              "Confirmar"
            )}
          </button>
          <button
            className="w-30 cursor-pointer px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
            onClick={() => onCancel(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
