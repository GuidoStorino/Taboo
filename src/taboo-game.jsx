import { useState, useEffect, useRef } from 'react';
import './taboo-game.css';

// Base de datos de cartas de Taboo
const CARD_DATABASE = [
  { word: 'PLAYA', forbidden: ['ARENA', 'MAR', 'SOL', 'VERANO', 'AGUA'] },
  { word: 'CAFÉ', forbidden: ['BEBIDA', 'CAFEÍNA', 'TAZA', 'MAÑANA', 'ESPRESSO'] },
  { word: 'FÚTBOL', forbidden: ['PELOTA', 'DEPORTE', 'GOL', 'CANCHA', 'EQUIPO'] },
  { word: 'PIZZA', forbidden: ['COMIDA', 'QUESO', 'ITALIANA', 'HORNO', 'MASA'] },
  { word: 'GUITARRA', forbidden: ['INSTRUMENTO', 'MÚSICA', 'CUERDAS', 'TOCAR', 'CANCIÓN'] },
  { word: 'LIBRO', forbidden: ['LEER', 'PÁGINAS', 'HISTORIA', 'AUTOR', 'BIBLIOTECA'] },
  { word: 'AVIÓN', forbidden: ['VOLAR', 'ALAS', 'AEROPUERTO', 'PILOTO', 'CIELO'] },
  { word: 'TELÉFONO', forbidden: ['LLAMAR', 'CELULAR', 'PANTALLA', 'MÓVIL', 'MENSAJE'] },
  { word: 'MONTAÑA', forbidden: ['ALTO', 'ESCALAR', 'PICO', 'NIEVE', 'ROCA'] },
  { word: 'CHOCOLATE', forbidden: ['DULCE', 'CACAO', 'BARRA', 'POSTRE', 'MARRÓN'] },
  { word: 'PERRO', forbidden: ['MASCOTA', 'LADRAR', 'ANIMAL', 'COLA', 'CACHORRO'] },
  { word: 'CINE', forbidden: ['PELÍCULA', 'PANTALLA', 'PALOMITAS', 'BUTACA', 'ACTOR'] },
  { word: 'RELOJ', forbidden: ['TIEMPO', 'HORA', 'PULSERA', 'MANECILLAS', 'MINUTOS'] },
  { word: 'COCINA', forbidden: ['COCINAR', 'ESTUFA', 'COMIDA', 'CHEF', 'RECETA'] },
  { word: 'MÉDICO', forbidden: ['DOCTOR', 'HOSPITAL', 'ENFERMEDAD', 'CURAR', 'SALUD'] },
  { word: 'TAXI', forbidden: ['CARRO', 'CHOFER', 'VIAJE', 'AMARILLO', 'TRANSPORTE'] },
  { word: 'LLUVIA', forbidden: ['AGUA', 'PARAGUAS', 'MOJADO', 'GOTAS', 'NUBE'] },
  { word: 'ZAPATO', forbidden: ['PIE', 'CAMINAR', 'CALZADO', 'CORDONES', 'SUELA'] },
  { word: 'FOTOGRAFÍA', forbidden: ['CÁMARA', 'IMAGEN', 'FOTO', 'CAPTURAR', 'MEMORIA'] },
  { word: 'BAILE', forbidden: ['DANZAR', 'MÚSICA', 'MOVER', 'FIESTA', 'RITMO'] },
  { word: 'COMPUTADORA', forbidden: ['PC', 'PANTALLA', 'TECLADO', 'TECNOLOGÍA', 'SOFTWARE'] },
  { word: 'UNIVERSIDAD', forbidden: ['ESTUDIAR', 'CARRERA', 'ESTUDIANTE', 'PROFESOR', 'TÍTULO'] },
  { word: 'RESTAURANTE', forbidden: ['COMER', 'MESERO', 'MENÚ', 'COMIDA', 'MESA'] },
  { word: 'NAVIDAD', forbidden: ['DICIEMBRE', 'REGALO', 'ÁRBOL', 'FIESTA', 'PAPÁ NOEL'] },
  { word: 'BICICLETA', forbidden: ['PEDALEAR', 'RUEDAS', 'CADENA', 'MANUBRIO', 'CASCO'] },
  { word: 'DENTISTA', forbidden: ['DIENTES', 'MUELAS', 'CARIES', 'CONSULTORIO', 'DOLOR'] },
  { word: 'JARDÍN', forbidden: ['PLANTAS', 'FLORES', 'VERDE', 'REGAR', 'TIERRA'] },
  { word: 'ALMOHADA', forbidden: ['DORMIR', 'CAMA', 'CABEZA', 'SUAVE', 'DESCANSAR'] },
  { word: 'SUPERMERCADO', forbidden: ['COMPRAR', 'CARRITO', 'PRODUCTOS', 'CAJERO', 'ALIMENTOS'] },
  { word: 'FIESTA', forbidden: ['CELEBRAR', 'INVITADOS', 'MÚSICA', 'BAILAR', 'CUMPLEAÑOS'] },
];

