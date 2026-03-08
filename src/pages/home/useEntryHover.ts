import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface EntryHoverReturn {
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  goToMembers: () => void;
  goToNews: () => void;
}

const useEntryHover = (): EntryHoverReturn => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);
  const goToMembers = useCallback(() => navigate("/members"), [navigate]);
  const goToNews = useCallback(() => navigate("/news"), [navigate]);

  return { hovered, onMouseEnter, onMouseLeave, goToMembers, goToNews };
};

export default useEntryHover;
