"use client"; // Необходимо для работы хуков

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Snowflake = { 
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
};

export default function HomePage() {
  const [stonBalance, setStonBalance] = useState(0);
  const [premiumUses, setPremiumUses] = useState(5);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [clicksLeft, setClicksLeft] = useState(100);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const resetClicks = setInterval(() => {
      setClicksLeft(100);
      setProgress(100);
    }, 3600000); // Сброс каждый час

    return () => clearInterval(resetClicks);
  }, []);

  const handleBallClick = () => {
    if (clicksLeft > 0) {
      setStonBalance((prev) => prev + 1);
      setClicksLeft((prev) => prev - 1);
      setProgress((clicksLeft - 1) / 100 * 100);
      addSnowflakes(5); // Добавляем снежинки при каждом клике
    } else {
      alert('Лимит кликов исчерпан. Подождите час, чтобы попробовать снова.');
    }
  };

  const addSnowflakes = (count: number) => {
    const newFlakes: Snowflake[] = Array.from({ length: count }).map(() => {
      const flake: Snowflake = {
        id: Math.random(),
        left: Math.random() * 100,
        duration: Math.random() * 5 + 5, // Продолжительность анимации
        delay: Math.random() * 2, // Задержка перед началом анимации
        size: Math.random() * 1.5 + 1,
      };
      
      // Удаляем снежинку после завершения анимации
      setTimeout(() => {
        setSnowflakes((prev) => prev.filter((f) => f.id !== flake.id));
      }, (flake.duration + flake.delay) * 1000); // Переводим секунды в миллисекунды

      return flake;
    });
    setSnowflakes((prev) => [...prev, ...newFlakes]);
  };

  const openPremiumModal = () => {
    alert('Заплатите 1 ТОН, чтобы получить больше STON coin!');
    setPremiumUses((prev) => prev - 1);
  };

  const openSanBoostModal = () => {
    alert('Просмотрите рекламу, чтобы получить небольшой буст!');
  };

  return (
    <div className="min-h-screen bg-red-600 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Отображение баланса STON */}
      <h1 className="text-5xl font-bold mb-2 mt-10">{stonBalance.toLocaleString()} STON</h1>
      <p className="text-lg mb-4 mt-4">#1</p>

      {/* Прогресс-бар для кликов (ледышка) */}
      <div className='w-3/4 mb-4 h-8 rounded-full relative overflow-hidden' style={{ border: '3px solid #B0E0E6', backgroundColor: '#E0FFFF', boxShadow: '0 0 20px #B0E0E6', backgroundImage: 'url(/ice-texture.png)', backgroundSize: 'cover' }}>
        <div className='bg-blue-200 h-full rounded-full' style={{ width: `${progress}%`, transition: 'width 0.5s', backgroundImage: 'linear-gradient(to right, #B0E0E6, #E0FFFF)', boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.8)' }}></div>
        <div className='absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-900' style={{ textShadow: '1px 1px 2px #fff' }}>
          {clicksLeft} / 100
        </div>
      </div>
      <p className="mb-4">Осталось кликов: {clicksLeft} / 100</p>

      {/* Кнопки для Tasks, Decorations, Invites */}
      <div className="flex justify-around w-full text-center mb-6">
        <button className="text-center" onClick={() => alert('Tasks')}>
          <p>Tasks</p>
          <p>+9,9 mil</p>
        </button>
        <button className="text-center" onClick={() => alert('Decorations')}>
          <p>Decorations</p>
          <p>+9,9 mil</p>
        </button>
        <button className="text-center" onClick={() => alert('Invites')}>
          <p>Invites</p>
          <p>+9,9 mil</p>
        </button>
      </div>

      {/* Рождественский шарик */}
<div onClick={handleBallClick} className="mt-6 cursor-pointer" style={{ transform: 'translateY(-50px)' }}>
  <img src="/ball.png" alt="Christmas Ball" className="w-100 h-100" /> {/* Поднято на 100px вверх */}
</div>


      {/* Анимация снега */}
      <div className="snow-container">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              fontSize: `${flake.size}em`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Плавающая кнопка Premium, частично выходящая за пределы экрана */}
      <div className="fixed bottom-28 left-0" style={{ transform: 'translateX(-40px)' }}>
        <button
          onClick={openPremiumModal}
          className="relative bg-white p-3 rounded-3xl shadow-lg flex flex-col items-center"
          style={{ width: '150px', height: '100px', borderRadius: '40px' }}
        >
          {/* Звезда сверху и текст снизу, всё по центру */}
          <img src="/icons/premium.png" alt="Premium" className="h-12 w-12 mb-1" />
          <span style={{ color: '#5CC8FF' }} className="font-bold">Premium</span>

          {/* Индикатор */}
          <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full px-2 py-1 text-xs shadow-md"
            style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#5CC8FF' }}>
            +{premiumUses}M
          </span>
        </button>
      </div>

      {/* Плавающая кнопка SanBoost, частично выходящая за пределы экрана */}
      <div className="fixed bottom-28 right-0" style={{ transform: 'translateX(40px)' }}>
        <button
          onClick={openSanBoostModal}
          className="relative bg-white p-3 rounded-4xl shadow-lg flex flex-col items-center"
          style={{ width: '150px', height: '100px', borderRadius: '35px' }}
        >
          <img
            src="/icons/sanboost.png"
            alt="SanBoost"
            className="h-12 w-12 mb-2"
            style={{ transform: 'translateX(-10px)' }}
          />
          <span className="font-bold" style={{ transform: 'translateX(-10px)', color: '#5CC8FF' }}>
            SanBoost
          </span>

          {/* Индикатор */}
          <span className="absolute top-0 left-0 text-white rounded-full text-xs shadow-md"
            style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#5CC8FF' }}>
            1
          </span>
        </button>
      </div>

      {/* Навигационная панель внизу */}
      <nav className="fixed bottom-0 w-full bg-white text-black flex justify-around py-4 border-t">
        <Link href="/" className="flex flex-col items-center">
          <img src="/icons/home.svg" alt="Home" className="h-8 w-8" />
          <span>Home</span>
        </Link>
        <Link href="/decorations" className="flex flex-col items-center">
          <img src="/icons/decorations.svg" alt="Decorations" className="h-8 w-8" />
          <span>Decorations</span>
        </Link>
        <Link href="/snowite" className="flex flex-col items-center">
          <img src="/icons/snowite.svg" alt="Snowite" className="h-8 w-8" />
          <span>Snowite</span>
        </Link>
        <Link href="/tasks" className="flex flex-col items-center">
          <img src="/icons/tasks.svg" alt="Tasks" className="h-8 w-8" />
          <span>Tasks</span>
        </Link>
      </nav>

      {/* Стили для анимации снега */}
      <style jsx>{`
        .snow-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }
        .snowflake {
          position: absolute;
          top: -10%;
          color: white;
          animation: fall linear forwards;
          opacity: 0.8;
        }
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}