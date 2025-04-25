import { useState, useEffect } from 'react';

export default function Verifier() {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuestion(params.get('question') || 'Aucune question définie.');
    setCorrectAnswer(params.get('answer') || '');
    setRedirectUrl(params.get('redirect') || '');

    const imageId = params.get('imageId');
    if (imageId) {
      const storedImage = localStorage.getItem(imageId);
      if (storedImage) {
        setImageUrl(storedImage);
      }
    }
  }, []);

  const handleVerify = () => {
    if (userAnswer === correctAnswer) {
      window.location.href = redirectUrl;
    } else {
      setError('❌ Mauvaise réponse. Essaie encore !');
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">🔒 Accès protégé</h2>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Image personnalisée"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
        )}

        <p className="mb-4 text-gray-700 text-center">{question}</p>

        <input
          type="text"
          placeholder="Entre ta réponse ici"
          className="w-full p-2 border rounded-lg mb-4 text-gray-800 bg-white"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Valider la réponse ✅
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
