"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

export default function SnowitePage() {
  const [gingersCount, setGingersCount] = useState(0);
  const [gingerBalance, setGingerBalance] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      const webApp = (window as any).Telegram.WebApp;
      webApp.ready();

      // Получаем данные о приглашенных пользователях через Telegram
      webApp.onEvent('user_invited', (user: any) => {
        setGingersCount((prev) => prev + 1);
        setGingerBalance((prev) => prev + 100); // Добавляем 100 SANT за каждого приглашенного
      });
    }
  }, []);

  const handleClaim = () => {
    alert('Claim button clicked');
  };

  const handleInvite = () => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      const webApp = (window as any).Telegram.WebApp;
      webApp.openLink('https://t.me/Santon_tokenbot?start=invite'); // Ссылка на ваш бот с приглашением
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center pt-10">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {/* Gingerbread Image */}
      <div className="mb-6">
        <Image src="/gingerbread.png" alt="Gingerbread" width={200} height={200} />
      </div>

      {/* Invite Gingerbreads */}
      <h2 className="text-2xl font-bold mb-2">Invite Gingerbreads</h2>
      <div className="w-3/4 bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
        <p className="text-3xl font-bold">{gingersCount}</p>
        <p className="text-lg">Gingers</p>
        <p className="text-sm underline">View referral program rules &gt;</p>
      </div>

      {/* Ginger Balance and Claim Button */}
      <div className="flex flex-col items-center mb-6">
        <p className="text-5xl font-bold mb-4">
          <span role="img" aria-label="candy-cane">🎄</span> {gingerBalance.toLocaleString()}
        </p>
        <button 
          onClick={handleClaim}
          className="bg-red-500 text-white px-10 py-2 rounded-full text-lg font-bold"
        >
          Claim
        </button>
      </div>

      {/* Your Gingers */}
      <div className="w-full px-4 mb-6">
        <p className="text-lg font-semibold mb-4">YOUR GINGERS <span role="img" aria-label="bow">💕</span></p>
        <div className="flex items-center">
          <Image
            src="/noah.png"
            alt="Noah"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex-grow ml-4">
            <p className="font-bold">Noah</p>
            <p className="text-sm text-gray-500">Yesterday</p>
          </div>
          <p className="text-green-500 font-bold">+100 SANT</p>
        </div>
      </div>

      {/* Invite Your Ginger Button */}
      <button 
        onClick={handleInvite}
        className="bg-red-500 text-white px-20 py-3 rounded-full text-lg font-bold mb-10"
      >
        Invite your ginger
      </button>

      {/* Bottom Navigation */}
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
          <span>Snowite ({gingersCount})</span>
        </Link>
        <Link href="/tasks" className="flex flex-col items-center">
          <img src="/icons/tasks.svg" alt="Tasks" className="h-8 w-8" />
          <span>Tasks</span>
        </Link>
      </nav>
    </div>
  );
}