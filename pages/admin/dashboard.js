

import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Article state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Talent state
  const [talentForm, setTalentForm] = useState({
    name: '',
    slug: '',
    birthdate: '',
    birthplace: '',
    height: '',
    hobby: '',
    skill: '',
    profile: '',
    image: '',
    mv_images: '',
    history: '',
    instagram: '',
    tiktok: ''
  });

  useEffect(() => {
    const password = prompt('パスワードを入力してください');
    if (password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('パスワードが違います。');
    }
  }, []);

  const handleTalentChange = (e) => {
    const { name, value } = e.target;
    setTalentForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  const handleAddTalent = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/talents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(talentForm),
    });

    if (res.ok) {
      alert('タレントを追加しました');
      // Reset form
      setTalentForm({
        name: '', slug: '', birthdate: '', birthplace: '', height: '',
        hobby: '', skill: '', profile: '', image: '', mv_images: '',
        history: '', instagram: '', tiktok: ''
      });
    } else {
      const errorData = await res.json();
      alert(`タレントの追加に失敗しました: ${errorData.message}`);
    }
  };

  if (!isAuthenticated) {
    return <div>アクセス権がありません。</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="my-4">管理者ダッシュボード</h1>

      <section className="mb-5">
        <h2 className="my-4">タレント追加</h2>
        <form onSubmit={handleAddTalent}>
          <div className="mb-3">
            <label className="form-label">名前</label>
            <input type="text" name="name" value={talentForm.name} onChange={handleTalentChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">スラッグ (URL用、例: "sample-talent")</label>
            <input type="text" name="slug" value={talentForm.slug} onChange={handleTalentChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">生年月日</label>
            <input type="text" name="birthdate" value={talentForm.birthdate} onChange={handleTalentChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">出身地</label>
            <input type="text" name="birthplace" value={talentForm.birthplace} onChange={handleTalentChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">身長</label>
            <input type="text" name="height" value={talentForm.height} onChange={handleTalentChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">趣味</label>
            <input type="text" name="hobby" value={talentForm.hobby} onChange={handleTalentChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">特技</label>
            <input type="text" name="skill" value={talentForm.skill} onChange={handleTalentChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">プロフィール</label>
            <textarea name="profile" value={talentForm.profile} onChange={handleTalentChange} className="form-control" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">メイン画像URL (例: /images/sample1.jpg)</label>
            <input type="text" name="image" value={talentForm.image} onChange={handleTalentChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">自動で流れる画像 (1行に1URLずつ入力)</label>
            <textarea name="mv_images" value={talentForm.mv_images} onChange={handleTalentChange} className="form-control" rows="4" placeholder="/images/avecstar_1.jpg\n/images/avecstar_2.jpg"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">History (1行に「年,イベント」の形式で入力)</label>
            <textarea name="history" value={talentForm.history} onChange={handleTalentChange} className="form-control" rows="4" placeholder="2023年3月,イベント名1\n2024年5月,イベント名2"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Instagram URL</label>
            <input type="text" name="instagram" value={talentForm.instagram} onChange={handleTalentChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">TikTok URL</label>
            <input type="text" name="tiktok" value={talentForm.tiktok} onChange={handleTalentChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">タレント追加</button>
        </form>
      </section>

      <hr />

      <section>
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
          <button type="submit" className="btn btn-primary">記事投稿</button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;
