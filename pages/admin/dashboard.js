import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [talentName, setTalentName] = useState('');
  const [talentSlug, setTalentSlug] = useState('');
  const [talentImage, setTalentImage] = useState('');
  const [talentProfile, setTalentProfile] = useState('');

  useEffect(() => {
    const password = prompt('パスワードを入力してください');
    // 簡単なパスワード認証。実際にはより安全な方法を推奨します。
    if (password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('パスワードが違います。');
    }
  }, []);

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

  const handleAddTalent = async (e) => {
    e.preventDefault();
    const newTalent = {
      name: talentName,
      slug: talentSlug,
      image: talentImage,
      profile: talentProfile,
      // 他のフィールドは空またはデフォルト値で初期化
      mv_images: [],
      instagram: '',
      tiktok: '',
      birthdate: '',
      birthplace: '',
      height: '',
      hobby: '',
      skill: '',
      history: [],
    };

    const res = await fetch('/api/talents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTalent),
    });

    if (res.ok) {
      alert('タレントを追加しました');
      setTalentName('');
      setTalentSlug('');
      setTalentImage('');
      setTalentProfile('');
    } else {
      alert('タレントの追加に失敗しました。');
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
            <label htmlFor="talentName" className="form-label">名前</label>
            <input type="text" className="form-control" id="talentName" value={talentName} onChange={(e) => setTalentName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="talentSlug" className="form-label">スラッグ (URL用、例: "sample-talent")</label>
            <input type="text" className="form-control" id="talentSlug" value={talentSlug} onChange={(e) => setTalentSlug(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="talentImage" className="form-label">画像パス (例: "/images/sample.jpg")</label>
            <input type="text" className="form-control" id="talentImage" value={talentImage} onChange={(e) => setTalentImage(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="talentProfile" className="form-label">プロフィール</label>
            <textarea className="form-control" id="talentProfile" rows="3" value={talentProfile} onChange={(e) => setTalentProfile(e.target.value)} required></textarea>
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