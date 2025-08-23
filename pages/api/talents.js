import fs from 'fs';
import path from 'path';

const talentsFilePath = path.join(process.cwd(), 'data', 'talents.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, slug, image, profile } = req.body;

      if (!name || !slug || !image || !profile) {
        return res.status(400).json({ message: '必要なフィールドが不足しています。' });
      }

      const fileContents = fs.readFileSync(talentsFilePath, 'utf8');
      const data = JSON.parse(fileContents);

      const newTalent = {
        id: data.talents.length > 0 ? Math.max(...data.talents.map(t => t.id)) + 1 : 1,
        name,
        slug,
        image,
        profile,
        mv_images: [],
        instagram: "",
        tiktok: "",
        birthdate: "",
        birthplace: "",
        height: "",
        hobby: "",
        skill: "",
        history: []
      };

      data.talents.push(newTalent);

      fs.writeFileSync(talentsFilePath, JSON.stringify(data, null, 2));

      res.status(200).json({ message: 'タレントが正常に追加されました。' });
    } catch (error) {
      res.status(500).json({ message: 'サーバーエラーが発生しました。' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
