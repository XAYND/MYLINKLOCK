import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [link, setLink] = useState('');
  const [imageData, setImageData] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!question || !answer || !link) return;

    // Crée un ID unique pour identifier cette énigme
    const imageId = `img-${Date.now()}`;
    if (imageData) {
      localStorage.setItem(imageId, imageData);
    }

    const base = window.location.origin + "/verifier";
    const url = `${base}?question=${encodeURIComponent(question)}&answer=${encodeURIComponent(answer)}&redirect=${encodeURIComponent(link)}&imageId=${imageId}`;
    setGeneratedUrl(url);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">🔐 Créer un lien protégé</h1>

        <label className="block mb-2 font-semibold text-gray-700">💬 Énigme ou indice</label>
        <input
          type="text"
          placeholder="Ex: Quel est mon deuxième prénom ?"
          className="w-full p-2 border rounded-lg mb-4 text-gray-800 bg-white"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label className="block mb-2 font-semibold text-gray-700">🔑 Mot de passe</label>
        <input
          type="text"
          placeholder="Ex: Lucas"
          className="w-full p-2 border rounded-lg mb-4 text-gray-800 bg-white"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <label className="block mb-2 font-semibold text-gray-700">🔗 Lien secret</label>
        <input
          type="text"
          placeholder="Ex: https://coflix.mov/film/vaiana-2/"
          className="w-full p-2 border rounded-lg mb-4 text-gray-800 bg-white"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <label className="block mb-2 font-semibold text-gray-700">🖼️ Image troll (facultatif)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => setImageData(event.target.result);
            reader.readAsDataURL(file);
          }}
          className="mb-4"
        />

        <button
          onClick={generateLink}
          className="w-full p-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Générer le lien 🔗
        </button>

        {generatedUrl && (
          <div className="mt-6">
            <label className="block mb-2 font-semibold text-gray-700">🔓 Lien généré</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-2 text-gray-800 bg-gray-100"
              value={generatedUrl}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              {copied ? "Lien copié ! ✅" : "Copier le lien 📋"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