function TabooGame() {
  const [gameState, setGameState] = useState('setup'); // setup, playing, review, endgame
  const [numTeams, setNumTeams] = useState(2);
  const [timeLimit, setTimeLimit] = useState(60);
  const [targetScore, setTargetScore] = useState(10);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [usedCards, setUsedCards] = useState([]);
  const [roundCards, setRoundCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  // Obtener una carta aleatoria no usada
  const getRandomCard = () => {
    const availableCards = CARD_DATABASE.filter(
      card => !usedCards.find(used => used.word === card.word)
    );
    
    if (availableCards.length === 0) {
      setUsedCards([]);
      return CARD_DATABASE[Math.floor(Math.random() * CARD_DATABASE.length)];
    }
    
    return availableCards[Math.floor(Math.random() * availableCards.length)];
  };

  // Iniciar juego
  const startGame = () => {
    const teamArray = Array.from({ length: numTeams }, (_, i) => ({
      id: i,
      name: `Equipo ${i + 1}`,
      score: 0,
    }));
    setTeams(teamArray);
    setCurrentTeam(0);
    setGameState('playing');
    startRound();
  };

  // Iniciar ronda
  const startRound = () => {
    setRoundCards([]);
    setTimeLeft(timeLimit);
    const card = getRandomCard();
    setCurrentCard(card);
    setUsedCards(prev => [...prev, card]);
  };

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('review');
    }
    
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, gameState]);

  // Manejo de swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const currentTouch = e.touches[0].clientY;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setSwipeDirection('up');
      } else {
        setSwipeDirection('down');
      }
    }
  };

  const handleTouchEnd = () => {
    if (swipeDirection === 'up') {
      handleCorrect();
    } else if (swipeDirection === 'down') {
      handleSkip();
    }
    
    setTouchStart(null);
    setSwipeDirection(null);
  };

  // Carta correcta
  const handleCorrect = () => {
    setRoundCards(prev => [...prev, { ...currentCard, correct: true }]);
    const nextCard = getRandomCard();
    setCurrentCard(nextCard);
    setUsedCards(prev => [...prev, nextCard]);
  };

  // Saltar carta
  const handleSkip = () => {
    setRoundCards(prev => [...prev, { ...currentCard, correct: false }]);
    const nextCard = getRandomCard();
    setCurrentCard(nextCard);
    setUsedCards(prev => [...prev, nextCard]);
  };

  // Remover carta en revisión
  const removeCard = (index) => {
    setRoundCards(prev => prev.filter((_, i) => i !== index));
  };

  // Confirmar ronda
  const confirmRound = () => {
    const correctCards = roundCards.filter(c => c.correct).length;
    const updatedTeams = teams.map((team, i) => 
      i === currentTeam 
        ? { ...team, score: team.score + correctCards }
        : team
    );
    
    setTeams(updatedTeams);
    
    // Verificar si hay ganador
    const winner = updatedTeams.find(team => team.score >= targetScore);
    if (winner) {
      setGameState('endgame');
    } else {
      const nextTeam = (currentTeam + 1) % numTeams;
      setCurrentTeam(nextTeam);
      setGameState('playing');
      startRound();
    }
  };

  // Reiniciar juego
  const resetGame = () => {
    setGameState('setup');
    setTeams([]);
    setCurrentTeam(0);
    setUsedCards([]);
    setRoundCards([]);
  };

  return (
    <div className="taboo-game">
      {/* Setup Screen */}
      {gameState === 'setup' && (
        <div className="setup-screen">
          <h1 className="game-title">TABOO</h1>
          <p className="game-subtitle">Adivina sin decir las palabras prohibidas</p>
          
          <div className="setup-options">
            <div className="option-group">
              <label>Tiempo por turno</label>
              <div className="time-buttons">
                {[60, 80, 90].map(time => (
                  <button
                    key={time}
                    className={`time-btn ${timeLimit === time ? 'active' : ''}`}
                    onClick={() => setTimeLimit(time)}
                  >
                    {time}s
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Número de equipos</label>
              <div className="number-selector">
                <button 
                  className="selector-btn"
                  onClick={() => setNumTeams(Math.max(2, numTeams - 1))}
                >
                  −
                </button>
                <span className="number-display">{numTeams}</span>
                <button 
                  className="selector-btn"
                  onClick={() => setNumTeams(Math.min(6, numTeams + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="option-group">
              <label>Puntos para ganar</label>
              <div className="number-selector">
                <button 
                  className="selector-btn"
                  onClick={() => setTargetScore(Math.max(5, targetScore - 5))}
                >
                  −
                </button>
                <span className="number-display">{targetScore}</span>
                <button 
                  className="selector-btn"
                  onClick={() => setTargetScore(Math.min(50, targetScore + 5))}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="start-btn" onClick={startGame}>
            COMENZAR JUEGO
          </button>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && currentCard && (
        <div className="playing-screen">
          <div className="game-header">
            <div className="team-indicator">
              {teams[currentTeam].name}
            </div>
            <div className="timer">
              <div className="timer-circle">
                <svg className="timer-svg" viewBox="0 0 100 100">
                  <circle
                    className="timer-bg"
                    cx="50"
                    cy="50"
                    r="45"
                  />
                  <circle
                    className="timer-progress"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                      strokeDasharray: `${(timeLeft / timeLimit) * 283} 283`,
                    }}
                  />
                </svg>
                <span className="timer-text">{timeLeft}</span>
              </div>
            </div>
          </div>

          <div className="score-bar">
            {teams.map(team => (
              <div key={team.id} className="score-item">
                <span className="team-name">{team.name}</span>
                <span className="team-score">{team.score}</span>
              </div>
            ))}
          </div>

          <div 
            className={`card-container ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="card">
              <div className="card-word">{currentCard.word}</div>
              <div className="forbidden-label">Palabras prohibidas:</div>
              <div className="forbidden-words">
                {currentCard.forbidden.map((word, i) => (
                  <div key={i} className="forbidden-item">{word}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="swipe-hints">
            <div className="hint hint-up">
              <div className="hint-arrow">↑</div>
              <div className="hint-text">Correcta</div>
            </div>
            <div className="hint hint-down">
              <div className="hint-arrow">↓</div>
              <div className="hint-text">Pasar</div>
            </div>
          </div>

          <div className="round-score">
            Cartas adivinadas: {roundCards.filter(c => c.correct).length}
          </div>
        </div>
      )}

      {/* Review Screen */}
      {gameState === 'review' && (
        <div className="review-screen">
          <h2 className="review-title">¡Tiempo finalizado!</h2>
          <p className="review-subtitle">Revisa las cartas adivinadas</p>

          <div className="review-cards">
            {roundCards.filter(c => c.correct).map((card, index) => (
              <div key={index} className="review-card">
                <div className="review-card-word">{card.word}</div>
                <button 
                  className="remove-btn"
                  onClick={() => removeCard(roundCards.indexOf(card))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="review-total">
            Total de puntos: {roundCards.filter(c => c.correct).length}
          </div>

          <button className="confirm-btn" onClick={confirmRound}>
            CONFIRMAR Y CONTINUAR
          </button>
        </div>
      )}

      {/* End Game Screen */}
      {gameState === 'endgame' && (
        <div className="endgame-screen">
          <h1 className="endgame-title">¡JUEGO TERMINADO!</h1>
          
          <div className="final-scores">
            {[...teams].sort((a, b) => b.score - a.score).map((team, index) => (
              <div 
                key={team.id} 
                className={`final-score-item ${index === 0 ? 'winner' : ''}`}
              >
                {index === 0 && <div className="trophy">🏆</div>}
                <div className="final-team-name">{team.name}</div>
                <div className="final-team-score">{team.score} puntos</div>
              </div>
            ))}
          </div>

          <button className="play-again-btn" onClick={resetGame}>
            JUGAR DE NUEVO
          </button>
        </div>
      )}
    </div>
  );
}

export default TabooGame;
