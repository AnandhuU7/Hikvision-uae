"use client"
import { useState, useEffect } from 'react';

const WhatsAppIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    {
      text: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: false
    }
  ]);

  useEffect(() => {
    const text = "Hello! How can we help you today? 👋";
    let index = 0;
    
    // Typing animation
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setChatMessages(prev => [{
          ...prev[0],
          text: text.substring(0, index + 1)
        }]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    // Real-time time update
    const timeInterval = setInterval(() => {
      setChatMessages(prev => [{
        ...prev[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 60000); // Update every minute

    return () => {
      clearInterval(typingInterval);
      clearInterval(timeInterval);
    };
  }, []);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.whatsapp-widget')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message to chat
      const newMessage = {
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      };
      setChatMessages([...chatMessages, newMessage]);
      
      // Short delay before redirecting to WhatsApp
      setTimeout(() => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/+971509893134?text=${encodedMessage}`, '_blank');
        setMessage('');
      }, 500);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="whatsapp-widget mb-4 w-[350px] rounded-2xl shadow-2xl bg-gray-900 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-900 to-red-800 p-4 flex justify-between items-center">
            <div className="text-white">
              <h3 className="font-bold text-lg">Hikvision UAE</h3>
              {/* <p className="text-sm font-medium">L.L.C Dubai</p> */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <p className="text-sm">Online - Ready to chat</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat area */}
          <div className="h-[350px] bg-gray-800 p-4 overflow-y-auto">
            <div className="h-full flex flex-col justify-end">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`${
                    msg.isUser 
                      ? 'bg-red-800 text-white ml-auto' 
                      : 'bg-gray-700 text-gray-100'
                  } rounded-lg shadow-md p-3 mb-4 max-w-[80%] transform animate-slideIn`}
                >
                  <p className="text-current">
                    {msg.text}
                    {isTyping && !msg.isUser && (
                      <span className="inline-flex ml-2">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-300 text-right mt-1">{msg.time}</p>
                </div>
              ))}
              
              <form onSubmit={handleSubmit} className="w-full transform transition-transform hover:scale-[1.02]">
                <div className="bg-gray-700 p-4 rounded-lg shadow-md flex items-center gap-3 hover:bg-gray-600 transition-colors">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message and press Enter..."
                    className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Icon Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="whatsapp-widget bg-green-600 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 relative hover:bg-green-500"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppIcon;