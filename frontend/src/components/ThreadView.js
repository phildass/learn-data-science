import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import LogoBar from './LogoBar';
import Footer from './Footer';

const ThreadView = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadThread();
    loadPosts();
  }, [threadId]);

  const loadThread = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          author:auth.users(email)
        `)
        .eq('id', threadId)
        .single();

      if (error) throw error;
      setThread(data);
    } catch (error) {
      console.error('Error loading thread:', error);
    }
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          author:auth.users(email)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!newPost.trim()) {
      alert('Please enter a reply');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert([
          {
            thread_id: threadId,
            content: newPost.trim(),
            author: user.id
          }
        ]);

      if (error) throw error;

      setNewPost('');
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to post reply. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <LogoBar />
        <div className="card">
          <div className="loading">Loading thread...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="container">
        <LogoBar />
        <div className="card">
          <h2>Thread not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/forum')}>
            Back to Forum
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <LogoBar />
      
      <div className="card">
        <button className="btn btn-secondary" onClick={() => navigate('/forum')}>
          ← Back to Forum
        </button>
        
        <div className="thread-header">
          <h1>{thread.title}</h1>
          <div className="thread-meta">
            <span>Started by {thread.author?.email || 'Unknown'}</span>
            <span>•</span>
            <span>{new Date(thread.created_at).toLocaleString()}</span>
          </div>
        </div>

        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="empty-state">
              <p>No posts yet. Be the first to reply!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-header">
                  <strong>{post.author?.email || 'Unknown'}</strong>
                  <span className="post-date">
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="post-content">
                  {post.content}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmitPost} className="reply-form">
          <h3>Post a Reply</h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            className="form-textarea"
            rows="5"
            disabled={submitting}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Posting...' : 'Post Reply'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ThreadView;
