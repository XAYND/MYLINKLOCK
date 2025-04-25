import { useState } from 'react';
import { FaLock, FaKey, FaQuestionCircle, FaLink, FaImage } from 'react-icons/fa';

function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [redirect, setRedirect] = useState('');
  const [image, setImage] = useState(null);
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateLink = () => {
    if (!question || !answer || !redirect) return;
    const params = new URLSearchParams({
      question,
      answer,
      redirect,
    });
    if (image) {
      params.append('image', image);
    }
    setGeneratedUrl(`${window.location.origin}/MYLINKLOCK/verifier?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <div className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaLock /> Créer un lien protégé
        </div>

        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaQuestionCircle /> Énigme ou indice
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          placeholder="Ex: Quel est mon deuxième prénom ?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaKey /> Mot de passe
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          placeholder="Ex: Lucas"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaLink /> Lien secret
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
          placeholder="Ex: https://coflix.mov/film/..."
          value={redirect}
          onChange={(e) => setRedirect(e.target.value)}
        />

        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaImage /> Image troll (facultatif)
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleImageUpload}
        />

        <button
          onClick={generateLink}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Générer le lien 🔗
        </button>

        {generatedUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Lien généré :</p>
            <a
              href={generatedUrl}
              className="text-blue-600 break-all underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {generatedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
