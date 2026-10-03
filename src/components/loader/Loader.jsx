"use client";

import LoadingScreen from "./LoadingScreen";

export default function Loader({ onComplete }) {
  return <LoadingScreen onComplete={onComplete} />;
}