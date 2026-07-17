import { db, auth, storage } from './firebase-config.js';
import { collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- ROUTER (Navegação Premium) ---
const routes = {
    home: async () => {
        return `
        <section class="page-enter">
            <div class="relative h-[70vh] flex items-center px-10 overflow-hidden">
                <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover opacity-40">
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-in-a-dark-environment-with-lights-4690-large.mp4" type="video/mp4">
                </video>
                <div class="relative z-10 max-w-2xl">
                    <span class="bg-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Novo Lançamento</span>
                    <h1 class="text-7xl font-black mt-4 leading-none">DONO DELAS</h1>
                    <p class="mt-6 text-zinc-400 text-lg">O álbum que está a parar Moçambique. Disponível em todas as plataformas.</p>
                    <div class="mt-8 flex space-x-4">
                        <button class="bg-white text-black px-8 py-4 rounded-full font-black hover:bg-red-600 hover:text-white transition">OUVIR AGORA</button>
                        <button class="glass px-8 py-4 rounded-full font-black">VER TOUR</button>
                    </div>
                </div>
            </div>
            
            <div class="p-10">
                <h3 class="text-2xl font-bold mb-6">Produtos em Destaque</h3>
                <div id="featured-products" class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <!-- Injetado via Firebase -->
                </div>
            </div>
        </section>`;
    },
    musica: async () => {
        const querySnapshot = await getDocs(collection(db, "songs"));
        let html = `<div class="p-10 page-enter"><h2 class="text-4xl font-black mb-10">DISCOGRAFIA</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
        querySnapshot.forEach((doc) => {
            const song = doc.data();
            html += `
            <div class="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition">
                <div class="flex items-center space-x-4">
                    <img src="${song.cover}" class="w-16 h-16 rounded-lg object-cover">
                    <div>
                        <h4 class="font-bold">${song.title}</h4>
                        <p class="text-xs text-zinc-500">${song.artist || 'Nilton Xavier'}</p>
                    </div>
                </div>
                <button onclick="playSong('${song.url}', '${song.title}', '${song.cover}')" class="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>`;
        });
        return html + `</div></div>`;
    }
};

window.navigate = async (page) => {
    const content = document.getElementById('app-content');
    content.innerHTML = '<div class="flex justify-center py-20"><i class="fa-solid fa-circle-notch animate-spin text-4xl text-red-600"></i></div>';
    
    // Atualizar links ativos
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-nav'));
    event?.target?.classList?.add('active-nav');

    content.innerHTML = await routes[page]();
};

// --- PLAYER LOGIC ---
window.playSong = (url, title, cover) => {
    const audio = new Audio(url);
    document.getElementById('player-title').innerText = title;
    document.getElementById('player-cover').src = cover;
    document.getElementById('play-pause').innerHTML = '<i class="fa-solid fa-pause"></i>';
    audio.play();
};

// Iniciar na Home
navigate('home');

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
          }
