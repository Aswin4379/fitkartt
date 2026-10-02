import { useState } from 'react'
import { Heart, MessageCircle, Trophy, Plus } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'

const initialPosts = [
  {
    id: 1, name: 'Karthik R.', time: '2h ago', likes: 214, comments: 18, liked: false,
    text: 'Down 8kg in 3 months with FitKart meal plans! Consistency really is everything.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 2, name: 'Sneha P.', time: '5h ago', likes: 156, comments: 9, liked: false,
    text: 'First gym session of the year done! Feeling stronger already 💪',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 3, name: 'Vikram S.', time: '1d ago', likes: 342, comments: 27, liked: false,
    text: 'Hit a new deadlift PR today thanks to the protein plan from FitKart AI.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=70',
  },
]

const challenges = [
  { id: 1, name: '30-Day Squat Challenge', participants: 1240, progress: 60 },
  { id: 2, name: 'Drink 3L Water Daily', participants: 890, progress: 40 },
  { id: 3, name: 'No Sugar November', participants: 512, progress: 80 },
]

export default function Community() {
  const [posts, setPosts] = useState(initialPosts)

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
    )
  }

  return (
    <AppLayout>
      <PageHeader title="Community" subtitle="Transformations & challenges" />

      <div className="page-pad py-5 space-y-6">
        <div>
          <h2 className="section-title mb-3 flex items-center gap-1.5">
            <Trophy size={16} className="text-fit-accent" /> Active Challenges
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {challenges.map((c) => (
              <div key={c.id} className="card p-4 w-52 flex-shrink-0">
                <p className="text-sm font-semibold mb-1">{c.name}</p>
                <p className="text-xs text-fit-muted mb-2">{c.participants.toLocaleString()} joined</p>
                <div className="h-1.5 bg-fit-surface2 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-fit-primary" style={{ width: `${c.progress}%` }} />
                </div>
                <button className="text-xs text-fit-primary font-medium">Join Challenge</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="section-title">Transformation Feed</h2>
          <button className="flex items-center gap-1 text-xs text-fit-primary font-medium">
            <Plus size={14} /> Post
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="card overflow-hidden">
              <div className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-fit-primary/20 flex items-center justify-center text-sm font-semibold text-fit-primary">
                  {post.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{post.name}</p>
                  <p className="text-[11px] text-fit-muted">{post.time}</p>
                </div>
              </div>
              <img src={post.image} alt="" className="w-full aspect-video object-cover" />
              <div className="p-4">
                <p className="text-sm text-fit-text mb-3">{post.text}</p>
                <div className="flex items-center gap-5">
                  <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-xs text-fit-muted">
                    <Heart size={16} className={post.liked ? 'fill-fit-primary text-fit-primary' : ''} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-fit-muted">
                    <MessageCircle size={16} /> {post.comments}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
