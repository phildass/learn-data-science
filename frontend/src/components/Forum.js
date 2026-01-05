import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import LogoBar from './LogoBar';
import Footer from './Footer';

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          author:auth.users(email),
          posts:forum_posts(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setThreads(data || []);
    } catch (error) {
      console.error('Error loading threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    
    if (!newThreadTitle.trim()) {
      alert('Please enter a thread title');
      return;
    }

    try {
      // Create thread
      const { data: threadData, error: threadError } = await supabase
        .from('forum_threads')
        .insert([
          {
            title: newThreadTitle.trim(),
            author: user.id
          }
        ])
        .select()
        .single();

      if (threadError) throw threadError;

      // Create initial post if content provided
      if (newThreadContent.trim()) {
        const { error: postError } = await supabase
          .from('forum_posts')
          .insert([
            {
              thread_id: threadData.id,
              content: newThreadContent.trim(),
              author: user.id
            }
          ]);

        if (postError) throw postError;
      }

      // Reset form and reload
      setNewThreadTitle('');
      setNewThreadContent('');
      setShowCreateThread(false);
      loadThreads();
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('Failed to create thread. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <LogoBar />
        <div className="card">
          <div className="loading">Loading forum...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <LogoBar />
      
      <div className="forum-header">
        <h1>💬 Community Forum</h1>
        <p>Connect with fellow learners and share knowledge</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Discussion Threads</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateThread(!showCreateThread)}
          >
            {showCreateThread ? 'Cancel' : 'New Thread'}
          </button>
        </div>

        {showCreateThread && (
          <form onSubmit={handleCreateThread} className="create-thread-form">
            <div className="form-group">
              <label>Thread Title *</label>
              <input
                type="text"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                placeholder="What's your question or topic?"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Initial Post (Optional)</label>
              <textarea
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
                placeholder="Add more details..."
                className="form-textarea"
                rows="5"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Thread
            </button>
          </form>
        )}

        {threads.length === 0 ? (
          <div className="empty-state">
            <p>No threads yet. Be the first to start a discussion!</p>
          </div>
        ) : (
          <div className="threads-list">
            {threads.map((thread) => (
              <div 
                key={thread.id} 
                className="thread-item"
                onClick={() => navigate(`/forum/thread/${thread.id}`)}
              >
                <div className="thread-content">
                  <h3>{thread.title}</h3>
                  <div className="thread-meta">
                    <span>Started by {thread.author?.email || 'Unknown'}</span>
                    <span>•</span>
                    <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{thread.posts?.[0]?.count || 0} replies</span>
                  </div>
                </div>
                <div className="thread-arrow">→</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Forum;
