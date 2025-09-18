'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

// Interface defining the structure of a contact message
interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'read' | 'unread' | 'resolved' | 'pending';
    createdAt: string;
}

export default function ContactPage() {
    /**
     * State Management:
     * - messages: Stores all contact messages
     * - loading: Tracks the loading state while fetching messages
     * - editingMessage: Holds the message currently being edited, null if none
     */
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingMessage, setEditingMessage] = useState<ContactMessage | null>(null);

    /**
     * Fetches all contact messages from the API
     * Handles error cases and updates loading state
     */
    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/contacts');
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                toast.error('Failed to fetch messages');
            }
        } catch (error) {
            toast.error('Error fetching messages');
        } finally {
            setLoading(false);
        }
    };

    // Load messages when component mounts
    useEffect(() => {
        fetchMessages();
    }, []);

    /**
     * Updates the status of a message
     * @param id - Message ID to update
     * @param status - New status to set (read/unread/resolved/pending)
     */
    const handleStatusChange = async (id: string, status: 'read' | 'unread' | 'resolved' | 'pending') => {
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                setMessages(messages.map(msg =>
                    msg._id === id ? { ...msg, status } : msg
                ));
                toast.success(`Message marked as ${status}`);
            }
        } catch (error) {
            toast.error('Error updating message status');
        }
    };

    /**
     * Deletes a message after user confirmation
     * @param id - Message ID to delete
     */
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const response = await fetch(`/api/contacts/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setMessages(messages.filter(msg => msg._id !== id));
                    toast.success('Message deleted successfully');
                } else {
                    toast.error('Failed to delete message');
                }
            } catch (error) {
                toast.error('Error deleting message');
            }
        }
    };

    /**
     * Saves edited message details to the API
     * @param message - Updated message object
     */
    const handleEdit = async (message: ContactMessage) => {
        try {
            const response = await fetch(`/api/contacts/${message._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            if (response.ok) {
                setMessages(messages.map(msg =>
                    msg._id === message._id ? message : msg
                ));
                setEditingMessage(null);
                toast.success('Message updated successfully');
            } else {
                toast.error('Failed to update message');
            }
        } catch (error) {
            toast.error('Error updating message');
        }
    };

    /**
     * Determines CSS classes for status badges based on message status
     * @param status - Message status
     * @returns CSS class string for the badge
     */
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'unread':
                return 'bg-red-100 text-red-800';
            case 'read':
                return 'bg-blue-100 text-blue-800';
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Show loading state while fetching messages
    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
            <div className="grid gap-4">
                {messages.map((message) => (
                    // Message card container
                    <div key={message._id} className="p-4 rounded-lg border border-gray-200 bg-white">
                        {editingMessage?._id === message._id ? (
                            // Edit form view - shown when editing a message
                            <div className="space-y-4">
                                {/* Form inputs for editing message details */}
                                <input
                                    type="text"
                                    value={editingMessage.name}
                                    onChange={(e) => setEditingMessage({ ...editingMessage, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    value={editingMessage.email}
                                    onChange={(e) => setEditingMessage({ ...editingMessage, email: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    placeholder="Email"
                                />
                                <input
                                    type="tel"
                                    value={editingMessage.phone}
                                    onChange={(e) => setEditingMessage({ ...editingMessage, phone: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    placeholder="Phone"
                                />
                                <input
                                    type="text"
                                    value={editingMessage.subject}
                                    onChange={(e) => setEditingMessage({ ...editingMessage, subject: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    placeholder="Subject"
                                />
                                <textarea
                                    value={editingMessage.message}
                                    onChange={(e) => setEditingMessage({ ...editingMessage, message: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    placeholder="Message"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(editingMessage)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingMessage(null)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Regular message view
                            <>
                                <div className="flex justify-between items-start mb-2">
                                    {/* Message header with contact details */}
                                    <div>
                                        <h3 className="font-semibold">{message.name}</h3>
                                        <p className="text-sm text-gray-600">{message.email}</p>
                                        <p className="text-sm text-gray-600">{message.phone}</p>
                                        <p className="text-sm font-medium text-gray-700">{message.subject}</p>
                                    </div>

                                    {/* Action buttons and status controls */}
                                    <div className="flex items-center gap-4">
                                        {/* Status badge */}
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(message.status)}`}>
                                            {message.status}
                                        </span>

                                        {/* Status dropdown */}
                                        <select
                                            value={message.status}
                                            onChange={(e) => handleStatusChange(message._id, e.target.value as ContactMessage['status'])}
                                            className="text-sm border rounded px-2 py-1"
                                        >
                                            <option value="unread">Unread</option>
                                            <option value="read">Read</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="pending">Pending</option>
                                        </select>

                                        {/* Edit and Delete buttons */}
                                        <button
                                            onClick={() => setEditingMessage(message)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(message._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Message content and timestamp */}
                                <p className="text-gray-700 mt-2">{message.message}</p>
                                <div className="text-sm text-gray-500 mt-2">
                                    {new Date(message.createdAt).toLocaleDateString()}
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {/* Empty state message */}
                {messages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No messages found
                    </div>
                )}
            </div>
        </div>
    );
}