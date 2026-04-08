import { ImageUp, X, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  Send,
  MoreVertical,
  Search,
  Circle,
  MessageSquareDashed,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";

type MessageType = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

type ContactType = {
  _id: string;
  createdAt?: Date;
  email: string;
  fullname: string;
  profilePic: string;
  updatedAt?: Date;
};

export default function Chat() {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [img, setImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [chatPartner, setChatPartner] = useState<ContactType[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [receiver, setReceiver] = useState<ContactType>({
    _id: "",
    email: "",
    fullname: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const { authuser, joinChat, userJoined } = useAuth();

  // get messages from parnter
  useEffect(() => {
    async function getAllMessagesByPartnerId() {
      setIsMessagesLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/messages/${receiver._id}`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) return;

        const data = await response.json();
        setMessageList(data);
      } catch (err) {
        throw new Error("erro");
        console.table(err);
      } finally {
        setIsMessagesLoading(false);
      }
    }
    getAllMessagesByPartnerId();
  }, [receiver]);

  useEffect(() => {
    console.log("Chat montado");
    joinChat();

    return () => {
      console.log("Chat desmontado");
    };
  }, [joinChat]);

  useEffect(() => {
    console.log("Entrou no chat");
    userJoined();

    return () => {
      console.log("Saiu do chat");
    };
  }, [userJoined]);

  // get chat partner
  useEffect(() => {
    async function getChatPartnerInfo() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/messages/get-chat-partner",
          {
            credentials: "include",
          },
        );

        if (!response.ok) return;

        const data = await response.json();
        setChatPartner(data);
      } catch (err) {
        console.error(err);
      }
    }

    getChatPartnerInfo();
  }, []);

  if (!authuser) return;

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

  const handleChangeReceiver = (contact: ContactType) => {
    setReceiver(contact);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!img && text.length === 0) {
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
        `http://localhost:3000/api/messages/send/${receiver._id}`,
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

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="h-screen w-full bg-[#0a0a0f] relative overflow-hidden flex">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-100 h-100 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {confirmDialog && (
        <ConfirmDialog
          title="lobby"
          onCancel={setConfirmDialog}
          action={handleNavigateToLobby}
        />
      )}

      {/* Sidebar de Contatos */}
      <div
        className={`${
          showSidebar ? "flex" : "hidden md:flex"
        } absolute md:relative z-20 w-full md:w-80 h-full bg-[#0a0a0f]/95 md:md:bg-white/2 backdrop-blur-xl border-r border-white/10 flex-col`}
      >
        {/* Header da Sidebar */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Mensagens</h2>
              <p className="text-white/40 text-xs">Realtime Chat</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar contatos..."
              className="w-full md:bg-white/2 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all"
            />
          </div>
        </div>

        {/* Lista de Contatos */}
        <div className="flex-1 overflow-y-auto">
          {chatPartner &&
            chatPartner.map((contact) => (
              <div
                key={contact._id}
                className={`p-4 hover:hover:bg-white/3 transition-colors cursor-pointer border-b border-white/5 ${
                  receiver._id === contact._id &&
                  "bg-white/5 border-l-2 border-l-cyan-500"
                }`}
                onClick={() => handleChangeReceiver(contact)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-white font-semibold text-sm border border-white/10">
                      {contact.profilePic
                        ? contact.profilePic
                        : getInitials(contact.fullname)}
                    </div>
                    <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-emerald-500 text-emerald-500 stroke-[3px] stroke-[#0a0a0f]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">
                      {contact.fullname}
                    </h3>
                    <p className="text-white/40 text-xs truncate">
                      {contact.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Área Principal do Chat */}
      <div
        className={`flex-1 flex flex-col h-full relative z-10 ${!showSidebar && "hidden md:flex"}`}
      >
        {!receiver._id ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl md:bg-white/2 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquareDashed className="w-10 h-10 text-white/20" />
              </div>
              <p className="text-white/40 text-lg">
                Selecione um contato para começar
              </p>
              <p className="text-white/20 text-sm mt-2">
                Escolha alguém da lista para iniciar uma conversa
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header do Chat */}
            <div className="md:bg-white/2 backdrop-blur-xl border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="md:hidden mr-2 text-white/60 hover:text-white"
                    onClick={() => setShowSidebar(true)}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-white font-semibold text-sm border border-white/10">
                      {getInitials(receiver.fullname)}
                    </div>
                    <Circle className="absolute bottom-0 right-0 w-2.5 h-2.5 fill-emerald-500 text-emerald-500 stroke-[3px] stroke-[#0a0a0f]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      {receiver.fullname}
                    </h2>
                    <p className="text-emerald-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center gap-2 bg-white/5 hover:hover:bg-white/8 text-white/70 hover:text-white py-2 px-3 rounded-xl transition-all duration-200 border border-white/10"
                    onClick={() => setConfirmDialog(true)}
                  >
                    <MessageSquareDashed className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">Lobby</span>
                  </button>
                  <button className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
              {messageList.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-white/20 text-sm">
                    Nenhuma mensagem ainda. Comece a conversa!
                  </p>
                </div>
              ) : (
                messageList.map((message) => {
                  const isSender = authuser?._id === message.senderId;
                  return (
                    <div
                      key={message._id}
                      className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 ${
                          isSender
                            ? "bg-linear-to-br from-cyan-500 to-blue-500 text-white rounded-br-sm shadow-cyan-500/20"
                            : "bg-white/5 border border-white/10 text-white rounded-bl-sm"
                        }`}
                      >
                        <div>
                          {message.image && (
                            <img
                              src={message.image}
                              className="rounded-xl max-w-full mb-2"
                              alt="imagem"
                            />
                          )}
                        </div>
                        <p className="text-sm leading-relaxed">
                          {message.text}
                        </p>
                        <p
                          className={`text-[10px] mt-1 ${isSender ? "text-white/60" : "text-white/30"}`}
                        >
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Área de Input */}
            <div className="md:bg-white/2 backdrop-blur-xl border-t border-white/10 p-4">
              {/* Preview de Imagem */}
              {img && (
                <div className="mb-3 relative">
                  <div className="flex items-center gap-3 hover:bg-white/3 rounded-xl p-3 border border-white/10">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      {img ? (
                        <img
                          src={
                            previewImg ? previewImg : URL.createObjectURL(img)
                          }
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {img.name}
                      </p>
                      <p className="text-white/40 text-xs">
                        Pronto para enviar
                      </p>
                    </div>
                    <button
                      onClick={() => setImg(null)}
                      className="shrink-0 p-2 hover:bg-white/5 rounded-xl transition-all text-white/40 hover:text-red-400"
                      title="Remover imagem"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Input escrever mensagem */}
              <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 md:bg-white/2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <label
                  className={`${
                    img
                      ? "bg-white/5 cursor-not-allowed"
                      : "bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10"
                  } text-white/60 hover:text-white p-3 rounded-xl transition-all duration-200 shrink-0`}
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
                  <ImageUp className="w-5 h-5" />
                </label>
                <button
                  type="submit"
                  disabled={!text && !img}
                  className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
