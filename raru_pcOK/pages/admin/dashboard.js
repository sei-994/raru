import { useState } from 'react';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddArticle = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert('記事を追加しました');
      setTitle('');
      setContent('');
    } else {
      alert('記事の追加に失敗しました。');
    }
  };

  return (
    <div>
      <h1 className="my-4">管理者ダッシュボード</h1>

      <h2 className="my-4">記事投稿</h2>
      <form onSubmit={handleAddArticle}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">タイトル</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">内容</label>
          <textarea className="form-control" id="content" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">投稿</button>
      </form>
    </div>
  );
};

export default AdminDashboard;