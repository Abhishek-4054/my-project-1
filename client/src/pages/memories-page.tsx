import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Media } from '@shared/schema';

export default function ChatRoomPage() {
  const { data: messages } = useQuery<Media[]>({
    queryKey: ['/api/messages/recent'],
  });
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = () => {
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSendFile = () => {
    console.log('Sending file:', selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />
        <main className="flex-1 md:pl-64 pt-4 pb-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-700 font-heading">Chat Room</h2>
            </div>

            <div className="flex flex-col space-y-4 overflow-y-auto h-[60vh] border p-4 rounded-lg bg-white shadow">
              {messages?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'doctor' ? 'justify-start' : 'justify-end'}`}
                >
                  <Card
                    className={`w-2/3 ${
                      message.sender === 'doctor' ? 'bg-gray-100' : 'bg-blue-100'
                    } rounded-lg`}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-800">{message.content}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                placeholder="Type your message here..."
                rows={2}
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 shadow-md" onClick={handleSendMessage}>
                Send
              </Button>
              <input
                type="file"
                onChange={handleFileChange}
                className="flex-shrink-0 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 shadow-md" onClick={handleSendFile}>
                Attach File
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
