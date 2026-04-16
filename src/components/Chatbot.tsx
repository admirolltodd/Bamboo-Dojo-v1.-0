import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, Image as ImageIcon } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
  imageUrl?: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "I am the Bamboo Oracle. Ask your foolish questions about sushi, the menu, or kitchen etiquette. I will attempt to answer without weeping." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg: Message = { role: 'user', text: input, imageUrl: imagePreview || undefined };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText = "";
      
      const systemInstruction = `You are the Bamboo Oracle, an ancient, battle-worn piece of nigiri with a tiny bamboo staff. You are a disappointed sensei at Bamboo Sushi Bar & Hibachi Express in Niceville, FL. You narrate with dramatic flair, roast failed attempts with dry wit, and drop cryptic sushi wisdom. You are NOT mean, offensive, or crude — just magnificently condescending in a fun, theatrical way. Answer questions about sushi, kitchen safety, and the restaurant menu. If the user uploads an image, judge it harshly but fairly as a sushi chef.`;

      if (selectedImage) {
        const imagePart = await fileToGenerativePart(selectedImage);
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: [
            { role: 'user', parts: [imagePart, { text: input || "Judge this image." }] }
          ],
          config: { systemInstruction }
        });
        responseText = response.text || "The Oracle is speechless.";
      } else {
        // Build chat history for context
        const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-preview',
          contents: [...history, { role: 'user', parts: [{ text: input }] }],
          config: { systemInstruction }
        });
        responseText = response.text || "The Oracle remains silent.";
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "The Oracle's connection to the spiritual realm (API) has failed. Try again later." }]);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-6 right-6 w-16 h-16 bg-[#FFD700] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 border-4 border-black"
      >
        <span className="text-3xl">🍣</span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-96 bg-gray-900 border-l-2 border-gray-700 shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-black p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍣</span>
              <div>
                <h3 className="text-[#FFD700] font-bold font-sans uppercase tracking-wider">The Oracle</h3>
                <p className="text-xs text-gray-500">Always judging</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'user' 
                    ? 'bg-[#4CAF50] text-black rounded-br-none' 
                    : 'bg-gray-800 text-white border border-gray-700 rounded-bl-none'
                }`}>
                  {msg.imageUrl && (
                    <img src={msg.imageUrl} alt="Uploaded" className="w-full rounded-md mb-2 object-cover max-h-40" />
                  )}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-400 border border-gray-700 rounded-lg rounded-bl-none p-3 text-sm italic">
                  The Oracle is meditating...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black border-t border-gray-800">
            {imagePreview && (
              <div className="relative inline-block mb-2">
                <img src={imagePreview} alt="Preview" className="h-16 rounded border border-gray-600" />
                <button 
                  onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <label className="cursor-pointer bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <ImageIcon size={20} />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Seek wisdom..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 text-white focus:outline-none focus:border-[#4CAF50]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="bg-[#4CAF50] text-black p-3 rounded-lg hover:bg-[#45a049] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
