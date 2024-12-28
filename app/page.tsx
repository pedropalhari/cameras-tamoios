"use client";
import { useEffect, useState } from "react";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

const CAMERAS = [
  "KM 12",
  "KM 20",
  "KM 34",
  "KM 47",
  "KM 58",
  "KM 65",
  "KM 80",
  "KM 81",
];

export default function Home() {
  const [cameraUrls, setCameraUrls] = useState<string[]>([]);

  function loadCameras() {
    var date = new Date();
    date.setMinutes(date.getMinutes() - 2);

    var currentMonth = ("0" + (date.getMonth() + 1)).slice(-2);
    var currentSeconds = ("0" + date.getSeconds()).slice(-2);
    var currentMinutes = ("0" + date.getMinutes()).slice(-2);
    var currentHours = ("0" + date.getHours()).slice(-2);
    var currentDate = ("0" + date.getDate()).slice(-2);

    let cameraUrls: string[] = [];
    CAMERAS.forEach((cameraName) => {
      var format =
        cameraName.replace(" ", "%20") +
        "_" +
        date.getFullYear().toString().substr(2, 2) +
        "" +
        currentMonth +
        "" +
        currentDate +
        "" +
        currentHours +
        "" +
        currentMinutes +
        "" +
        currentSeconds +
        "00.jpg";
      var url =
        `https://camerastamoios.vwi.com.br/${cameraName.replace(" ", "")}/` +
        format;

      cameraUrls.push(url);
    });

    setCameraUrls(cameraUrls);
  }

  useEffect(() => {
    loadCameras();

    const interval = setInterval(function () {
      loadCameras();
    }, 3000);

    () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className={`min-h-screen bg-gray-100 p-8 ${inter.className}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold text-gray-800 mb-8 text-center ${outfit.className}`}>
          Câmeras Tamoios
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cameraUrls.map((cUrl, index) => (
            <div key={CAMERAS[index]} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`p-3 bg-gray-800 text-white flex items-center justify-between ${outfit.className}`}>
                <span className="font-medium">{CAMERAS[index]}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <div className="relative">
                <img 
                  className="w-full h-[240px] object-cover"
                  src={cUrl}
                  alt={`Camera ${CAMERAS[index]}`}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
