import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface EntryHoverReturn {
  hovered: boolean;
  visiteurOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setVisiteurOpen: (open: boolean) => void;
  goToMembers: () => void;
  goToNews: () => void;
  goToElections: () => void;
}

const useEntryHover = (): EntryHoverReturn => {
  const [hovered, setHovered] = useState(false);
  const [visiteurOpen, setVisiteurOpen] = useState(false);
  const navigate = useNavigate();

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);
  const goToMembers = useCallback(() => navigate("/members"), [navigate]);
  const goToNews = useCallback(() => navigate("/news"), [navigate]);
  const goToElections = useCallback(() => {
    setVisiteurOpen(false);
    navigate("/plateforme");
  }, [navigate]);

  return {
    hovered,
    visiteurOpen,
    onMouseEnter,
    onMouseLeave,
    setVisiteurOpen,
    goToMembers,
    goToNews,
    goToElections,
  };
};

export default useEntryHover;
