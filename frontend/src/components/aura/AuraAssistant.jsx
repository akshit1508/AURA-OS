"use client";

import AuraScene from "./AuraScene";
import AuraChat from "./AuraChat";
import useAuraChat from "./useAuraChat";
import { useAuraContext } from "@/context/AuraContext";
import { useState } from "react";

export default function AuraAssistant() {
  const { isOpen, projectContext, openGeneral, close } = useAuraContext();
  const [hovered, setHovered] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const {
    messages,
    input,
    setInput,
    handleSend,
    isLoading,
  } = useAuraChat(projectContext);

  const handleHover = () => {
    if (isOpen) return;
    setHovered(true);
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 450);
  };

  const handleLeave = () => {
    if (isOpen) return;
    setHovered(false);
  };

  const handleOpen = () => {
    setHovered(true);
    setTransitioning(true);
    openGeneral();
    setTimeout(() => setTransitioning(false), 450);
  };

  const handleClose = () => {
    close();
    setTransitioning(true);
    setTimeout(() => {
      setHovered(false);
      setTransitioning(false);
    }, 450);
  };

  return (
    <>
      {/* AURA 3D SCENE */}
      <AuraScene
        hovered={isOpen ? true : hovered}
        transitioning={transitioning}
        open={isOpen}
        onHover={handleHover}
        onLeave={handleLeave}
        onClick={handleOpen}
      />

      {/* CHAT PANEL */}
      {isOpen && (
        <AuraChat
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isLoading={isLoading}
          onClose={handleClose}
          projectContext={projectContext}
        />
      )}
    </>
  );
}