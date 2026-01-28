import { ImageUp, X } from "lucide-react";
import { useNavigate } from "react-router";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  Send,
  MoreVertical,
  Search,
  Circle,
  MessageSquareDashed,
} from "lucide-react";
import { useState } from "react";

export default function Chat() {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();
  const contacts = [
    {
      id: 1,
      name: "Ana Silva",
      online: true,
      avatar: "AS",
      lastSeen: "online",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      online: true,
      avatar: "CM",
      lastSeen: "online",
    },
    {
      id: 3,
      name: "Marina Costa",
      online: true,
      avatar: "MC",
      lastSeen: "online",
    },
    {
      id: 4,
      name: "Pedro Santos",
      online: true,
      avatar: "PS",
      lastSeen: "online",
    },
    {
      id: 5,
      name: "Julia Oliveira",
      online: true,
      avatar: "JO",
      lastSeen: "online",
    },
    {
      id: 6,
      name: "Ricardo Lima",
      online: true,
      avatar: "RL",
      lastSeen: "online",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Carlos Mendes",
      avatar: "CM",
      text: "E aí, conseguiu terminar o projeto de ontem?",
      time: "14:32",
      isMe: false,
    },
    {
      id: 2,
      sender: "Você",
      avatar: "VC",
      text: "Consegui sim! Foi mais tranquilo do que eu imaginava.",
      time: "14:33",
      isMe: true,
    },
    {
      id: 3,
      sender: "Carlos Mendes",
      avatar: "CM",
      text: "Que bom! Vamos marcar um café essa semana pra comemorar?",
      time: "14:34",
      isMe: false,
    },
    {
      id: 4,
      sender: "Você",
      avatar: "VC",
      text: "Com certeza! Que tal quinta-feira à tarde?",
      time: "14:35",
      isMe: true,
    },
  ];

  const handleNavigateToLobby = () => {
    navigate("/");
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0 || e.target.files === null) {
      console.log("Imagem não enviada");
      return;
    }

    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!img && text.length === 0) {
      alert("Nenhum dado para enviar");
      return;
    }

    const formData = new FormData();

    if (img) {
      formData.append("image", img);

      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = (e) => {
        setPreviewImg(e.target?.result as string);
      };
    }

    if (text) {
      formData.append("text", text);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/messages/send/6977b6065e7729ecb5767d01",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("deu ruim", data);
        return;
      }

      console.log(data);
    } catch (err) {
      console.error(err);
      return;
    }

    setText("");
    setImg(null);
  };

  return (
    <div className="h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
      {confirmDialog && (
        <ConfirmDialog
          title="lobby"
          onCancel={setConfirmDialog}
          action={handleNavigateToLobby}
        />
      )}
      {/* Sidebar de Contatos */}
      <div className="hidden md:flex w-full md:w-80 bg-slate-800/40 backdrop-blur-sm border-r border-slate-700/50 flex-col">
        {/* Header da Sidebar */}
        <div className="p-3 md:p-4 border-b border-slate-700/50">
          <h2 className="text-lg md:text-xl font-light text-slate-100 mb-3">
            Contatos Online
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Lista de Contatos */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 md:p-4 hover:bg-slate-700/30 transition-colors cursor-pointer border-b border-slate-700/30"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-slate-200 font-light text-sm">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-200 font-light text-sm">
                    {contact.name}
                  </h3>
                  <p className="text-slate-500 text-xs">{contact.lastSeen}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área Principal do Chat */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header do Chat */}
        <div className="bg-slate-800/40 backdrop-blur-sm border-b border-slate-700/50 p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-slate-200 font-light text-xs md:text-sm">
                  CM
                </div>
                <Circle className="absolute bottom-0 right-0 w-2 md:w-3 h-2 md:h-3 fill-green-500 text-green-500" />
              </div>
              <div>
                <h2 className="text-sm md:text-base text-slate-100 font-light">
                  Carlos Mendes
                </h2>
                <p className="text-slate-400 text-xs">online</p>
              </div>
            </div>
            <div className="flex text-slate-400 items-center gap-4">
              <div
                className="group flex items-center gap-2 bg-slate-700 py-1 px-3 rounded-md cursor-pointer hover:bg-slate-600 transition-all duration-200"
                onClick={() => setConfirmDialog(true)}
              >
                <MessageSquareDashed
                  size={14}
                  className="text-white group-hover:scale-105"
                />
                <p className="font-light text-sm">Lobby</p>
              </div>
              <button className="text-slate-400 hover:text-slate-300 transition-colors">
                <MoreVertical className="w-4 md:w-5 h-4 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Área de Mensagens */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 md:gap-3 ${message.isMe ? "flex-row-reverse" : ""}`}
            >
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-slate-200 font-light text-xs shrink-0">
                {message.avatar}
              </div>
              <div
                className={`flex flex-col ${message.isMe ? "items-end" : "items-start"} max-w-xs md:max-w-md`}
              >
                <div
                  className={`rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                    message.isMe
                      ? "bg-slate-700/50 text-slate-100"
                      : "bg-slate-800/50 text-slate-100"
                  }`}
                >
                  <p className="text-xs md:text-sm font-light">
                    {message.text}
                  </p>
                </div>
                <span className="text-xs text-slate-500 mt-1">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Área de Input */}
        <div className="bg-slate-800/40 backdrop-blur-sm border-t border-slate-700/50 p-3 md:p-4">
          {/* Preview de Imagem */}
          {img && (
            <div className="mb-4 relative group">
              <div className="flex items-center justify-between bg-linear-to-r from-slate-800/60 to-slate-900/60 rounded-lg p-3 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 shadow-lg">
                    {img ? (
                      <img
                        src={previewImg ? previewImg : URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-red-500/80 flex items-center justify-center">
                        <div className="text-center text-white text-xs font-light">
                          <div className="text-2xl">🖼</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 text-sm font-light truncate">
                      Imagem selecionada
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Pronto para enviar
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setImg(null)}
                  className="ml-3 shrink-0 p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 text-slate-400 hover:text-red-400 group/btn"
                  title="Remover imagem"
                >
                  <X className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Input escrever mensagem */}
          <form
            className="flex items-center gap-2 md:gap-3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Digite sua mensagem"
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <label
              className={` ${img ? "bg-slate-900" : "bg-slate-800 hover:bg-slate-600 cursor-pointer hover:shadow-xl"}  text-slate-100 p-2 md:p-3 rounded-lg transition-all duration-200 shadow-lg shrink-0 relative group`}
              htmlFor="upload"
            >
              <input
                type="file"
                id="upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleUploadImage(e)}
                disabled={img ? true : false}
              />
              <ImageUp
                className={`w-4 md:w-5 h-4 md:h-5 ${!img && "group-hover:scale-110"} transition-transform`}
              />
            </label>
            <button
              className={`bg-slate-700 hover:bg-slate-600 text-slate-100 p-2 md:p-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl shrink-0 cursor-pointer group`}
            >
              <Send className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
